import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Quiz = () => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false); //Model Open & Close
  const [questions, setQuestions] = useState([]); // Fatch To Questions Data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Questions Index Set
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Fetch The Answer
  const [answerStatus, setAnswerStatus] = useState(null); //Answer True False Check
  const [totalscore, setTotalScore] = useState(0); // Show The Score

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  // Function To Open The Modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function To Close The Modal
  const closeModal = () => {
    setModalOpen(false);
    navigate("/quizplay");

    //Show The Tostify
    toast("100 Coins Rewarded!!", {
      style: { background: "#050230", color: "white" },
      icon: (
        <img
          src={require("../../image/coin-2.png")}
          className="w-full"
          alt="coin"
        />
      ),
    });
  };

  //Fetch Questions Data
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/quesation/loginquestions`
        );
        const allQuestions = response.data.data;
        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 2);

        setQuestions(selectedQuestions);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchQuestions();
  }, []);

  // Check The Answer True & False
  const handleOptionClick = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;

    setSelectedAnswer(answer);
    setAnswerStatus(isCorrect);
    const correctScore = 50;
    const scoreChange = isCorrect ? correctScore : 0;

    setTimeout(() => {
      setSelectedAnswer(null);
      setAnswerStatus(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          return newIndex < questions.length ? newIndex : prevIndex;
        });
      } else {
        openModal();
      }

      const defaultScore = 100;
      const totalScoreToBeUpdated = defaultScore + scoreChange - 50;
      updateScoreInDatabase(totalScoreToBeUpdated);
      localStorage.setItem("totalscore", totalScoreToBeUpdated);
    }, 1000);

    const token = localStorage.getItem("token");
    const updateScoreInDatabase = async (score, type) => {
      try {
        await axios.post(
          `${BaseUrl}/api/updateCoins`,
          { coins: score, type: type }, //Add a 'type' parameter to distinguish defaultScore and scoreChange
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(`Error updating ${type}:`, error);
      }
    };
    if (!token) {
      const defaultScore = 100;
      setTotalScore(scoreChange);
      const scorecoin = defaultScore + parseInt(totalscore) + scoreChange;
      localStorage.setItem("usercoin", scorecoin);
    }
  };

  return (
    <>
      <div>
        <Row className="flex  ">
          <Col className="lg:w-[520px] md:w-[410px]  py-3 px-2">

            <div className="text-center">
              <h1 className="font-bold text-white text-18">Let's begin!</h1>
              <span className="text-[12px] text-[#8f8f8f]">
                Answer few questions and win 150 free!
              </span>
            </div>
            <div className=" text-[#67d1fc] font-bold text-center pt-5 pb-3">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            {currentQuestionIndex < questions.length && (
              <>
                <div
                  key={questions[currentQuestionIndex]._id}
                  className="text-lg font-bold px-10 text-white text-center pb-5"
                >
                  <span>{questions[currentQuestionIndex].question}</span>
                </div>
                <div className="grid-cols-2 grid text-white pt-2">
                  {questions[currentQuestionIndex]?.answers.map(
                    (answer, index) => (
                      <Col
                        key={index}
                        onClick={() => handleOptionClick(answer)}
                        className={`flex flex-col items-center m-2 py-2 ${answer === selectedAnswer
                          ? answerStatus
                            ? "bg-[#099623] !important"
                            : "bg-[#f02d1f] !important"
                          : answer ===
                            questions[currentQuestionIndex].correct_answer &&
                            answerStatus === false
                            ? "bg-[#099623] !important"
                            : "bg-[#171349] !important"
                          } rounded-xl cursor-pointer`}
                      >
                        {answer}
                      </Col>
                    )
                  )}
                </div>
                {isModalOpen && (
                  <div className="modal-container ">
                    <div className="modal">
                      <div className="flex justify-end">
                        <FaX className="cursor-pointer" onClick={closeModal} />
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={require("../../../src/image/getreward..gif")}
                          alt="ads"
                        ></img>
                      </div>

                      <h2 class="text-2xl mb-4 text-[#D8D524] flex justify-center">
                        New Reward Available
                      </h2>
                      <h2 class="lg:text-4xl md:text-[1.5rem] mb-4 flex justify-center">
                        Get Instant 100 Coins!
                      </h2>
                      <p class="mb-6 text-[#8E8F98] flex justify-center">
                        Watch a simple ad and get rewarded
                      </p>
                      <div className="flex justify-center">
                        <button
                          class="bg-[#D8E91E] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2 flex justify-center"
                          onClick={closeModal}
                        >
                          Claim
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            <p className="text-[#f7d619] text-center font-bold cursor-pointer pt-3">
              <Link to="/login">Sign-Up - Login</Link>
            </p>

            <div className="w-full pl-5 pt-6">
              <h1 className="w-full font-bold text-lg text-white">
                Play Quiz and Win Coins!
              </h1>
              <ul className="text-[#818185] text-[14px] list-disc my-3 px-4">
                <li className="mb-2">
                  {" "}
                  Play Quizzes in 25+ categories like GK, Sports, Bollywood,
                  Business, Cricket &amp; more!{" "}
                </li>
                <li className="mb-2"> Compete with lakhs of other players! </li>
                <li className="mb-2"> Win coins for every game </li>
                <li className="mb-2">
                  {" "}
                  Trusted by millions of other quiz enthusiasts like YOU!{" "}
                </li>
              </ul>
            </div>

            <div
              className="border-2 	 w-[100%] p-6 rounded-xl "
              style={{
                borderColor: "#0060FF",
                boxShadow: "5px  10px 15px rgba(0, 96, 255, 0.3)",
              }}
            >
              <h1 className="text-2xl text-center text-[#67d1fc] ">
                Fun Facts
              </h1>
              <p className="text-white">
                <ul className=" text-[15px] list-disc my-3 px-4">
                  <li className="mb-2">
                    Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.
                  </li>
                  <li className="mb-2">
                    Bananas are berries, but strawberries are not. Botanically speaking, berries are defined as fruits produced from a single ovary, which bananas meet, but strawberries do not.
                  </li>
                  <li className="mb-2">
                    The shortest war in history was between Britain and Zanzibar on August 27, 1896. It lasted only 38 minutes.
                  </li>
                  <li className="mb-2">
                    Octopuses have three hearts. Two pump blood to the gills, while the third pumps it to the rest of the body.
                  </li>
                  <li className="mb-2">
                    The Eiffel Tower can be 15 cm taller during the summer. Due to the expansion of the iron when it's heated, the height of the tower can increase by up to 15 centimeters.
                  </li>
                  <li className="mb-2">
                    A group of flamingos is called a flamboyance. These colorful birds are often seen in large groups in their natural habitat.
                  </li>
                  <li className="mb-2">
                    A small child could swim through the veins of a blue whale. Blue whales are the largest animals on Earth, and their hearts alone can weigh as much as a car.
                  </li>
                  <li className="mb-2">
                    The unicorn is the national animal of Scotland. It has been a symbol of purity and grace, and it has been associated with Scotland for centuries.
                  </li>
                  <li className="mb-2">

                    The electric chair was invented by a dentist. Alfred P. Southwick, a dentist, came up with the idea of using electricity for executions after witnessing an accidental electrocution.
                  </li>
                  <li className="mb-2">
                    The world's largest desert is not the Sahara, but Antarctica. While we typically associate deserts with hot, sandy environments, a desert is technically defined by its low precipitation levels, making Antarctica the largest desert in the world.
                  </li>
                </ul>

              </p>
            </div>
          </Col>
          <Col className="fixed me-[15%] bg-image">
            <div className="py-16 md:py-10">
              <img
                className="lg:w-[100%] md:w-[300px] "
                src={require("../../image/quiz-1.png")}
                alt=""
              ></img>
            </div>
            <div className="font-bold text-center text-white md:text-sm  big:bottom-12  big:z-[-1]">
              Welcome to QuizTimeNow. Play a quiz and earn coins.
              <p className="font-normal text-2xl pt-4 text-center">
                There's a quiz for everyone!{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Quiz;
