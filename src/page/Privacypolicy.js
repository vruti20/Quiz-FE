
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from 'react';

const Privacypolicy = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
    return (
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
            <div className='text-white pt-[100px]'>
                <div className='mx-[5%]'>
                    <div className='md:text-[44px] text-[30px] font-bold my-3'>Privacy Policy and Terms of Use for Quiztimenow.com</div>

                    <div className='text-3xl font-semibold my-3'>1. Introduction</div>
                    <div className='text-slate-400 text-lg font-semibold'>Welcome to Quiztimenow.com! This Privacy Policy and Terms of Use govern your use of our website, Quiztimenow.com, and any related services offered by Quiztimenow.</div>
                    <div className='text-slate-400  text-lg font-semibold mt-5'>By using our website, you agree to the terms outlined in this policy. Please read this document carefully to understand how we collect, use, and protect your information.</div>

                    <div className='text-3xl font-semibold my-3'>2. Data Collection</div>
                    <div className='text-slate-400 text-lg font-semibold'>We don't collect any user inforamtion or data from users</div>

                    <div className='text-3xl font-semibold my-3 '>3. Use of Data</div>
                    <ul className='text-slate-400  text-lg font-semibold list-disc list-inside leading-[50px]'>We collect and use your data for the following purposes:
                        <li className='text-slate-400  text-lg font-semibold leading-10'>To provide and maintain our website.</li>
                        <li className='text-slate-400  text-lg font-semibold leading-10'>To manage your account and affiliate partner program participation.</li>
                        <li className='text-slate-400  text-lg font-semibold leading-10'>To communicate with you regarding your account, inquiries, and updates.</li>
                        <li className='text-slate-400  text-lg font-semibold leading-10'>To enhance our website's functionality and user experience.</li>
                        <li className='text-slate-400  text-lg font-semibold leading-10'>To comply with legal obligations.</li>
                    </ul>

                    <div className='text-3xl font-semibold my-3'>4. Third-Party Services</div>
                    <div className='text-slate-400 text-lg font-semibold'>While we do not allow third parties to access or process data directly, we may use third-party payment processors to facilitate transactions and payments on our website. Please review their respective privacy policies for more information.</div>

                    <div className='text-3xl font-semibold my-3'>5. Location of Data Processing</div>
                    <div className='text-slate-400 text-lg font-semibold'>Your data will be processed in the United States, where our servers are located.</div>

                    <div className='text-3xl font-semibold my-3'>6. Children's Privacy</div>
                    <div className='text-slate-400 text-lg font-semibold'>Our website is accessible to children; however, it is not designed or intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe that a child has provided us with their personal information, please contact us, and we will promptly delete such information.</div>

                    <div className='text-3xl font-semibold my-3'>7. Security Measures</div>
                    <div className='text-slate-400 text-lg font-semibold'>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or storage system can be guaranteed as 100% secure. Please take appropriate precautions when sharing your information online.
                    </div>

                    <div className='font-bold my-3 text-xl tracking-wide'>We do not collect or store any information related to gambling activities. This platform does not include any gambling content.</div>
                    <div className='font-bold my-3 text-xl tracking-wide'>In our games all the conis is vertual but there is not real value of it.</div>
                    <div className='font-bold my-3 text-xl tracking-wide'>All the games for a fun and entatement perpose we do not ask to do any peyment collection from user side.</div>
                </div>
            </div>
        </>

    )
}

export default Privacypolicy;