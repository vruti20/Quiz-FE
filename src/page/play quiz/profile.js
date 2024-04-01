import { Col, Row } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineMenu } from "react-icons/ai";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Profile = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [databaseCoins, setDatabaseCoins] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allcoins = localStorage.getItem("allcoins") || 0;
  // const newcoins= localStorage.getItem("coin") || 0;
const Email = sessionStorage.getItem("email");


  let playCount = sessionStorage.getItem("playCount") || 0;
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDatabaseCoins = async () => {
      try {
        const response = await axios.post(
          `${BaseUrl}/api/updateCoins`,
          { coins: databaseCoins },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDatabaseCoins(response.data.totalCoins);
      } catch (error) {
        console.error("Error fetching database coins:", error);
      }
    };
    fetchDatabaseCoins();
    const playerIsGuest = checkIfPlayerIsGuest();

    // Set the isGuest state based on the result
    setIsGuest(playerIsGuest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkIfPlayerIsGuest = () => {
    const guestToken = localStorage.getItem("token");
    return !!guestToken;
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
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
        <Row>
          <Col className="md:w-[400px]  lg:w-[520px]  relative flex-col flex ">
            <div className="mb-[300px]">
              {/* <div className="flex justify-between lg:w-[520px] py-[8px] cursor-pointer bg-[#0B0D26] header" style={{boxShadow: "0px 10px 15px rgba(8, 13, 87,0.7)"}}
>
                <Link to={`/quizhome`} className="px-[10px] p-0 m-0">
                <div className="text-[#3FCAFF] md:text-2xl sm:text-lg font-bold	italic font-serif">QuizTime !</div>
                </Link>

                <div className="flex justify-between">
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
                  <div className="mt-[3px] flex items-center ml-1">
                    <div class="text-[10px] flex w-[110px] text-white bg-[#2DAAE2] px-[18px] py-[5px] rounded-md me-2">
                    <img
                        className="w-[14px] mr-1"
                        src={require('../../image/coins-1.png')}
                        alt="svg"
                      ></img>
                      <p>{isGuest ? databaseCoins : allcoins} COINS</p>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="flex justify-center w-full gap-10 mt-6 pt-14">
                <div className="w-32  rounded-full ">
                  <img
                    className="h-32 rounded-full bg-[#f6f6f711]"
                    src={require("../../../src/image/download.png")}
                    alt="profile"
                  ></img>
                </div>
                <div class="flex gap-1 flex-col items-center justify-center text-white">
                  <p class="text-3xl">User X</p>
                  {/* {
                    isGuest ?
                  <p class="text-sm">
                    {mobileNumber}
                    </p> :
                    <p>
                      mobile not updated
                    </p>
                  } */}
                  <p class="text-sm">mobile not updated</p>
                  {
                    isGuest ?
                  <p class="text-sm">
                    {Email}
                    </p> :
                    <p>
                      Email not updated
                    </p>
                  }
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 gap-10">
                <div className="w-[150px] rounded-xl py-2 px-4 flex justify-between items-center bg-[#1A2F77] ">
                  <p className="text-white text-sm">Coins </p>
                  <p className="text-white text-lg">
                    {" "}
                    {isGuest ? databaseCoins : allcoins}
                  </p>
                </div>
                <div class="w-[150px] py-2 px-4 rounded-xl border-2 border-[#1A2F77]  flex  items-center justify-between">
                  <p class="text-white text-sm">Quiz Played</p>
                  <p class="text-white text-lg">{playCount}</p>
                </div>
              </div>
              {isGuest ? (
                <></>
              ) : (
                <Link to={`/login`}>
                  <div class="flex justify-center mt-6">
                    <p className="text-center mx-3 py-3 px-12 font-[700] bg-[#D85B00]  text-white rounded-md cursor-pointer">
                      Join Now
                    </p>
                  </div>
                </Link>
              )}
              {/* <div className="pb-8">
                <div className="bg-white lg:w-[500px] h-[360px] mx-auto mt-7 mb-[8px]">
                  <p className="text-black text-sm text-center">
                    ads by goggle
                  </p>
                </div>
              </div> */}
            </div>

            <div
              className=" footer flex justify-around lg:w-[520px] bg-[#0B0D26] pb-4"
              style={{boxShadow: "0px -15px 15px rgba(8, 13, 87,0.7)"}}
            >
              <Link to="/category">
                <div className={`px-8 py-1 rounded-[28px] `}>
                  <BiCategory className="text-white ml-4 text-[20px]  mx-2 my-1" />
                  <p className="text-white text-[12px]">Category</p>
                </div>
              </Link>
              <Link to="/quizhome">
                <div className={`px-8 py-1 rounded-[28px]`}>
                  <LiaHomeSolid className="text-white text-[20px] mx-2 my-1" />
                  <p className="text-white text-[12px]">Home</p>
                </div>
              </Link>

              <Link to="/profile">
                <div
                  className={`px-8 py-1 rounded-xl ${
                    isClicked ? "" : "bg-[#389A06]"
                  }`}
                  onClick={handleClick}
                >
                  <CgProfile className={`text-white text-[20px] mx-2 my-1`} />
                  <p className="text-white text-[12px]">Profile</p>
                </div>
              </Link>
            </div>
          </Col>
          <Col className="fixed me-[15%] bg-image mt-10">
          <div className="py-16 md:py-10">
                        <img className="lg:w-[100%] md:w-[300px] " src={require('../../image/quiz-1.png')} alt=""></img>
                        </div>

            <div class="font-bold text-center text-white md:text-sm  big:bottom-12  big:z-[-1]">
              Welcome to QuizTimeNow. Play a quiz and earn coins.
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
export default Profile;
