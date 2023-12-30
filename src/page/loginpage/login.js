import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Login = () => {
  const [showOtpDiv, setShowOtpDiv] = useState(false); // show otp input box
  const [mobileNumber, setMobileNumber] = useState(""); //set mobile number input
  const [otp, setOtp] = useState(""); // set otp input

  // otp Generate
  const generateOTP = async () => {
    try {
      const response = await axios.post(
        `${BaseUrl}/api/login`,
        { mobileNumber },
        {
          headers: {
            "ngrok-skip-browser-warning": 5000,
          },
        }
      );
      //   // const response=await axios.post("http://localhost:5000/api/login",
      //   {
      //     mobileNumber
      //   }
      // )
      // localStorage.clear();
      console.log("*************",response.data.data.mobileNumber);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("logincoin", response.data.data.coins);
      sessionStorage.setItem("moblieNumber",response.data.data.mobileNumber)
      if (response.status === 200) {
        const ganrateotp = response.data.otp;
        console.log("OTP generated:", ganrateotp);
        console.log("RESPONSE>>", response.data.data.coins);    
            setShowOtpDiv(true);
        setOtp(ganrateotp);
        toast.success(response.data.message, {
          style: { background: "black", color: "white" },
          progressStyle: { background: "green" },
        });
      } else {
        console.log("Error generating OTP:", response.data.message);
        toast.error(response.data.data.message, {
          style: { background: "black", color: "white" },
          progressStyle: { background: "red" },
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        error.response.data.error
      ) {
        toast.error(error.response.data.error);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          style: { background: "black", color: "white" },
          progressStyle: { background: "red" },
        });
      } else {
        toast.error(` ${error.message}`, {
          style: { background: "black", color: "white" },
          progressStyle: { background: "red" },
        });
      }
    }
  };

  return (
    <>
      <div className="bg-[#0F172A]">
        <Row className="flex ">
          <Col className="md:w-[410px] h-[100vh] lg:w-[530px]  py-2 px-2">
            <div className="flex py-[8px] cursor-pointer ">
              <span>
                <Link to="/">
                  <BsChevronLeft className="text-white text-lg  mt-1" />
                </Link>
              </span>
              <Link to={`/quizhome`} className="pl-[10px]">
                <img
                  src={require("../../image/download (1).png")}
                  alt=""
                  width={"40%"}
                />
              </Link>
            </div>
            {!showOtpDiv && (
              <div>
                <div className="text-center py-10">
                  <div className="text-white font-bold text-18">
                    Join QuizTwiz now!👋
                  </div>
                  <div className="text-[12px] text-[#8789c3]">
                    Play Quizzes and Win Coins
                  </div>
                </div>

                <div className="text-center">
                  <input
                    className="bg-[#0F172A] text-white border-[3px] border-white border-solid rounded-full py-[10px] text-center px-8"
                    placeholder="Enter phone number"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>

                <div className="text-center pt-5">
                  <Button
                    className="bg-[#1A2F77] text-white font-bold text-[16px] border-[3px] border-white border-solid rounded-full py-[10px] text-center px-[85px]"
                    onClick={generateOTP}
                    value={otp}
                  >
                    GET CODE
                  </Button>
                </div>

                <div className="text-center w-full flex justify-center">
                  <div className="bg-white flex py-[8px] mt-3 px-3 rounded-[5px]">
                    <span className="align-middle pt-[2px]">
                      <FcGoogle className="fs-4" />
                    </span>
                    <span className="font-[400] text-[14px] align-middle pl-2">
                      Sign in with Google
                    </span>
                  </div>
                </div>
                <div
                  class="w-3/5 mx-auto  my-6"
                  style={{ border: "1px solid rgb(26, 47, 119)" }}
                ></div>
              </div>
            )}

            {showOtpDiv && (
              <div className="pt-[150px]">
                <div className="text-center">
                  <input
                    className="bg-[#0F172A] text-white border-[3px] border-white border-solid rounded-full py-[10px] text-center px-8"
                    placeholder="Enter Otp"
                    type="tel"
                    value={otp}
                    readOnly
                  />
                </div>

                <div className="text-center pt-5">
                  <Link
                    to={otp ? "/quizplay" : ""}
                    onClick={() => !otp && alert("Please enter OTP")}
                  >
                    <Button
                      className={`bg-[#1A2F77] text-white font-bold text-[16px] border-[3px] border-white border-solid rounded-full py-[10px] text-center px-[85px]`}
                      disabled={!otp}
                    >
                      SUBMIT
                    </Button>
                  </Link>
                </div>

                <div
                  class="w-3/5 mx-auto my-6"
                  style={{ border: "1px solid rgb(26, 47, 119)" }}
                ></div>
              </div>
            )}

            <div className="w-full pl-5 pt-6 my-[85px]">
              <h1 className="w-full font-bold text-lg text-white">
                Play Quiz and Win Coins!
              </h1>
              <ul className="text-[#8789c3] text-[14px] list-disc my-3 px-4">
                <li className="mb-2">
                  {" "}
                  Play Quizzes in 25+ categories like GK, Sports, Bollywood,
                  Business, Cricket &amp; more!{" "}
                </li>
                <li className="mb-2"> Compete with lakhs of other players! </li>
                <li className="mb-2"> Win coins for every game </li>
                <li className="mb-2">
                  {" "}
                  Trusted by millions of other quiz enthusiasts like YOU!{" "}
                </li>
              </ul>
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

            <div class="font-bold text-center text-white md:text-sm lg:text-2xl big:bottom-12  big:z-[-1]">
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
export default Login;
