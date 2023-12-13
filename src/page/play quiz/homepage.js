import { Col, Row } from "react-bootstrap";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { LiaHomeSolid } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
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
  const [playCount, setPlayCount] = useState(0);//quiz play numbers
  const [databaseCoins, setDatabaseCoins] = useState(0);// databases coins show

  const updated = parseInt(localStorage.getItem('coins')) || 0;
  const earnedCoins = parseInt(localStorage.getItem('earnedCoins')) || 0;
  const allcoin = parseInt(updated) + parseInt(earnedCoins);

  localStorage.setItem('allcoin', allcoin);
  localStorage.setItem('additionDone', 'true');
  const additionDone = localStorage.getItem('additionDone');
  const usercoin = localStorage.getItem("usercoin") || 0;
  
  if ( additionDone !== true ) {
    const updatedAllCoins = parseInt(allcoin) + parseInt(usercoin);
    console.log('updatedAllCoins:', updatedAllCoins);
    localStorage.setItem('allcoins', updatedAllCoins);
    localStorage.setItem('additionDone', 'false');
  }

  const allcoins=localStorage.getItem('allcoins')

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
  //Show All Category Data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/category/allcategories`,
          {
            headers: {
              "ngrok-skip-browser-warning": 5000,
            },
          }
        );
        // const response = await axios.get(
        //   "http://localhost:5000/api/category/allcategories"
        // );
        setCategories(response.data.data);
        console.log("CATEGORY LIST", response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }

      const token = localStorage.getItem("token");
      const fetchDatabaseCoins = async () => {
        try {
          const response = await axios.post(
            `${BaseUrl}/api/updateCoins`,
            { coins: databaseCoins },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": 5000,
              },
            }
          );
          setDatabaseCoins(response.data.totalCoins);
          console.log("coins", response.data.totalCoins); // Update with your actual API response structure
        } catch (error) {
          console.error("Error fetching database coins:", error);
        }
      };
      fetchDatabaseCoins();
    };
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/api/category/allsubcategories`,
          {
            headers: {
              "ngrok-skip-browser-warning": 5000,
            },
          }
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
            `${BaseUrl}/api/category/subcategories/${selectedCategory}`,
            {
              headers: {
                "ngrok-skip-browser-warning": 5000,
              },
            }
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
    console.log("TOKEN", guestToken);
    return !!guestToken;
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === "All" ? null : categoryId);
  };

  const scrollLeft = () => {
    if (menuRef.current) {
      menuRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      menuRef.current.scrollLeft += 300;
    }
  };

  return (
    <>
      <div
        className={`bg-[#0F172A] ${
          selectedCategory ? "h-[1400px]" : "h-[100%]"
        }`}
      >
        <Row className="">
          <Col className="md:w-[400px]  lg:w-[520px] py-[1px] px-2 relative flex-col flex overflow-y-auto">
            <div className="">
              <div className="flex justify-between items-center	 lg:w-[520px]  py-[8px] cursor-pointer bg-[#0F172A] header">
                <Link to={`/quizhome`} className="pl-[10px]">
                  <img
                    src={require("../../image/download (1).png")}
                    alt=""
                    width={"40%"}
                  />
                </Link>

                <div className="flex  justify-between">
                  <div className="flex items-center">
                    <img
                      class="w-[25px] "
                      src={require("../../../src/image/gift.gif")}
                      alt="animation"
                    />
                    <p className="text-white text-[10px] font-[700] pt-1">
                      Daily Reward
                    </p>
                  </div>
                  <div className="mt-[3px] flex items-center ml-1">
                    <div class="text-[10px] flex text-white w-[110px] bg-[#1A2F77] px-[18px] py-[5px] rounded-full">
                      <img
                        className="w-3 mr-2"
                        src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg"
                        alt="svg"
                      ></img>
                      <p> {isGuest ? databaseCoins : allcoins} COINS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F172A] mt-[50px] h-[350px] mx-auto mb-[8px]">
                <p className="text-white text-center">ads by goggle</p>
              </div>

              <div className="flex justify-between px-[3px] pb-[30px] pt-10 ">
                <div className="flex items-center">
                  <BsChevronLeft
                    className="text-white text-[14px] cursor-pointer"
                    onClick={scrollLeft}
                  />
                </div>

                <div ref={menuRef} className="overflow-hidden">
                  <div className="flex text-white justify-center pl-[1240px] mx-2 ms-[220px]">
                    <div
                      onClick={() => handleCategoryClick("All")}
                      className={`flex-none flex text-[10px] nborder border-2 cursor-pointer border-border rounded-full items-center px-8 mx-4 py-[4px] h-[35px] ${getBackgroundColorClass(
                        "All"
                      )}`}
                    >
                      <p>All</p>
                    </div>
                    {categories.map((data) => (
                      <div
                        key={data._id}
                        className={`flex-none flex text-[10px] nborder border-2 cursor-pointer border-border rounded-full items-center px-8 mx-4 py-[4px] h-[35px] ${getBackgroundColorClass(
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
                    className="text-white text-[14px] cursor-pointer"
                    onClick={scrollRight}
                  />
                </div>
              </div>

              {/* <Link to={`/play/${categoryid}`}> */}

              <div className="pb-[125px]">
                {selectedCategory
                  ? subcategories.map((data) => (
                      <div
                        onClick={() => handleCategoryid(data._id)}
                        key={data._id}
                        className="flex rounded-full gap-2 border border-border  bg-[#1F2937] mb-[25px]"
                        style={{ borderColor: "rgb(75 85 99)" }}
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
                            <p className="text-[#64d2ff] max-h-[20px]  px-2">
                              {data.category.name} | {data.title}
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
                              &nbsp;{data.totalPrice}
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
                              <p className="text-white">
                                &nbsp;{data.entryFee}
                              </p>
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
                    ))
                  : categorydata.map((category, index) => (
                      <div
                        onClick={() => handleCategoryid(category._id)}
                        key={index}
                        className="flex rounded-full gap-2 border border-border  bg-[#1F2937] mb-[25px]"
                        style={{ borderColor: "rgb(75 85 99)" }}
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
                            <p className="text-[#64d2ff] max-h-[20px] px-2">
                              {category.category.name} | {category.title}
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
                              &nbsp;{category.totalPrice}
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
                              <p className="text-white">
                                &nbsp;{category.entryFee}
                              </p>
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
                    ))}
              </div>
              {/* </Link> */}
            </div>
            <div
              className=" footer flex justify-around lg:w-[520px] bg-[#0F172A] pb-4"
              style={{ boxShadow: "rgb(17, 24, 39) 0px -15px 15px" }}
            >
              <Link to="/category">
                <div className={`px-8 py-1 rounded-[28px] `}>
                  <BiCategory className="text-white ml-4 text-[20px]  mx-2 my-1" />
                  <p className="text-white text-[12px]">Category</p>
                </div>
              </Link>
              <Link to="/quizhome">
                <div
                  className={`px-8 py-1 rounded-[28px] ${
                    isClick ? "" : "bg-[#1A2F77]"
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
export default Home;
