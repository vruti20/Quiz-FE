import axios from "axios";
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"


const Result = () => {

    const [coins, setCoins] = useState(0);
    // const [playCount, setPlayCount] = useState(0);


    const calculateEarnedCoins = (score) => {
        if (score >= 50 && score <= 150) {
            return 500;
        } else if (score >= 200 && score <= 350) {
            return 750;
        } else if (score >= 400 && score <= 550) {
            return 1000;
        } else if (score >= 600 && score <= 700) {
            return 5000;
        } else if (score >= 750) {
            return 10000;
        } else {
            return 25;
        }
    };

    const score = localStorage.getItem('score') || 0;
    // const mobileNumber = localStorage.getItem('mobileNumber')

    const earnedCoins = calculateEarnedCoins(score);
    localStorage.setItem('earnedCoins', earnedCoins)


    useEffect(() => {
        const updateCoins = async () => {
            try {
                const token = localStorage.getItem('token');

                // const score = parseInt(localStorage.getItem("score"), 10);
                // const earnedCoins= parseInt(localStorage.getItem('earnedCoins'), 10);
                console.log("FCSSF",earnedCoins);

                const response = await axios.post(`https://365c-106-201-183-58.ngrok-free.app/api/updateCoins`, 
                    {
                        // Uncomment if needed
                        // mobileNumber: mobileNumber,
                        coins: coins,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                          'ngrok-skip-browser-warning': 5000
                        },
                      }
                );

                // const data = response.data;
                console.log("DATA",response.data.totalCoins);

                // const totalCoins = data.coins;
                // console.log("TOTALCOINS",totalCoins); 

                setCoins(earnedCoins);
                console.log("COINSSS",coins);
                localStorage.setItem("coin",response.data.totalCoins)
                console.log("coins",response.data.totalCoins);
              } catch (error) {
                console.error('Error updating coins:', error);

              }
            };

            updateCoins(); 
          }, [coins,earnedCoins]);

// localStorage.clear()
    return (
        <>
            <div className="bg-[#0F172A] h-[100vh] sm:h-[100%]">

                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[520px]  px-2 relative flex-col flex" >
                        <div className="" >
                            <div className="pb-8">
                                <div className="bg-[#0F172A] lg:w-[500px] h-[360px] mx-auto mt-7 mb-[8px]">
                                    <p className="text-white text-sm text-center">ads by goggle</p>
                                </div>
                            </div>
                            <div >

                                <div>
                                    <div className="flex justify-center ">
                                        <h1 className="text-white text-4xl">Well Played</h1>
                                        <img className="w-[200px] absolute " src="https://monetix-lookat1.quiztwiz.com/static/media/animation.82d3951ab49c98d92a06.gif" alt="gift"></img>
                                    </div>

                                    <div className="grid-cols-2 flex-col pt-[100px] justify-center gap-2 grid text-white mx-[50px]">
                                        <Col className="flex flex-col items-center py-2 pl-[10px] pr-[10px] bg-[#0E1344] border-2 border-[#404380] rounded-full cursor-pointer ">
                                            <p>{score}</p>
                                            <p>Your Score</p>
                                        </Col>
                                        <Col className="flex flex-col  items-center py-2 pl-[10px] pr-[10px] bg-[#0E1344] border-2 border-[#404380] rounded-full cursor-pointer">
                                            <p>{earnedCoins}</p>
                                            {/* <p>{coins}</p> */}
                                            <p>Coins Earned</p>
                                        </Col>


                                        {/* <p> COINS</p> */}
                                    </div>
                                </div>

                                <div class="mt-5 cursor-pointer flex justify-center">
                                    <button class=" flex gap-2 rounded-full px-7 py-2 border-2 border-[#1a2f77] text-white ">
                                        Double Your winnings
                                        <img src="	https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg" alt="coin" />
                                    </button>
                                </div>

                                <div class="w-[85%] mx-auto  my-6" style={{ border: "1px solid rgb(26, 47, 119)" }}></div>

                                <Link to="/quizhome">
                                    <div className="flex justify-center ">
                                        <button class="rounded-full px-7 py-2 text-white flex justify-center " style={{ background: "rgb(26, 47, 119)" }}>
                                            Home
                                        </button>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </Col>
                    <Col className="fixed">

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
            </div>
        </>
    )
}
export default Result