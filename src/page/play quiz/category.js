import { Col, Row } from "react-bootstrap"
import { IoSearch } from "react-icons/io5";
import { BiCategory } from "react-icons/bi"
import { LiaHomeSolid } from "react-icons/lia"
import { CgProfile } from "react-icons/cg"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Category = () => {
    const navigate = useNavigate();

    const [isGuest, setIsGuest] = useState(true); //show coins in header
    const [categories, setCategories] = useState([]); // fetch the categories data
    const [searchInput, setSearchInput] = useState(""); // serch the category name
    const [click, setClick] = useState(false); //click event  change background color
    const [databaseCoins, setDatabaseCoins] = useState(0);

    const allcoins = localStorage.getItem('allcoins') || 0;

    // click event change background color
    const handleClicked = () => {
        setClick(!click);
    };

    // featch the all category data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/api/category/allcategories`,
                    {
                        headers: {
                            'ngrok-skip-browser-warning': 5000
                        }
                    });
                // const response = await axios.get("http://localhost:5000/api/category/allcategories")
                setCategories(response.data.data);
                console.log("CATEGORY LIST", response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const playerIsGuest = checkIfPlayerIsGuest();
        setIsGuest(playerIsGuest);  // Set the isGuest state based on the result

        const token = localStorage.getItem('token');
        const fetchDatabaseCoins = async () => {
            try {
                const response = await axios.post(`${BaseUrl}/api/updateCoins`, { coins: databaseCoins },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 5000
                        }
                    });
                setDatabaseCoins(response.data.totalCoins);
                console.log("coins", response.data.totalCoins);// Update with your actual API response structure
            } catch (error) {
                console.error("Error fetching database coins:", error);
            }
        }
        fetchCategories();
        fetchDatabaseCoins();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // check player is login 
    const checkIfPlayerIsGuest = () => {
        const guestToken = localStorage.getItem('token');
        // localStorage.removeItem('token');
        console.log("TOKEN", guestToken);
        return !!guestToken;
    };

    //subcategory data navigate subcategory page 
    const Subcategory = (id) => {

        axios.get(`${BaseUrl}/api/category/subcategories/${id}`,
            {
                headers: {
                    'ngrok-skip-browser-warning': 5000
                }
            })
            // axios.get(`http://localhost:5000/api/category/subcategories/${id}`)
            .then(function (response) {
                navigate(`/subcategory/${id}`, { state: categories.find(category => category._id === id) });
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // search category
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Function to filter categories based on search input
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <>
            <div className="bg-[#03040C] h-[100%]">
                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[520px]  py-[1px] px-2 relative flex-col flex" >
                        <div className="">
                            <div className="flex justify-between lg:w-[520px] bg-[#0B0D26] py-[8px] cursor-pointer header">
                                <Link to={`/quizhome`} className="pl-[10px]">
                                <div className="text-[#3FCAFF] text-2xl font-bold	italic font-serif">QuizTime !</div>
                                </Link>

                                <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <img class="w-[25px] " src={require("../../../src/image/gift.gif")} alt="animation" />
                                        <p className="text-white text-[10px] font-[700] pt-1"> Daily Reward</p>
                                    </div>
                                    <div className="mt-[3px] flex items-center ml-1">
                                        <div class="text-[10px] flex w-[110px] text-white bg-[#2DAAE2] px-[18px] py-[5px] rounded-md">
                                            <img className="w-3 mr-2" src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg" alt="svg"></img>
                                            <p>
                                                {isGuest ? databaseCoins : allcoins} COINS
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="bg-white h-[350px] mx-auto mb-[8px]">
                                <p className="text-center  text-black">
                                    ads by goggle
                                </p>
                            </div>

                            <p class="text-lg font-bold text-center text-white py-5 pt-14">
                                Select the Quiz category that you want to play
                            </p>

                            <div className="border-2 rounded-full border-sky-300  px-4 py-3 flex items-center gap-2">
                                <IoSearch className="text-white text-[20px] " />
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={handleSearchInputChange}
                                    placeholder="Search Quiz Category"
                                    className="bg-transparent text-lg text-white w-full outline-none"
                                ></input>
                            </div>
                            <div className="flex flex-wrap pb-[100px]">
                                {filteredCategories.map((data) => (
                                    <div key={data._id} className="px-2 pt-5 w-1/2" onClick={() => Subcategory(data._id)}>
                                        <div className="flex gap-1 items-center border-[1px] border-sky-300  rounded-xl p-2 cursor-pointer w-full">
                                            <img
                                                className="w-[46px] rounded-full"
                                                src={data.img}
                                                alt={data.title}
                                            />
                                            <span className="text-center text-white text-sm w-full">
                                                {data.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="footer bg-[#0B0D26] flex justify-around lg:w-[520px] pb-4" 
                                      style={{boxShadow: "0px -15px 15px rgba(8, 13, 87,0.5)"}}
                        >
                            <Link to="/category">
                                <div
                                    className={`px-8 py-1 rounded-xl ${click ? '' : 'bg-[#13277A]'}`}
                                    onClick={handleClicked}
                                >
                                    <BiCategory className="text-white ml-4 text-[20px]  mx-2 my-1" />
                                    <p className="text-white text-[12px]">Category</p>
                                </div>
                            </Link>
                            <Link to="/quizhome">
                                <div
                                    className={`px-8 py-1 rounded-[28px] `}
                                >
                                    <LiaHomeSolid className="text-white text-[20px] mx-2 my-1" />
                                    <p className="text-white text-[12px]">Home</p>
                                </div>
                            </Link>

                            <Link to="/profile">
                                <div
                                    className={`px-8 py-1 rounded-[28px] `}
                                >
                                    <CgProfile className={`text-white text-[20px] mx-2 my-1`} />
                                    <p className="text-white text-[12px]">Profile</p>
                                </div>
                            </Link>
                        </div>
                    </Col>
                    <Col className="fixed ">

                        <div className="flex justify-center py-16 md:py-10">
                        <img className="lg:w-[65%] md:w-[300px] " src={require('../../image/img.jpg')} alt=""></img>
                        </div>

                        <div class="xl:w-[100%] w-[300px] font-bold text-center text-white md:text-sm lg:text-2xl  big:bottom-12  big:z-[-1]">
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
export default Category