import LoginPage from "./components/Auth/LoginPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {  Routes, Route,  } from 'react-router-dom';
import RegisterPage from "./components/Auth/RegisterPage";
import ForgetPasswordPage from "./components/Auth/ForgetPasswordPage";
import ResetPasswordPage from "./components/Auth/ResetPasswordPage";
import WelcomMassage from "./components/WelcomMassage/WelcomMassage";


function App() {

  return (
    <>
      <ToastContainer />
      <Routes>

        <Route path="/*" element={<LoginPage />} />
        <Route path="/singup" element={<RegisterPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="/welcommassage" element={<WelcomMassage />} />


      </Routes>
    </>

  )
}

export default App;
