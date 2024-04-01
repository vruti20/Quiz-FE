import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

const Contact = () => {
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
                <li className="my-1"><Link to='/contact'>CONTACT US</Link></li>
              </ul>
            </div>
          )}
        </div>

              <div className="text-white pt-[100px] mx-[5%]">
                <div className="bg-[#171349] rounded-lg py-2 ps-5 font-bold text-2xl">Contact US</div>
                <div className="my-5 text-lg font-semibold">contact : QuizTimeNow@gmail.com</div>

                <div className="bg-[#171349] rounded-lg py-2 ps-5 font-bold text-2xl">Copy Right Issue</div>
                <div className="my-5 text-lg font-semibold">We own the Intellectual Property Rights (IPR) to a large number of the games on QuizTimeNow sites, and for certain games, we requested and obtained licenses from the copyright holders known to us. For some games, we could not find any copyright information, or, due to general use on the internet, this information can no longer be obtained.</div>

                <div className="my-5 text-lg font-semibold">Some games may be used under special conditions, considering a number of prerequisite constraints. These prerequisite constraints are, as far as we could determine, met by QuizTimeNow.</div>

                <div className="my-5 text-lg font-semibold">We do not change anything in the source code of the games. For example, credit holders, brand names, or references to websites remain unchanged. If any copyright or other IPR that you may have is possibly being infringed by/on Thopgames’ sites, please inform us immediately, thereby providing us with the following:</div>

                <div className="my-5 text-lg font-semibold">
                  <ul className="list-disc">
                    <li className="my-2">the electronic or physical signature of the owner of the IPR or the person authorized to act on the owner's behalf;</li>
                    <li className="my-2">a description of the IP Right that has been infringed, and a description of the infringing activity;</li>
                    <li className="my-2">the location where the unauthorized copy of the copyrighted work exists (for example, the URL of the Thopgames website where it is posted, or the name of the book in which it has been published, or, in case of a registered brand name, an excerpt of such register evidencing the registry);</li>
                    <li className="my-2">a copy of a license in which you are granted the right to use and to protect such IPR (if you are not the owner of the IPR);</li>
                  </ul>
                </div>
                 <div className="my-5 text-lg font-semibold">Send above details at contact : QuizTimeNow@gmail.com. We will review it and will start taking action on it as soon as possible. We will reply you on any of the query within 7 days.</div>
              </div>
        </>
    )
}

export default Contact;