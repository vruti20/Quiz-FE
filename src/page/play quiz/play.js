import { Button, Col, Row } from "react-bootstrap"
import { BiCategory } from "react-icons/bi"
import { LiaHomeSolid } from "react-icons/lia"
import { CgProfile } from "react-icons/cg"
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { FaX } from "react-icons/fa6";
import axios from "axios"
// import Question from "./question"

const Play = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [isGuest, setIsGuest] = useState(true);
    const { categoryid } = useParams();
    const [userCoins, setUserCoins] = useState(0);
    const [databaseCoins, setDatabaseCoins] = useState(0);
    const loginscore = localStorage.getItem('allcoins') || 0;
    const newcoins = localStorage.getItem("coin") || 0;
    localStorage.setItem('usercoin', 0)

    // Function to deduct coins

    const deductCoins = async () => {
        const updatedScore = loginscore - 100;
        console.log(">>>>>>>>>>>>>why not", updatedScore);
        localStorage.setItem('coins', updatedScore);

        try {
            // Check if the user has enough coins
            if (isGuest ? newcoins < 100 : loginscore < 100) {
                // Display an error message or take appropriate action
                console.log('Not enough coins');
                return;
            }

            const token = localStorage.getItem('token');
            const response = await axios.post('https://f504-2409-40c1-46-b463-a039-6a1e-5e6e-212f.ngrok-free.app/api/updateCoins',
                { coins: -100 },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 5000
                    }
                }
            );

            // Check if the API request was successful
            if (response.data.status === 'Success') {
                // Update the local state or storage with the new coin value
                if (isGuest) {
                    localStorage.setItem('coin', newcoins - 100);
                } else {
                    setUserCoins(userCoins - 100);
                }
                // Redirect or perform other actions after deducting coins
                // For example, redirect to the quiz page
                // history.push(`/question/${categoryid}`);
            } else {
                // Handle API request failure
                console.log('API request failed:', response.data.message);
            }
        } catch (error) {
            // Handle errors, e.g., network issues
            console.error('Error deducting coins:', error);
        }
    };
    const updated = parseInt(localStorage.getItem('coins')) || 0;
    const earnedCoins = parseInt(localStorage.getItem('earnedCoins')) || 0;
    const allcoins = parseInt(updated) + parseInt(earnedCoins);
    localStorage.setItem('allcoin', allcoins);
    console.log("LOGINPLUs", allcoins);

    // Function to open the modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`https://f504-2409-40c1-46-b463-a039-6a1e-5e6e-212f.ngrok-free.app/api/quesation/questions?quiz=${categoryid}`,
                    {
                        headers: {
                            'ngrok-skip-browser-warning': 5000
                        }
                    });
                const newQuizData = response.data.data.map(item => item.quiz);
                setSubcategories(newQuizData.slice(0, 1));
                console.log("QUIZOBJECT", newQuizData);
                console.log("HOMECTAEGORY:", response.data.data[0].quiz);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const token = localStorage.getItem('token');
        const fetchDatabaseCoins = async () => {
            try {
                const response = await axios.post("https://f504-2409-40c1-46-b463-a039-6a1e-5e6e-212f.ngrok-free.app/api/updateCoins", 
                { coins: databaseCoins },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setDatabaseCoins(response.data.totalCoins);
                console.log("coins", response.data.totalCoins);// Update with your actual API response structure
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

    }, [categoryid]);

    const checkIfPlayerIsGuest = () => {
        const guestToken = localStorage.getItem('token');
        // localStorage.removeItem('token');
        console.log("TOKEN", guestToken);
        return !!guestToken;
    };

    return (
        <>
            <div className="bg-[#0F172A] ">

                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[500px]  px-2 relative flex-col flex" >
                        <div className="" >
                            <div className="flex justify-between lg:w-[520px] py-[8px] cursor-pointer bg-[#0F172A] header">
                                <Link to={`/quizhome`} className="pl-[10px]">
                                    <img
                                        src={require("../../image/download (1).png")}
                                        alt=""
                                        width={"35%"}
                                    />
                                </Link>
                                <div className="flex justify-between">
                                    <div className="flex items-center">

                                        <img class="w-[25px] " src={require("../../../src/image/gift.gif")} alt="animation" />
                                        <p className="text-white text-[10px] font-[700] pt-1"> Daily Reward</p>
                                    </div>
                                    <div className="mt-[3px] flex items-center ml-1">
                                        <div class="text-[10px] flex w-[110px] text-white bg-[#1A2F77] px-[18px] py-[5px] rounded-full">
                                            <img className="w-3 mr-2" src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg" alt="svg"></img>
                                            <p>
                                                {isGuest ? databaseCoins : loginscore} COINS
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="bg-transparent mt-[50px] h-[370px] mx-auto mb-[8px]">
                                <p className="text-center text-white">
                                    ads by goggle
                                </p>
                            </div>
                            <div className="pb-[150px]">

                                <div className="border-2 w-full pb-[10px] m-[5px] rounded-[30px]" style={{ borderColor: "rgb(75 85 99)" }}>

                                    {subcategories.map((quiz, index) => (
                                        <div key={index} className="px-5 gap-2 flex items-center py-6">
                                            <img
                                                className="w-[60px] sm:w-[52px] rounded-full "
                                                src={quiz.category.img}
                                                alt="category"
                                            />
                                            <div className="">
                                                <p className="text-[10px] text-[#64d2ff] font-black ">{quiz.title}</p>
                                                <div className="flex text-white text-[18px] font-black cursor-pointer">
                                                    <p>Play Win</p>
                                                    <img
                                                        className="w-5 ms-2"
                                                        src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg"
                                                        alt="svg"
                                                    />
                                                    <p className="ms-2">{quiz.totalPrice}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isGuest ? (
                                        // Render only the "PLAY" button when the user is logged in
                                        <Link to={`/question/${categoryid}`}>
                                            <div className="flex justify-center pb-6">
                                                <Button onClick={deductCoins} className=" py-[10px] px-8 bg-[#1F01FF] border-[1px] rounded-full text-white font-bold cursor-pointer">
                                                    PLAY QUIZ
                                                </Button>
                                            </div>
                                        </Link>
                                    ) : (

                                        <div className="flex w-full justify-around pb-[25px]">
                                            <Link to="/login">
                                                <button onClick={openModal} class="bg-[#1A2F77] py-2 px-14 font-[700] text-white rounded-full">JOIN NOW</button>
                                            </Link>
                                            <p className="text-[20px] text-white">or</p>
                                            {isModalOpen && (
                                                <div className="modal-container">
                                                    <div className="modal">
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
                                            )}
                                            <Link to={`/question/${categoryid}`}>
                                                <div onClick={deductCoins} class=" border-[1px] text-white text-center rounded-full font-bold text-sm py-3  px-10 cursor-pointer">
                                                    PLAY AS GUEST
                                                </div>
                                            </Link>
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

                        <div className=" footer flex justify-around lg:w-[520px] bg-[#0F172A] pb-4" style={{ boxShadow: "rgb(17, 24, 39) 0px -15px 15px" }}>
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
                    <Col className="fixed ">

                        <div className="flex justify-center py-16 md:py-10">
                            <img className="lg:w-[65%] md:w-[300px] " src="https://monetix-lookat1.quiztwiz.com/static/media/sidePoster.9c9656d2998c44eb6b57.png" alt=""></img>
                        </div>

                        <div class="font-bold text-center text-white md:text-sm lg:text-2xl  big:bottom-12  big:z-[-1]">
                            Welcome to Quiztwiz. Play a quiz and earn coins.
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