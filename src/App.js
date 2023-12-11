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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
