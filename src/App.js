
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from "./component/About";
import Home from "./component/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import SignUp from "./component/SignUp";
import NoteState from "./context/NoteState"
function App() {
  return (
    <NoteState>
    <BrowserRouter>
    <div>
      <Navbar/>
      <div className="container my-4">
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
