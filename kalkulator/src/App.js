import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Kalkulator from "./kalkulator";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<SignIn/>}></Route>
          <Route path="/daftar" element={<SignUp/>}></Route>
          <Route path="/kalkulator" element={<Kalkulator/>}></Route>
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
