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
        console.log("response", response);
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
    const isCorrect = answer === currentQuestion.correct;
    console.log("Questions array:", questions);

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
        const response = await axios.post(
          `${BaseUrl}/api/updateCoins`,
          { coins: score, type: type }, //Add a 'type' parameter to distinguish defaultScore and scoreChange
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(`${type} updated in the database`, response.data);
      } catch (error) {
        console.error(`Error updating ${type}:`, error);
      }
    };
    if (!token) {
      const defaultScore = 100;
      setTotalScore(scoreChange);
      const scorecoin = defaultScore + parseInt(totalscore) + scoreChange;
      localStorage.setItem("usercoin", scorecoin);
      console.log("SCORCOIN", scorecoin);
      // console.log("TOTALSCORE",totalscore)
    }
  };
  //   let interval = setInterval(() => {
  //     // Check if Adsense script is loaded every 300ms
  //     if (window.adsbygoogle) {
  //       pushAd()
  //       // clear the interval once the ad is pushed so that function isn't called indefinitely
  //       clearInterval(interval)
  //     }
  //   }, 1000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])
  // useEffect(() => {
  //   const initializeAdSense = () => {
  //     if (window.adsbygoogle && window.adsbygoogle.loaded) {
  //       return; // AdSense script already loaded
  //     }

  //     window.adsbygoogle = window.adsbygoogle || [];
  //     window.adsbygoogle.loaded = true;

  //     const script = document.createElement("script");
  //     script.src =
  //       "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  //     script.async = true;
  //     script.crossOrigin = "anonymous";

  //     script.onload = () => {
  //       console.log("AdSense script loaded successfully");
  //     };

  //     script.onerror = (error) => {
  //       console.error("Error loading AdSense script:", error);
  //     };

  //     document.head.appendChild(script);
  //   };

  //   const pushAd = () => {
  //     try {
  //       // Push ads after the script is loaded
  //       (window.adsbygoogle = window.adsbygoogle || []).push({});
  //       console.log("Ad pushed successfully");
  //     } catch (error) {
  //       console.error("Error pushing ads:", error);
  //     }
  //   };

  //   initializeAdSense();

  //   // Check if Adsense script is loaded every 300ms
  //   const interval = setInterval(() => {
  //     if (window.adsbygoogle && window.adsbygoogle.loaded) {
  //       pushAd();
  //       clearInterval(interval); // Clear the interval once the ad is pushed
  //     }
  //   }, 300);

  //   return () => {
  //     clearInterval(interval); // Cleanup function to clear the interval
  //   };
  // }, []);

  return (
    <>
      <div className="bg-[#050230]">
        <Row className="flex  ">
          <Col className="lg:w-[520px] md:w-[410px]  py-3 px-2">
            {/* <div className="bg-white h-[350px] mx-auto mb-[8px]">
              <p className="text-black text-center">ads by goggle</p>
                         </div> */}
            <div className="text-center mt-[300px]">
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
                        className={`flex flex-col items-center m-2 py-2 ${
                          answer === selectedAnswer
                            ? answerStatus
                              ? "bg-[#099623] !important"
                              : "bg-[#f02d1f] !important"
                            : answer ===
                                questions[currentQuestionIndex].correct &&
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
              <p className="text-center text-white">
                The insurance industry is one of the largest industries in the
                United States, with over $1.5 trillion in annual premiums.The
                word "insurance" comes from the French word "assurer", which
                means "to make sure". The first insurance company in the United
                States was founded in Charleston, South Carolina, in 1735.The
                insurance industry employs over 2 million people in the United
                States. The average American household spends about $1,500 per
                year on insurance premiums. The most expensive type of insurance
                in the United States is long-term care insurance, which can cost
                upwards of $5,000 per month.
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
              Welcome to Quiztwiz. Play a quiz and earn coins.
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
