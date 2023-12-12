import { Col, Row } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Subcategory = () => {
  const location = useLocation();
  const [subcategories, setSubcategories] = useState([]);
  const [isGuest, setIsGuest] = useState(true);
  const [databaseCoins, setDatabaseCoins] = useState(0);
  const allcoins=localStorage.getItem('allcoins') || 0;
  // const newcoins= localStorage.getItem("coin") || 0;
  useEffect(() => {
    const id = location.state._id; // Get the category ID from the location state
    axios
      .get(` https://365c-106-201-183-58.ngrok-free.app/api/category/subcategories/${id}` ,
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
      
    const token = localStorage.getItem('token');
    const fetchDatabaseCoins = async () => {
      try {
        const response = await axios.post("https://365c-106-201-183-58.ngrok-free.app/api/updateCoins",{coins:databaseCoins},
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
  }, [location.state._id]);
  const checkIfPlayerIsGuest = () => {
    const guestToken = localStorage.getItem('token');
    // localStorage.removeItem('token');
    console.log("TOKEN",guestToken);
    return !!guestToken;
  };
  return (
    <>
      <div className="bg-[#0F172A] h-[100vh]">
        <Row className="">
          <Col className="md:w-[400px]  lg:w-[520px]  py-[1px] px-2 relative flex-col flex">
            <div className="">
              <div className="flex justify-between lg:w-[520px] bg-[#0F172A] py-[8px] cursor-pointer header">
              <Link to={`/quizhome`} className="pl-[10px]">
                <img
                  src={require("../../image/download (1).png")}
                  alt=""
                  width={"40%"}
                />
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
                    <div class="text-[10px] flex w-[110px] text-white bg-[#1A2F77] px-[18px] py-[5px] rounded-full">
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
                    className="flex rounded-full gap-2 border border-border bg-[#1F2937] mb-[25px]"
                    style={{ borderColor: "rgb(75 85 99)" }}
                  >
                    <div className="flex flex-col">
                      <img
                        className="rounded-full w-[125px] p-2"
                        src={subcategory.img}
                        alt={subcategory.title}
                      ></img>
                    </div>
                    <div className="w-full ">
                      <div className="flex text-[10px] justify-end my-[5px] font-[900]">
                        <p className="text-[#64d2ff] max-h-[20px]  px-2">
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
                        <div className="text-[10px] flex justify-end  gap-1 sm:text-[8px]  bg-[#30d158] bg-opacity-20 text-[#30d158] px-2 rounded-full">
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
              className=" footer flex justify-around lg:w-[520px]  bg-[#0F172A] pb-4"
              style={{ boxShadow: "rgb(17, 24, 39) 0px -15px 15px" }}
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
          <Col className="fixed ">
            <div className="flex justify-center py-16 md:py-10">
              <img
                className="lg:w-[65%] md:w-[300px] "
                src="https://monetix-lookat1.quiztwiz.com/static/media/sidePoster.9c9656d2998c44eb6b57.png"
                alt=""
              ></img>
            </div>

            <div class="font-bold text-center text-white md:text-sm lg:text-2xl  big:bottom-12  big:z-[-1]">
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
