import './CSS/App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Quiz from './page/Home/quiz';
import Login from './page/loginpage/login';
import Quizplay from './page/play quiz/quizplay';
import Home from './page/play quiz/homepage';
import Category from './page/play quiz/category';
import Profile from './page/play quiz/profile';
import Play from './page/play quiz/play';
import Question from './page/play quiz/question';
import Result from './page/play quiz/result';
import Subcategory from './page/play quiz/subcategory';
import Privacypolicy from './page/Privacypolicy';
import Aboutus from './page/play quiz/Aboutus';
import Contact from './page/play quiz/contact';
function App() {
  
  return (
    <>
        <ToastContainer />
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quizplay" element={<Quizplay />} />
          <Route path="/quizhome" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/play/:categoryid" element={<Play />} />
          <Route path="/question/:categoryId" element={<Question />} />
          <Route path="/result" element={<Result />} />
          <Route path="/subcategory/:id" element={<Subcategory />} />
          <Route path='/privacy-policy' element={<Privacypolicy/>} />
          <Route path='/aboutus' element={<Aboutus/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
