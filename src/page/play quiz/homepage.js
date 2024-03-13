import { Col, Row } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BaseUrl = process.env.REACT_APP_BASEURL;
const Home = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // fetch all category data 
  const [categorydata, setCategory] = useState([]); // fetch all subcategory data
  const [subcategories, setSubcategories] = useState([]); // fetch single category data
  const [selectedCategory, setSelectedCategory] = useState(null); //onclick event show category
  const [categoryid, setCategoryid] = useState(null); // category data with page navigate
  const [isClick, setIsClick] = useState(false); // click event change background color
  const [isGuest, setIsGuest] = useState(true); //show coins in header
  const [playCount, setPlayCount] = useState(0); //quiz play numbers
  const [databaseCoins, setDatabaseCoins] = useState(0); // databases coins show
  const updated = parseInt(localStorage.getItem("coins")) || 0;
  const earnedCoins = parseInt(localStorage.getItem("earnedCoins")) || 0;
  const allcoin = parseInt(updated) + parseInt(earnedCoins);
  localStorage.setItem("allcoin", allcoin);
  localStorage.setItem("additionDone", "true");
  const additionDone = localStorage.getItem("additionDone");
  const usercoin = localStorage.getItem("usercoin") || 0;

  const location = useLocation();
  const handlePopstate = () => {
    // Check if the current pathname is the home page
    if (location.pathname === "/quizhome") {
      // Perform any cleanup or prevent navigation logic here
      // Example: navigate to login page
      navigate('/login');
    }
  };

  useEffect(() => {
    // Cleanup the event listener when component unmounts
    window.removeEventListener('popstate', handlePopstate);
    return () => {
      window.addEventListener('popstate', handlePopstate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (additionDone !== true) {
    const updatedAllCoins = parseInt(allcoin) + parseInt(usercoin);
    localStorage.setItem("allcoins", updatedAllCoins);
    localStorage.setItem("additionDone", "false");
  }
  const allcoins = localStorage.getItem("allcoins");
  // click event change background color
  const handleisClick = () => {
    setIsClick(!isClick);
  };
  useEffect(() => {
    const storedPlayCountString = sessionStorage.getItem("playCount");
    const storedPlayCount =
      storedPlayCountString !== null ? parseInt(storedPlayCountString) : 0;
    setPlayCount(storedPlayCount);
  }, []);


  //onclick page navigate
  const handleCategoryid = (categoryid) => {
    setCategoryid(categoryid);
    sessionStorage.setItem("playCount", (playCount + 1).toString());
    // Set the state with the updated play count
    setPlayCount((prevPlayCount) => prevPlayCount + 1);
    // Navigate to the new page
    navigate(`/play/${categoryid}`);
  };

  //onclick event change background color
  const getBackgroundColorClass = (categoryId) => {
    return selectedCategory === categoryId ||
      (categoryId === "All" && selectedCategory === null)
      ? "bg-[#1A2F77]"
      : "";
  };

  const fetchDatabaseCoins = async () => {
    const token = localStorage.getItem("token");
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
  useEffect(() => {
    if (selectedCategory === null && categories?.length === 0) {
      fetchDatabaseCoins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, categories]);

  //Show All Category Data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/category/allcategories`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/category/allsubcategories`
        );
        setCategory(response.data.data);
   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchSubCategory = async () => {
      try {
        if (selectedCategory) {
          const response = await axios.get(
            `${BaseUrl}/api/category/subcategories/${selectedCategory}`
          );
          setSubcategories(response.data.data);

        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    const playerIsGuest = checkIfPlayerIsGuest();
    // Set the isGuest state based on the result
    setIsGuest(playerIsGuest);
    fetchCategory();
    fetchSubCategory();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, categoryid]);
  const checkIfPlayerIsGuest = () => {
    const guestToken = localStorage.getItem("token");
    // localStorage.removeItem('token');
    return !!guestToken;
  };
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === "All" ? null : categoryId);
  };
  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: -200, // Adjust the value based on your preference
        behavior: 'smooth',
      });
    }
  };
  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollBy({
        left: 200, // Adjust the value based on your preference
        behavior: 'smooth',
      });
    }
  };
  let touchStartX = 0;
