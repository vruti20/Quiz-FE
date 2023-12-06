import './CSS/App.css';
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
function App() {
  return (
    <>
        <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Quiz/>}/>
        </Routes>
        <Routes>
          <Route  path="/login" element={<Login/>}/>
        </Routes>
        <Routes>
          <Route  path="/quizplay" element={<Quizplay/>}/>
        </Routes>
        <Routes>
          <Route  path="/quizhome" element={<Home/>}/>
        </Routes>
        <Routes>
          <Route  path="/category" element={<Category/>}/>
        </Routes>
        <Routes>
          <Route  path="/profile" element={<Profile/>}/>
        </Routes>
        <Routes>
          <Route  path="/play/:categoryid" element={<Play/>}/>
        </Routes>
        <Routes>
          <Route  path="/question/:categoryId" element={<Question/>}/>
        </Routes>
        <Routes>
          <Route  path="/result" element={<Result/>}/>
        </Routes>
        <Routes>
          <Route  path="/subcategory/:id" element={<Subcategory/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
