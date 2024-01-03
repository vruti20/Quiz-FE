import { Button, Col, Row } from "react-bootstrap"
import { BiCategory } from "react-icons/bi"
import { LiaHomeSolid } from "react-icons/lia"
import { CgProfile } from "react-icons/cg"
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    console.log(">>>>>>>>>>",loginscore);
    const newcoins = localStorage.getItem("logincoin") || 0;
    // console.log("<<<<<", newcoins);
    localStorage.setItem('usercoin', 0)

    // Function to open the modal
    const openModal = () => {
        console.log('Opening modal');
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };
    // Function to deduct coins

    // const deductCoins = async () => {
    //     const updatedScore = loginscore - 100;
    
    //     // Check if the updated score is non-negative
    //     if (databaseCoins >= 100) {
    //         localStorage.setItem('coins', updatedScore);
    
    //         try {
    //             const token = localStorage.getItem('token');
    //             const response = await axios.post(
    //                 `${BaseUrl}/api/updateCoins`,
    //                 { coins: -100 },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                         'ngrok-skip-browser-warning': 5000,
    //                     },
    //                 }
    //             );
    
    //             // Check if the API request was successful
    //             if (response.data.status === 'Success') {
    //                 // Update the local state or storage with the new coin value
    //                 if (isGuest) {
    //                     localStorage.setItem('coin', newcoins - 100);
    //                     // navigate(`/question/${categoryid}`);
    //                 } else {
    //                     setUserCoins(userCoins - 100);
    //                 }
    
    //                 if (isGuest && databaseCoins >= 100) {
    //                     // Navigate to the question page
    //                     console.log('user', databaseCoins);
    //                     navigate(`/question/${categoryid}`);
    //                 } else {
    //                     openModal();
    //                 }
    //             } else {
    //                 // Handle API request failure
    //                 console.log('API request failed:', response.data.message);
    //             }
    //         } catch (error) {
    //             // Handle errors, e.g., network issues
    //             console.error('Error deducting coins:', error);
    //         }
    //     } else {
    //         // Handle the case where the updated score is negative
    //                     openModal();
    //                     console.log('Score cannot be negative');
    //         // You may want to show an error message to the user or handle it accordingly
    //     }
    // };
    
    const deductCoins = async () => {
        if (loginscore >= 100) {
            
            const updatedScore = loginscore - 100;
            localStorage.setItem('coins', updatedScore);
            navigate(`/question/${categoryid}`);

        } else {
            console.log("no coins");
            openModal();
        }
        // console.log("UPDATE", updatedScore);
        try {
            if(databaseCoins >= 100){

                const token = localStorage.getItem('token');
                const response = await axios.post(`${BaseUrl}/api/updateCoins`,
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
                        // navigate(`/question/${categoryid}`);
    
                    } else {
                        setUserCoins(userCoins - 100);
                    }
    
                    if (isGuest && databaseCoins >= 100) {
                        // Navigate to the question page
                        console.log("user",databaseCoins);
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
                const response = await axios.get(`${BaseUrl}/api/quesation/questions?quiz=${categoryid}`,
                    {
                        headers: {
                            'ngrok-skip-browser-warning': 5000
                        }
                    });
                const newQuizData = response.data.data.map(item => item.quiz);
                setSubcategories(newQuizData.slice(0, 1));
                // console.log("QUIZOBJECT", newQuizData);
                // console.log("HOMECTAEGORY:", response.data.data[0].quiz);
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
                // console.log("coins", response.data.totalCoins);// Update with your actual API response structure
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
        // localStorage.removeItem('token');
        // console.log("TOKEN", guestToken);
        return !!guestToken;
    };

    return (
        <>
            <div className="bg-color">

                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[500px]  px-2 relative flex-col flex" >
                        <div className="" >
                            <div className="flex justify-between lg:w-[520px] py-[8px] cursor-pointer bg-color header">
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
                                        <div class="text-[10px] flex w-[110px] text-white bg-[#2DAAE2] px-[18px] py-[5px] rounded-full">
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

                                <div className="border-2 border-sky-300 w-full pb-[10px] m-[5px] rounded-[30px] " style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} >

                                    {subcategories.map((quiz, index) => (
                                        <div key={index} className="px-5 gap-2 flex items-center py-6">
                                            <img
                                                className="w-[60px] sm:w-[52px] rounded-full "
                                                src={quiz.category.img}
                                                alt="category"
                                            />
                                            <div className="">
                                                <p className="text-[10px] text-[#54c05d] font-black ">{quiz.title}</p>
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
                                        // <Link to={`/question/${categoryid}`}>
                                        <div className="flex justify-center pb-6">
                                            <Button onClick={deductCoins} className=" py-[10px] px-8 bg-[#F29200]  rounded-full text-white font-bold cursor-pointer">
                                                PLAY QUIZ
                                            </Button>
                                            {isModalOpen && (
                                                <div className="modal-container" >
                                                <div className="modal" style={{padding:"30px 20px 40px 20px"}}>
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
                                        </div>
                                        // </Link>
                                    ) : (

                                        <div className="flex w-full justify-around pb-[25px]">
                                            <Link to="/login">
                                                <button  class="bg-orange-500 py-2 px-14 font-[700] text-white rounded-full">JOIN NOW</button>
                                            </Link>
                                            <p className="text-[20px] text-white">or</p>
                                           
                                                <div onClick={deductCoins} class="border border-[#afdeec] text-white text-center rounded-full font-bold text-sm py-3  px-10 cursor-pointer">
                                                    PLAY AS GUEST
                                                </div>
                                                {isModalOpen && (
                                                <div className="modal-container" >
                                                <div className="modal" style={{padding:"30px 20px 40px 20px"}}>
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

                        <div className="footer  bg-color flex justify-around lg:w-[520px]  pb-4" 
                        style={{boxShadow: "0px -15px 15px rgba(9, 58, 92,0.5)"}}
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
                    <Col className="fixed ">

                        <div className="flex justify-center py-16 md:py-10">
                            <img className="lg:w-[65%] md:w-[300px] " src={require('../../../src/image/image2.png')} alt=""></img>
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