let touchMoveX = 0;

const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  touchMoveX = e.touches[0].clientX;
  const scrollAmount = touchStartX - touchMoveX;

  if (menuRef.current) {
    menuRef.current.scrollLeft += scrollAmount;
  }

  touchStartX = touchMoveX;
};

  return (
    <>
      <div>
        <Row className="">
          <Col className="md:w-[400px]  lg:w-[520px] relative flex-col flex overflow-y-auto">
            <div className="">
              <div
                className="flex  justify-between items-center  lg:w-[520px]  py-[8px] cursor-pointer bg-[#0B0D26] header"
                style={{ boxShadow: "0px 10px 15px rgba(8, 13, 87,0.7)" }}
              >
                <Link to={`/quizhome`} className="px-[10px] m-0 p-0">
                  <div className="text-[#3FCAFF] md:text-2xl sm:text-lg font-bold italic font-serif">
                    QuizTime !
                  </div>
                </Link>
                <div className="flex  justify-between">
                  <div className="flex items-center">
                    <img
                      className="w-[25px] "
                      src={require("../../../src/image/gift.gif")}
                      alt="animation"
                    />
                    <p className="text-white text-[10px] font-[700] pt-1">
                      Daily Reward
                    </p>
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
                </div>
              </div>
              {/* <div className="bg-white mt-[50px] h-[350px] mx-auto mb-[8px]">
                <p className="text-black text-center">ads by goggle</p>
              </div> */}
              <div className="flex justify-between pb-[30px] pt-10 nav_menu " style={{ position: 'fixed', marginTop: '45px', overflow: 'hidden', backgroundColor: '#050230' }}>
                <div className="flex items-center">
                  <BsChevronLeft
                    className="text-white text-[25px] cursor-pointer me-2"
                    onClick={scrollLeft}
                  />
                </div>
                <div ref={menuRef} className="overflow-hidden"   onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}>
                  <div className="flex text-white justify-center pl-[1220px] mx-2 ms-[220px]">
                    <div
                      onClick={() => handleCategoryClick("All")}
                      className={`flex-none flex text-[10px] border cursor-pointer border-[#1A2F77] rounded-xl items-center px-8 mx-4 py-[4px] h-[35px] ${getBackgroundColorClass(
                        "All"
                      )}`}
                    >
                      <p>All</p>
                    </div>
                    {categories?.map((data) => (
                      <div
                        key={data._id}
                        className={`flex-none flex text-[10px] border cursor-pointer border-[#1A2F77]  rounded-xl items-center px-8 mx-4 py-[4px] h-[35px] hover:bg-[#1A2F77] ${getBackgroundColorClass(
                          data._id
                        )} `}
                        onClick={() => handleCategoryClick(data._id)}
                      >
                        <p>{data.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <BsChevronRight
                    className="text-white text-[25px] cursor-pointer ms-2"
                    onClick={scrollRight}
                  />
                </div>
              </div>
        
              {/* <Link to={`/play/${categoryid}`}> */}
              <div className="pb-[125px] mt-[200px]">
                {selectedCategory
                  ? subcategories?.map((data) => (
                    <div
                      onClick={() => handleCategoryid(data._id)}
                      key={data._id}
                      className="flex rounded-2xl gap-2 border mb-[25px] border-[#35C6F6]"
                    >
                      <div className="flex flex-col">
                        <img
                          className="rounded-full w-[125px] p-2"
                          src={data.category.img}
                          alt={data.title}
                        ></img>
                      </div>
                      <div className="w-full ">
                        <div className="flex text-[10px] justify-end my-[5px] font-[900]">
                          <p className="text-[#D85B00] max-h-[20px]  px-2">
                          {data.category.name} | {data.title}
                          </p>
                        </div>
                        <div className="flex justify-end my-[8px]">
                          <p className="text-white font-[900] text-[14px]">
                            Play & Win &nbsp;
                          </p>
                          <img
                            className="w-[20px]"
                            src={require('../../image/coins-1.png')}
                            alt="coins"
                          ></img>
                          <p className="text-white font-[900] text-[14px]">
                            &nbsp;{data?.totalPrice}
                          </p>
                        </div>
                        <div className="flex justify-end my-[5px] text-[7px]">
                          <div className="text-[10px] flex justify-end  gap-1 sm:text-[8px]  bg-[#191a4d] px-2 rounded-full">
                            <p className="text-white">Entry Fee&nbsp;</p>
                            <img
                              className="w-[15px]"
                              src={require('../../image/coins-1.png')}
                              alt="coins"
                            ></img>
                            <p className="text-white">
                              &nbsp;{data?.entryFee}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[120px]">
                        <img
                          className=" rounded-full p-2"
                          // src="https://monetix-lookat1.quiztwiz.com/static/media/play.17ec10000a8bb2f32711ea9c880db5c3.svg"
                          src={require('../../image/play.jpeg')}
                          alt="Play"
                        />
                      </div>
                    </div>
                  ))
                  : categorydata?.map((category, index) => (
                    <div
                      onClick={() => handleCategoryid(category._id)}
                      key={index}
                      className="flex rounded-2xl gap-2 border border-[#35C6F6]  mb-[25px]"
                    >
                      <div className="flex flex-col">
                        <img
                          className="rounded-full w-[125px] p-2"
                          src={category.category.img}
                          alt={category.title}
                        ></img>
                      </div>
                      <div className="w-full ">
                        <div className="flex text-[10px] justify-end my-[5px] font-[900]">
                          <p className="text-[#D85B00] max-h-[20px] px-2">
                          {category.category.name} | {category.title}
                          </p>
                        </div>
                        <div className="flex justify-end my-[8px]">
                          <p className="text-white font-[900] text-[14px]">
                            Play & Win &nbsp;
                          </p>
                          <img
                            className="w-[20px]"
                            src={require('../../image/coins-1.png')}
                            alt="coins"
                          ></img>
                          <p className="text-white font-[900] text-[14px]">
                            &nbsp;{category.totalPrice}
                          </p>
                        </div>
                        <div className="flex justify-end my-[5px] text-[7px]">
                          <div className="text-[10px] flex justify-end  gap-1 sm:text-[8px]  bg-[#202255]  px-2 rounded-full">
                            <p className="text-white">Entry Fee&nbsp;</p>
                            <img
                              className="w-[15px]"
                              src={require('../../image/coins-1.png')}
                              alt="coins"
                            ></img>
                            <p className="text-white">
                              &nbsp;{category.entryFee}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-[120px]">
                        <img
                          className=" rounded-full p-2"
                          // src="https://monetix-lookat1.quiztwiz.com/static/media/play.17ec10000a8bb2f32711ea9c880db5c3.svg"
                          src={require('../../image/play.jpeg')}
                          alt="Play"
                        />
                      </div>
                    </div>
                  ))}
              </div>
              {/* </Link> */}
            </div>
            <div
              className=" footer  flex justify-around bg-[#0B0D26] pb-4"
              style={{ boxShadow: "0px -15px 15px rgba(8, 13, 87,0.7)" }}
            >
              <Link to="/category" >
                <div className={`px-8 py-1 rounded-[28px] `}>
                  <BiCategory className="text-white ml-4 text-[20px]  mx-2 my-1" />
                  <p className="text-white text-[12px]">Category</p>
                </div>
              </Link>
              <Link to="/quizhome">
                <div
                  className={`px-8 py-1 rounded-xl  ${isClick ? "" : "bg-[#389A06]"
                    }`}
                  onClick={handleisClick}
                >
                  <LiaHomeSolid className="text-white text-[20px] mx-2 my-1" />
                  <p className="text-white text-[12px]">Home</p>
                </div>
              </Link>
              <Link to="/profile">
                <div className={`px-8 py-1 rounded-[28px] `}>
                  <CgProfile className={`text-white text-[20px] mx-2 my-1`} />
                  <p className="text-white text-[12px]">Profile</p>
                </div>
              </Link>
            </div>
          </Col>
          <Col className="fixed me-[15%] bg-image">
            <div className="py-16 md:py-10">
              <img
                className="lg:w-[100%]"
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
export default Home;
