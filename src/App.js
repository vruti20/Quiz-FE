import './CSS/App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Quiz from './page/Home/quiz';
import Login from './page/loginpage/login';
import Quizplay from './page/play quiz/quizplay';
import Home from './page/play quiz/homepage';
import Category from './page/play quiz/category';
import Profile from './page/play quiz/profile';
function App() {
  return (
    <>
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
      </BrowserRouter>
    </>
  );
}

export default App;
