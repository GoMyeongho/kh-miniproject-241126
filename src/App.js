import GlobalStyle from './styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserStore from "./context/UserStore";
import Login from "./pages/signup/Login";
import Signup from "./pages/signup/Signup";
import Login2 from "./pages/signup/Login2";
import Signup2 from "./pages/signup/Signup2";


function App() {
  return (
    <>
      <GlobalStyle />
      <UserStore>
        <Router>
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login2/>}></Route>
            <Route path="/login/signup" element={<Signup2/>}></Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
