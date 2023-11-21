import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import Login from "../loginpage/login";

const Quiz = () => {
  return (
    <>
      <div className="bg-[#0F172A]">
        <Row className="flex  ">
          <Col className="md:w-[410px] lg:w-[530px] py-3 px-2">

            <div className="bg-white w-[510px] h-[350px] mx-auto mb-[8px]">
                <p className="text-black text-center">
                  ads by goggle
                </p>
            </div>

            <div className="text-center">
              <h1 className="font-bold text-white text-18">Let's begin!</h1>
              <span className="text-[12px] text-[#8789c3]" >Answer few questions and win 150 free!</span>
            </div>

            <div class=" text-[#bac8ff] font-bold text-center pt-5 pb-3">
              Question 1
              <span class="text-[13px]">/2</span>
            </div>

            <div class="text-lg font-bold px-10 text-white text-center pb-5">
              <span>Which is the fifth alphabet in the word 'PASTE'?</span>
            </div>

            <div className="grid-cols-2 grid text-white ">
              <Col className="flex flex-col  items-center py-2 bg-[#20213f] border-2 border-[#404380] rounded-full cursor-pointer">A</Col>
              <Col className="flex flex-col  items-center  py-2  bg-[#20213f] border-2 border-[#404380] rounded-full cursor-pointer">A</Col>
            </div>
            <div className="grid-cols-2 grid text-white pt-2">
              <Col className="flex flex-col items-center py-2  bg-[#20213f] border-2 border-[#404380] rounded-full cursor-pointer">A</Col>
              <Col className="flex flex-col  items-center py-2 bg-[#20213f] border-2 border-[#404380] rounded-full cursor-pointer">A</Col>
            </div>

            <p className="text-[#ffcc5b] text-center font-bold cursor-pointer pt-3"><Link to="/login">Sign-Up - Login</Link></p>

            <div className="w-full pl-5 pt-6">
              <h1 className="w-full font-bold text-lg text-white">
                Play Quiz and Win Coins!
              </h1>
              <ul className="text-[#8789c3] text-[14px] list-disc my-3 px-4">
                <li className="mb-2"> Play Quizzes in 25+ categories like GK, Sports, Bollywood, Business, Cricket &amp; more! </li>
                <li className="mb-2"> Compete with lakhs of other players! </li>
                <li className="mb-2"> Win coins for every game </li>
                <li className="mb-2"> Trusted by millions of other quiz enthusiasts like YOU! </li>
              </ul>
            </div>

            <div className="border-2 w-[100%] p-6 rounded-xl bg-white bg-opacity-10">
              <h1 className="text-2xl text-center text-blue-500 ">Fun Facts</h1>
              <p className="text-center text-white">
                The insurance industry is one of the largest industries in the United States,
                with over $1.5 trillion in annual premiums.The word "insurance" comes from the
                French word "assurer", which means "to make sure". The first insurance company
                in the United States was founded in Charleston, South Carolina, in 1735.The
                insurance industry employs over 2 million people in the United States. The
                average American household spends about $1,500 per year on insurance premiums.
                The most expensive type of insurance in the United States is long-term care
                insurance, which can cost upwards of $5,000 per month.
              </p>
            </div>

          </Col>
          <Col className="fixed ">

            <div className="flex justify-center py-16 md:py-10">
              <img className="lg:w-[65%] md:w-[300px] " src="https://monetix-lookat1.quiztwiz.com/static/media/sidePoster.9c9656d2998c44eb6b57.png" alt=""></img>
            </div>

            <div class="font-bold text-center text-white md:text-sm  big:bottom-12  big:z-[-1]"> 
            Welcome to Quiztwiz. Play a quiz and earn coins. 
            <p class="font-normal text-2xl pt-4 text-center"> 
            There's a quiz for everyone! </p> 
            </div>

          </Col>
        </Row>
      </div>
    </>
  );
}
export default Quiz;
