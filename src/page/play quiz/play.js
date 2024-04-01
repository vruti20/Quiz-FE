import { Button, Col, Row } from "react-bootstrap"
import { BiCategory } from "react-icons/bi"
import { LiaHomeSolid } from "react-icons/lia"
import { CgProfile } from "react-icons/cg"
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
// import { FaX } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
const BaseUrl = process.env.REACT_APP_BASEURL;

const Play = () => {
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [isGuest, setIsGuest] = useState(true);
    const { categoryid } = useParams();
    const [userCoins, setUserCoins] = useState(0);
    const [databaseCoins, setDatabaseCoins] = useState(0);
    const loginscore = localStorage.getItem('allcoins') || 0;
    const newcoins = localStorage.getItem("logincoin") || 0;
    localStorage.setItem('usercoin', 0)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to open the modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };


    const deductCoins = async () => {
        if (loginscore >= 100) {

            const updatedScore = loginscore - 100;
            localStorage.setItem('coins', updatedScore);
            navigate(`/question/${categoryid}`);

        } else {
            openModal();
        }
        try {
            if (databaseCoins >= 100) {

                const token = localStorage.getItem('token');
                const response = await axios.post(`${BaseUrl}/api/updateCoins`,
                    { coins: -100 },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                // Check if the API request was successful
                if (response.data.status === 'Success') {
                    // Update the local state or storage with the new coin value
                    if (isGuest) {
                        localStorage.setItem('coin', newcoins - 100);
                        // navigate(`/question/${categoryid}`);

                    } else {
                        setUserCoins(userCoins - 100);
                    }

                    if (isGuest && databaseCoins >= 100) {
                        // Navigate to the question page
                        navigate(`/question/${categoryid}`);
                    } else {
                        openModal();
                    }

                } else {
                    // Handle API request failure
                    console.log('API request failed:', response.data.message);
                }
            }


        } catch (error) {
            // Handle errors, e.g., network issues
            openModal();
            console.error('Error deducting coins:', error);
        }
    };
    const updated = parseInt(localStorage.getItem('coins')) || 0;
    const earnedCoins = parseInt(localStorage.getItem('earnedCoins')) || 0;
    const allcoins = parseInt(updated) + parseInt(earnedCoins);
    localStorage.setItem('allcoin', allcoins);

    useEffect(() => {

        const fetchCategory = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/quesation/questions?quiz=${categoryid}`);
                const newQuizData = response.data.data.map(item => item.quiz);
                setSubcategories(newQuizData.slice(0, 1));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const token = localStorage.getItem('token');
        const fetchDatabaseCoins = async () => {
            try {
                const response = await axios.post(`${BaseUrl}/api/updateCoins`,
                    { coins: databaseCoins },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setDatabaseCoins(response.data.totalCoins);
            } catch (error) {
                console.error("Error fetching database coins:", error);
            }
        }
        fetchDatabaseCoins();
        if (categoryid) {
            fetchCategory();
        }
        const playerIsGuest = checkIfPlayerIsGuest();

        // Set the isGuest state based on the result
        setIsGuest(playerIsGuest);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryid]);

    const checkIfPlayerIsGuest = () => {
        const guestToken = localStorage.getItem('token');

        return !!guestToken;
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    return (
        <>
            <div>
            <div className="relative">
          <div className="flex justify-between items-center cursor-pointer bg-[#0B0D26] px-4 py-2 text-white header">
          <Link to={`/quizhome`} className="px-[10px] m-0 p-0">
                  <div className="text-[#3FCAFF] md:text-2xl sm:text-lg font-bold italic font-serif">
                    QuizTime !
                  </div>
                </Link>
            <div className="hidden lg:flex items-center">
              <ul className="flex items-center text-white font-semibold">
                <li className="mx-3"><Link to='/quizhome'>HOME</Link></li>
                <li className="mx-3"><Link to='/privacy-policy'>PRIVACY POLICY</Link></li>
                <li className="mx-3"><Link to='/login'>LOGIN</Link></li>
                <li className="mx-3"><Link to='/aboutus'>ABOUT US</Link></li>
                <li className="mx-3"><Link to='/contact'>CONTACT US</Link></li>
              </ul>
            </div>
            <div className="mt-[3px] flex items-center ml-1">
              <div className="text-[10px] flex text-white w-[110px] bg-[#2DAAE2] px-[18px] py-[5px] rounded-md me-2">
                <img
                  className="w-[14px] mr-1"
                  src={require('../../image/coins-1.png')}
                  alt="svg"
                ></img>
                <p> {isGuest ? databaseCoins : allcoins} COINS</p>
              </div>
            </div>
            <div className="lg:hidden">
              <AiOutlineMenu className="text-2xl text-white" onClick={toggleMenu} />
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute left-0 top-12 w-full bg-[#050230] text-white py-2 z-50">
              <ul className="flex flex-col items-start pl-4">
                <li className="my-1"><Link to='/quizhome'>HOME</Link></li>
                <li className="my-1"><Link to='/privacy-policy'>PRIVACY POLICY</Link></li>
                <li className="my-1"><Link to='/login'>LOGIN</Link></li>
                <li className="my-1"><Link to='/aboutus'>ABOUT US</Link></li>
                <li className="my-1"><Link to='/contactus'>CONTACT US</Link></li>
              </ul>
            </div>
          )}
        </div>
                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[500px]  relative flex-col flex" >
                        <div className="" >
                            {/* <div className="flex justify-between lg:w-[520px] py-[8px] cursor-pointer bg-[#0B0D26] header" style={{ boxShadow: "0px 10px 15px rgba(8, 13, 87,0.7)" }}>
                                <Link to={`/quizhome`} className="pl-[10px]">
                                    <div className="text-[#3FCAFF] md:text-2xl sm:text-lg font-bold	italic font-serif">QuizTime !</div>
                                </Link>
                                <div className="flex justify-between">
                                    <div className="flex items-center">

                                        <img class="w-[25px] " src={require("../../../src/image/gift.gif")} alt="animation" />
                                        <p className="text-white text-[10px] font-[700] pt-1"> Daily Reward</p>
                                    </div>
                                    <div className="mt-[3px] flex items-center ml-1">
                                        <div class="text-[10px] flex w-[110px] text-white bg-[#2DAAE2] px-[18px] py-[5px] rounded-md me-2">
                                            <img
                                                className="w-[14px] mr-1"
                                                src={require('../../image/coins-1.png')}
                                                alt="svg"
                                            ></img>
                                            <p>
                                                {isGuest ? databaseCoins : loginscore} COINS
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div> */}

                            {/* <div className="bg-white mt-[50px] h-[370px] mx-auto mb-[8px]">
                                <p className="text-center text-black">
                                    ads by goggle
                                </p>
                            </div> */}
                            <div className="pb-[150px] mt-[100px]">

                                <div className="border-2 w-full pb-[10px] m-[5px] rounded-[30px] " style={{ borderColor: "#0060FF", boxShadow: "5px  10px 15px rgba(0, 96, 255, 0.3)" }}>

                                    {subcategories.map((quiz, index) => (
                                        <div key={index} className="px-5 gap-2 flex items-center py-6">
                                            <img
                                                className="w-[60px] sm:w-[52px] rounded-full "
                                                src={quiz.category.img}
                                                alt="category"
                                            />
                                            <div className="">
                                                <p className="text-[10px] text-[#D85B00] font-black ">{quiz.title}</p>
                                                <div className="flex text-white text-[18px] font-black cursor-pointer">
                                                    <p>Play Win</p>
                                                    <img
                                                        className="w-[25px] ms-2"
                                                        src={require('../../image/coins-1.png')}
                                                        alt="svg"
                                                    />
                                                    <p className="ms-2">{quiz.totalPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isGuest ? (
                                        // Render only the "PLAY" button when the user is logged in
                                        // <Link to={`/question/${categoryid}`}>
                                        <div className="flex justify-center pb-6">
                                            <Button onClick={deductCoins} className=" py-[10px] px-8 bg-[#389A06]  rounded-md text-white font-bold cursor-pointer">
                                                PLAY QUIZ
                                            </Button>
                                            {/* {isModalOpen && (
                                                <div className="modal-container" >
                                                    <div className="modal" style={{ padding: "30px 20px 40px 20px" }}>
                                                        <div className="flex justify-end">
                                                            <FaX onClick={closeModal} className="cursor-pointer" />
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <img src="https://monetix-lookat1.quiztwiz.com/static/media/adpic.18b085351c262a96e5a9.png" alt="ads"></img>
                                                        </div>

                                                        <h2 class="text-4xl text-[#D8E91E] md:text-[1.5rem] mb-4 flex justify-center">oops!</h2>
                                                        <p class="mb-6 text-[#8E8F98] flex justify-center">Not enough coins to play</p>
                                                        <div className="flex justify-center">
                                                            <button class="bg-[#D8E91E] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2 flex justify-center">Watch Ad</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            )} */}
                                        </div>
                                        // </Link>
                                    ) : (

                                        <div className="flex w-full justify-around pb-[25px]">
                                            <Link to="/login">
                                                <button class="bg-[#389A06] py-2 md:px-14 px-10 md:font-[700] font[500] text-white rounded-md">JOIN NOW</button>
                                            </Link>
                                            <p className="text-[20px] text-white">or</p>

                                            <div onClick={deductCoins} class="border border-[#389A06] text-white text-center rounded-md font-bold text-sm py-3  px-10 cursor-pointer">
                                                PLAY AS GUEST
                                            </div>
                                            {/* {isModalOpen && (
                                                <div className="modal-container" >
                                                    <div className="modal" style={{ padding: "30px 20px 40px 20px" }}>
                                                        <div className="flex justify-end">
                                                            <FaX onClick={closeModal} className="cursor-pointer" />
                                                        </div>
                                                        <div className="flex justify-center">
                                                            <img src="https://monetix-lookat1.quiztwiz.com/static/media/adpic.18b085351c262a96e5a9.png" alt="ads"></img>
                                                        </div>

                                                        <h2 class="text-4xl text-[#D8E91E] md:text-[1.5rem] mb-4 flex justify-center">oops!</h2>
                                                        <p class="mb-6 text-[#8E8F98] flex justify-center">Not enough coins to play</p>
                                                        <div className="flex justify-center">
                                                            <button class="bg-[#D8E91E] w-[50%] rounded-[1.5rem] text-black font-bold py-4 px-4 mr-2 flex justify-center">Watch Ad</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            )} */}
                                        </div>
                                    )}

                                    <ul class="list-disc text-white text-sm flex flex-col pb-[10px] gap-4 px-9 ">
                                        <li>You've got 90 - 150 seconds to answer all questions</li>
                                        <li>Answer as many questions as you can</li>
                                        <li>For Every Correct answer you will get +50 points and will loose -25 points on every Incorrect answer</li>
                                        <li>You can take help by using the lifelines present in the contest.</li>
                                        <li>Lifelines can be used for free or by using a given amount of coins for each lifeline.</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="footer  bg-[#0B0D26] flex justify-around lg:w-[520px]  pb-4"
                            style={{ boxShadow: "0px -15px 15px rgba(9, 58, 92,0.7)" }}
                        >
                            <Link to="/category">
                                <span >
                                    <BiCategory className="text-white ml-4 text-[20px] m-2" />
                                    <p className="text-white text-[12px]">Category</p>
                                </span>
                            </Link>
                            <Link to="/quizhome">
                                <span className=" ">
                                    <LiaHomeSolid className="text-white text-[20px] m-2" />
                                    <p className="text-white text-[12px]">Home</p>
                                </span>
                            </Link>

                            <Link to="/profile">
                                <span >
                                    <CgProfile className="text-white text-[20px] m-2" />
                                    <p className="text-white  text-[12px]">Profile</p>
                                </span>
                            </Link>
                        </div>


                    </Col>
                    <Col className="fixed me-[15%] bg-image">

                        <div className="py-16 md:py-10">
                            <img className="lg:w-[100%] md:w-[300px] " src={require('../../image/quiz-1.png')} alt=""></img>
                        </div>

                        <div class="font-bold text-center text-white md:text-sm  big:bottom-12  big:z-[-1]">
                            Welcome to QuizTimeNow. Play a quiz and earn coins.
                            <p class="font-normal text-2xl pt-4 text-center">
                                There's a quiz for everyone! </p>
                        </div>

                    </Col>
                </Row>
            </div >
        </>
    )
}
export default Play