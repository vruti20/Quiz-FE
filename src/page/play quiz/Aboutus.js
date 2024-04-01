import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const Aboutus = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
    return(
        <>
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
              {/* <div className="text-[10px] flex text-white w-[110px] bg-[#2DAAE2] px-[18px] py-[5px] rounded-md me-2">
                <img
                  className="w-[14px] mr-1"
                  src={require('../../image/coins-1.png')}
                  alt="svg"
                ></img>
                <p> {isGuest ? databaseCoins : allcoins} COINS</p>
              </div> */}
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

              <div className="text-white pt-[100px] mx-[5%]">
                <div className="bg-[#171349] rounded-lg py-2 ps-5 font-bold text-2xl">Free Online Games - Play Now On Quiztimenow</div>
                <div className="my-5 text-lg font-semibold">Quiztimenow features the latest and best free online games. We offer instant play to all our games without downloads, login, popups or other distractions. You can enjoy playing fun games without interruptions from downloads or pop-ups.</div>
                <div className="my-5 text-lg font-semibold">Quiztimenow has the best free online games selection and offers the most fun experience to play alone or with friends..</div>

                <div className="bg-[#171349] rounded-lg py-2 ps-5 font-bold text-2xl">About Quiztimenow</div>
                <div className="my-5 text-lg font-semibold">Quiztimenow has a team of 25 people working on our gaming platform. Our mission is simple - to create a browser-gaming platform that works seamlessly for users around the world, and rewards developers both big and small.</div>

                <div className="my-5 text-lg font-semibold">Our games are playable on desktop, tablet and mobile so you can enjoy them at school, at home or on the road. Every month millions of gamers from all over the world play their favorite games on ThopGames. Our goal is to create the ultimate online playground. Free and open to all.</div>

                <div className="my-5 text-lg font-semibold">We're a team of makers, techies, adventurers – and some gamers too. We’re kids of all ages, and love what we do.</div>

                <div className="my-5 text-lg font-semibold">Just load up your favorite games instantly in your web browser and enjoy the experience.</div>

                <div className="my-5 text-lg font-semibold">You can play our games on desktop mobile devices. That includes everything from desktop PCs, laptops, and Chromebooks, to the latest smartphones and tablets from Apple and Android.</div>
              </div>
        </>
    )
}

export default Aboutus;