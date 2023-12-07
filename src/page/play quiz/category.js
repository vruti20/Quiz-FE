import { Col, Row } from "react-bootstrap"
import { IoSearch } from "react-icons/io5";
import { BiCategory } from "react-icons/bi"
import { LiaHomeSolid } from "react-icons/lia"
import { CgProfile } from "react-icons/cg"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
// import axios from "axios";
// import { async } from "q";

const Category = () => {
    // const score = localStorage.getItem('score');
    const { id } = useParams();
    console.log('**********',id);
    const navigate = useNavigate();
    const [isGuest, setIsGuest] = useState(true);
    const [categories, setCategories] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [click, setClick] = useState(false);
    const allcoins=localStorage.getItem('allcoin')
  const newcoins= localStorage.getItem("coin");
    
    const handleClicked = () => {
        setClick(!click);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://222f-223-179-148-39.ngrok-free.app/api/category/allcategories", 
                {headers: {
                    'ngrok-skip-browser-warning': 5000
                  }});
                setCategories(response.data.data);
                console.log("CATEGORY LIST", response.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const playerIsGuest = checkIfPlayerIsGuest();

        // Set the isGuest state based on the result
        setIsGuest(playerIsGuest);
        fetchCategories();
    }, []);

    const checkIfPlayerIsGuest = () => {
        const guestToken = localStorage.getItem('token');
        // localStorage.removeItem('token');
        console.log("TOKEN",guestToken);
        return !!guestToken;
      };
    const Subcategory =  (id) =>{
        
        axios.get(`https://222f-223-179-148-39.ngrok-free.app/api/category/subcategories/${id}` ,
        {headers: {
            'ngrok-skip-browser-warning': 5000
          }})
        .then(function (response) {
            navigate(`/subcategory/${id}`, { state: categories.find(category => category._id === id) });
            console.log(response.data.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }
  
    const handleSearchInputChange = (e) => {
      setSearchInput(e.target.value);
    };
  
    // Function to filter categories based on search input
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
        <>
            <div className="bg-[#0F172A] h-[100%]">

                <Row className="">
                    <Col className="md:w-[400px]  lg:w-[520px]  py-[1px] px-2 relative flex-col flex" >
                        <div className="">
                            <div className="flex justify-between lg:w-[520px] bg-[#0F172A] py-[8px] cursor-pointer header">
                                <span className="pl-[10px]">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABaCAYAAADtswAjAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGVWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuYTg3MzFiOSwgMjAyMS8wOS8wOS0wMDozNzozOCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNS0xN1QxMzo0OTowOCswNTozMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wNS0xN1QxMzo0OTowOCswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDUtMTdUMTM6NDk6MDgrMDU6MzAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTlkZmI0MDgtNTM0Ny00YTQyLTg5OGMtZmRiOGRkMjRkZmYzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6M2M0ZTEzN2UtYWE1OC03MzQyLTlhMTItMGIxMWNmZjgyODJjIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6N2I1YTk4ZTEtNzY1NC0zZjQ5LTk0ZDYtMDlkZDc0NGYzZTNhIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6N2I1YTk4ZTEtNzY1NC0zZjQ5LTk0ZDYtMDlkZDc0NGYzZTNhIiBzdEV2dDp3aGVuPSIyMDIyLTA1LTE3VDEzOjQ5OjA4KzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5ZGZiNDA4LTUzNDctNGE0Mi04OThjLWZkYjhkZDI0ZGZmMyIgc3RFdnQ6d2hlbj0iMjAyMi0wNS0xN1QxMzo0OTowOCswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIzLjAgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8cGhvdG9zaG9wOlRleHRMYXllcnM+IDxyZGY6QmFnPiA8cmRmOmxpIHBob3Rvc2hvcDpMYXllck5hbWU9IlF1aXp0d2l6IiBwaG90b3Nob3A6TGF5ZXJUZXh0PSJRdWl6dHdpeiIvPiA8L3JkZjpCYWc+IDwvcGhvdG9zaG9wOlRleHRMYXllcnM+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+iDn5GwAADZ5JREFUeNrtnXusHFUdx7e8iRaWAmIobRYEeZeLYgQhuuFlEQOXiChFZEWoiYBuDFFDRDYgRiOygvoPFhYBH4C4SKJiUK8UCVTBrTxEI3AJr1BLubZaoNj24x8zK8t1duY8Z+fM/n7JN/3jdue8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" alt="QuizTwiz" style={{ height: "30px" }} />
                                </span>

                                    <div className="flex justify-between">
                                    <div className="flex items-center">
                                        <img class="w-[25px] " src={require("../../../src/image/gift.gif")} alt="animation" />
                                        <p className="text-white text-[10px] font-[700] pt-1"> Daily Reward</p>
                                    </div>
                                    <div className="mt-[3px] flex items-center ml-1">
                                        <div class="text-[10px] flex w-[110px] text-white bg-[#1A2F77] px-[18px] py-[5px] rounded-full">
                                            <img className="w-3 mr-2" src="https://monetix-lookat1.quiztwiz.com/static/media/coin.637476e7fc615b3d4479fb73c7565f29.svg" alt="svg"></img>
                                            <p>
                                            {isGuest ? newcoins : allcoins} COINS
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="bg-transparent h-[350px] mx-auto mb-[8px]">
                                <p className="text-center text-white">
                                    ads by goggle
                                </p>
                            </div>

                            <p class="text-lg font-bold text-center text-white py-5 pt-14">
                                Select the Quiz category that you want to play
                            </p>

                            <div className="border-2 rounded-full border-white px-4 py-3 flex items-center gap-2">
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
                                        <div className="flex gap-1 items-center border-[1px] border-white rounded-full p-2 cursor-pointer w-full">
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

                        <div className=" footer flex justify-around lg:w-[520px] bg-[#0F172A] pb-4" style={{ boxShadow: "rgb(17, 24, 39) 0px -15px 15px" }}>
                            <Link to="/category">
                                <div
                                    className={`px-8 py-1 rounded-[28px] ${click?  '':'bg-[#1A2F77]' }`}
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
export default Category