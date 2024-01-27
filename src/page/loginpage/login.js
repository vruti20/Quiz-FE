import {auth} from "../../firebase.config";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { BsChevronLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const BaseUrl = process.env.REACT_APP_BASEURL;

const Login = () => {
  const [showOtpDiv, setShowOtpDiv] = useState(false); // show otp input box
  const [mobileNumber, setMobileNumber] = useState(""); //set mobile number input
  const [otp, setOtp] = useState(""); // set otp input

  // otp Generate
  // const generateOTP = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${BaseUrl}/api/login`,
  //       { mobileNumber }
  //     );
  //     // console.log("*************", response.data.data.mobileNumber);

  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("logincoin", response.data.data.coins);
  //     sessionStorage.setItem("moblieNumber", response.data.data.mobileNumber);
  //     if (response.status === 200) {
  //       const ganrateotp = response.data.otp;
  //       console.log("OTP generated:", ganrateotp);
  //       console.log("RESPONSE>>", response.data.data.coins);
  //       setShowOtpDiv(true);
  //       setOtp(ganrateotp);
  //       toast.success(response.data.message, {
  //         style: { background: "#050230", color: "white" },
  //         progressStyle: { background: "green" },
  //       });
  //     } else {
  //       console.log("Error generating OTP:", response.data.message);
  //       toast.error(response.data.data.message, {
  //         style: { background: "#050230", color: "white" },
  //         progressStyle: { background: "red" },
  //       });
  //     }
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status === 400 &&
  //       error.response.data &&
  //       error.response.data.error
  //     ) {
  //       toast.error(error.response.data.error);
  //     } else if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       toast.error(error.response.data.message, {
  //         style: { background: "#050230", color: "white" },
  //         progressStyle: { background: "red" },
  //       });
  //     } else {
  //       toast.error(` ${error.message}`, {
  //         style: { background: "#050230", color: "white" },
  //         progressStyle: { background: "red" },
  //       });
  //     }
  //   }
  // };
  function onCaptchVerify() {
    console.log('**************************');
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
        );
        console.log("#################");
    }
  }
  function onSignup() {
    // setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    console.log("app",appVerifier);
    const formatPh = "+91" + mobileNumber;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtpDiv(true)
      
        console.log('OPT has sent', mobileNumber)
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);

      });
  }
  function onOTPVerify() {
    // setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        axios.post(`${BaseUrl}/api/login`,{mobileNumber})
        .then(async (response) => {
          console.log(response.data.token);
          localStorage.setItem("token", response.data.token);
              localStorage.setItem("logincoin", response.data.data.coins);
              sessionStorage.setItem("moblieNumber", response.data.data.mobileNumber);
          // setUser(res.user);
          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setLoading(false);
        })
        // setUser(res.user);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  }

  return (
    <>
      <div className="bg-[#050230]">
        <Row className="flex ">
          <Col className="md:w-[410px] h-[100%] lg:w-[530px]  py-2 px-2">
            <div className="flex py-[8px] cursor-pointer ">
              <span>
                <Link to="/">
                  <BsChevronLeft className="text-white text-lg  mt-2" />
                </Link>
              </span>
              <Link to={`/quizhome`} className="pl-[10px]">
              <div className="text-[#3FCAFF] text-2xl font-bold	italic font-serif">QuizTime !</div>
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

               <form>
               <div id="recaptcha-container"></div>
               <div className="text-center">
                  <input
                    className="bg-[#0a0a2911] text-white border-[3px] border-[#4376c9] border-solid rounded-xl py-[10px] text-center px-8"
                    placeholder="Enter phone number"
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                
                <div className="text-center pt-5">
                  <Button
                    className="bg-[#D85B00] text-white font-bold text-[16px] rounded-xl py-[13px] text-center px-[88px]"
                    onClick={onSignup}
                    value={otp}
                  >
                    GET CODE
                  </Button>
                </div>
               </form>

                <div className="text-center w-full flex justify-center">
                  <div className="bg-white flex py-[8px] mt-3 px-3 rounded-[5px] cursor-pointer	">
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
                  style={{ border: "1px solid #389A06" }}
                ></div>
              </div>
            )}

            {showOtpDiv && (
              <div className="pt-[150px]">
                <div className="text-center">
                  <input
                    className="bg-[#171349] border-[2px] border-[#4376c9] text-white rounded-xl py-[12px] text-center px-8"
                    placeholder="Enter Otp"
                    type="tel"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div className="text-center pt-5">
                  <Link
                    to={otp ? "/quizplay" : ""}
                    onClick={() => !otp && alert("Please enter OTP")}
                  >
                    <Button
                      className={`bg-[#D85B00] text-white font-bold text-[16px] rounded-xl py-[13px] text-center px-[88px]`}
                      disabled={!otp}
                    onClick={onOTPVerify}>
                      SUBMIT
                    </Button>
                  </Link>
                </div>

                <div
                  class="w-3/5 mx-auto my-6"
                  style={{ border: "1px solid #389A06" }}
                ></div>
              </div>
            )}

            <div className="w-full pl-5 pt-6 my-[85px]">
              <h1 className="w-full font-bold text-lg text-white">
                Play Quiz and Win Coins!
              </h1>
              <ul className="text-[#9b9ba7] text-[14px] list-disc my-3 px-4">
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
          <Col className="fixed me-[15%] bg-image">
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
export default Login;
