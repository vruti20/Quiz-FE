import { Col, Row } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Subcategory = () => {
  const location = useLocation();
  const [subcategories, setSubcategories] = useState([]);
  const [isGuest, setIsGuest] = useState(true);
  const [databaseCoins, setDatabaseCoins] = useState(0);
  const allcoins=localStorage.getItem('allcoins') || 0;
  const token = localStorage.getItem('token');

  // const newcoins= localStorage.getItem("coin") || 0;
  useEffect(() => {
    const id = location.state._id; // Get the category ID from the location state
    axios
      .get(`${BaseUrl}/api/category/subcategories/${id}` ,
      {headers: {
        'ngrok-skip-browser-warning': 5000
      }})
      //  axios.get(`http://localhost:5000/api/category/subcategories/${id}`)
      .then(function (response) {
        setSubcategories(response.data.data); // Set the subcategories in the state
      })
      .catch(function (error) {
        console.log(error);
      });

      const playerIsGuest = checkIfPlayerIsGuest();

      // Set the isGuest state based on the result
      setIsGuest(playerIsGuest);
      
    const fetchDatabaseCoins = async () => {
      try {
        const response = await axios.post(`${BaseUrl}/api/updateCoins`,{coins:databaseCoins},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 5000
          }
        });
        setDatabaseCoins(response.data.totalCoins);
        console.log("coins",response.data.totalCoins);// Update with your actual API response structure
      } catch (error) {
        console.error("Error fetching database coins:", error);
      }
    }
    fetchDatabaseCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state._id, token]);

  const checkIfPlayerIsGuest = () => {
    const guestToken = localStorage.getItem('token');
    // localStorage.removeItem('token');
    console.log("TOKEN",guestToken);
    return !!guestToken;
  };
  return (
    <>
      <div className="bg-[#050230] h-[100vh]">
        <Row className="">
          <Col className="md:w-[400px]  lg:w-[520px]  py-[1px] px-2 relative flex-col flex">
            <div className="">
              <div className="flex justify-between lg:w-[520px] bg-[#0B0D26] py-[8px] cursor-pointer header"  style={{boxShadow: "0px 10px 15px rgba(8, 13, 87,0.7)"}}>
              <Link to={`/quizhome`} className="pl-[10px]">
              <div className="text-[#3FCAFF] text-2xl font-bold	italic font-serif">QuizTime !</div>
              </Link>
                <div className="flex w-[40%] justify-between">
                  <div className="flex items-center">
                    <img
                      class="w-[25px] "
                      src={require("../../../src/image/gift.gif")}
                      alt="animation"
                    />
                    <p className="text-white text-[10px] font-[700] pt-1">
                      {" "}
                      Daily Reward
                    </p>
                  </div>
                  <div className="mt-[3px]  items-center">
                    <div class="text-[10px] flex w-[110px] text-white bg-[#2DAAE2] px-[18px] py-[5px] rounded-md">
                      <img
                        className="w-3 mr-2"
                        src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg"
                        alt="svg"
                      ></img>
                      {isGuest ? databaseCoins : allcoins} COINS
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Render subcategories */}
            <div className="mt-[20%]">
              {subcategories.map((subcategory) => (
                <Link to={`/play/${subcategory._id}`}>
                  <div
                    key={subcategory._id}
                    className="flex rounded-2xl gap-2 border border-border border-[#35C6F6]  mb-[25px]">
                    <div className="flex flex-col">
                      <img
                        className="rounded-full w-[125px] p-2"
                        src={subcategory.img}
                        alt={subcategory.title}
                      ></img>
                    </div>
                    <div className="w-full ">
                      <div className="flex text-[10px] justify-end my-[5px] font-[900]">
                        <p className="text-[#D85B00] max-h-[20px]  px-2">
                          {subcategory.category.name} | {subcategory.title}
                        </p>
                      </div>
                      <div className="flex justify-end my-[8px]">
                        <p className="text-white font-[900] text-[14px]">
                          Play & Win &nbsp;
                        </p>
                        <img
                          className="w-[14px]"
                          src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg"
                          alt="coins"
                        ></img>
                        <p className="text-white font-[900] text-[14px]">
                          &nbsp;{subcategory.totalPrice}
                        </p>
                      </div>
                      <div className="flex justify-end my-[5px] text-[7px]">
                        <div className="text-[10px] flex justify-end  gap-1 sm:text-[8px]  bg-[#202255]  px-2 rounded-full">
                          <p className="text-white">Entry Fee&nbsp;</p>
                          <img
                            className="w-[10px]"
                            src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg"
                            alt="coins"
                          ></img>
                          <p className="text-white">&nbsp;{subcategory.entryFee}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[120px]">
                      <img
                        className=" rounded-full p-2"
                        src="https://monetix-lookat1.quiztwiz.com/static/media/play.17ec10000a8bb2f32711ea9c880db5c3.svg"
                        alt="Play"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* </div> */}
            <div
              className=" footer flex justify-around lg:w-[520px] bg-[#0B0D26] pb-4"
              style={{boxShadow: "0px -15px 15px rgba(8, 13, 87,0.7)"}}
            >
              <Link to="/category">
                <span className="  ">
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
                <span className=" ">
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
              Welcome to Quiztwiz. Play a quiz and earn coins.
              <p class="font-normal text-2xl pt-4 text-center">
                There's a quiz for everyone!{" "}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Subcategory;
