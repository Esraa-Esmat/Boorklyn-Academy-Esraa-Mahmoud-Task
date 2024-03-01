import React, { useState } from 'react';
import { Button, Container, Form, Image, InputGroup } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash, FaLock } from 'react-icons/fa';
import companyLogo from '../../assets/images/boorklynLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { errorMsg, successMsg } from '../Toast/Toast';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showPassCon, setShowPassCon] = useState(false);
  const [isValid, setIsValid] = useState({});
  const [submitTitl, setSubmitTitl] = useState("Send");
  const [disableLogin, setDisableLogin] = useState(false);
  const [messages, setMessages] = useState("");
  const [isVisible, setIsVisible] = useState(false);


  const handlePassInput = (event) => {
    const password = event.target.value;
    setPasswords({ ...passwords, password });
    checkPassValidate(password);
  };

  const handlePassConInput = (event) => {
    const passwordCon = event.target.value;
    setPasswords({ ...passwords, passwordCon });
    checkConfirmValidate(passwordCon);
  };

  const checkPassValidate = (word) => {
    if (word !== "" && word?.length >= 6) {
      setIsValid((prev) => ({ ...prev, password: { invalid: "is-valid", message: "" } }));
      return true;
    } else if (word === "" || word?.length < 6) {
      setIsValid((prev) => ({ ...prev, password: { invalid: "is-invalid", message: "Password should be at least 6 characters long" } }));
      return false;
    } else {
      setIsValid((prev) => ({ ...prev, password: { invalid: "is-invalid", message: "Password Cannot be empty" } }));
      return false;
    }
  };

  const checkConfirmValidate = (word) => {
    if (word === "") {
      setIsValid((prev) => ({ ...prev, passwordCon: { invalid: "is-invalid", message: "Password confirmation cannot be empty" } }));
      return false;
    } else if (word !== "" && word?.length >= 6 && word === passwords?.password) {
      setIsValid((prev) => ({ ...prev, passwordCon: { invalid: "is-valid", message: "" } }));
      return true;
    } else {
      setIsValid((prev) => ({ ...prev, passwordCon: { invalid: "is-invalid", message: "Passwords should match" } }));
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkPass = checkPassValidate(passwords?.password);
    const checkPassCon = checkConfirmValidate(passwords?.passwordCon);

    if (checkPass && checkPassCon) {
      setSubmitTitl("sending...");
      setDisableLogin(true);

      await new Promise((resolve) =>
        setTimeout(() => {
          setSubmitTitl("send");
          setDisableLogin(false);
          successMsg("Password created successfully, You will redirect to login page...");
          navigate("/login");
        }, 1000)
      );
    } else {
      isValid.password?.invalid && isValid?.password?.message !== "" &&
        errorMsg(isValid?.password?.message);
      isValid.passwordCon?.invalid && isValid?.passwordCon?.message !== "" &&
        errorMsg(isValid?.passwordCon?.message);
      checkPassValidate(passwords?.password);
      checkConfirmValidate(passwords?.passwordCon);
    }

  };

  return (
    <Container className={`animate__animated animate__zoomIn login-page-container text-light text-center pt-5 vh-100 w-100 d-flex align-items-center justify-content-center ${isVisible ? "animate__animated animate__zoomIn" : ""}`} >
      <Container className="login-form-container w-50 rounded-4 pb-4 pt-3 px-0 mt-5">
        <Container className="logo-container text-center mb-5 position-absolute start-50 translate-middle" style={{ top: '22%' }}>
          <Image src={companyLogo} alt="Company Logo" roundedCircle width="160" className="bg-light" />
        </Container>

        <Form onSubmit={handleSubmit} className="login-form px-4 pt-5 pb-1 mt-5">
          <h4 className="text-center primary-color-light">Reset Password</h4>
          <p className="text-secondary mb-0">{messages ? messages : "Create new password"}</p>





          <div className="login-inputs rounded position-relative mt-1">
            <InputGroup hasValidation>
              <InputGroup.Text><FaLock className="primary-color" /></InputGroup.Text>
              <Form.Control
                id="reset_password"
                autoComplete=""
                className={`form-control px-5 ${isValid?.password?.invalid}`}
                placeholder="Password"
                name="password"
                type={showPass ? "text" : "password"}
                value={passwords?.password || ""}
                onChange={handlePassInput}
              />
              <InputGroup.Text className="show-password" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FaRegEye className="secondary-color" /> : <FaRegEyeSlash className="primary-color" />}
              </InputGroup.Text>
            </InputGroup>
          </div>

          <div className="login-inputs rounded position-relative mt-1">
            <InputGroup hasValidation>
              <InputGroup.Text><FaLock className="primary-color" /></InputGroup.Text>
              <Form.Control
                id="reset_password_con"
                autoComplete=""
                className={`form-control px-5 ${isValid?.passwordCon?.invalid}`}
                placeholder="Confirm Password"
                name="passwordCon"
                type={showPassCon ? "text" : "password"}
                value={passwords?.passwordCon || ""}
                onChange={handlePassConInput}
              />
              <InputGroup.Text className="show-password" onClick={() => setShowPassCon(!showPassCon)}>
                {showPassCon ? <FaRegEye className="secondary-color" /> : <FaRegEyeSlash className="primary-color" />}
              </InputGroup.Text>
            </InputGroup>
          </div>

          <Button
            className="btn btn-lg btn-primary text-uppercase fw-bold fs-6 w-100 my-3"
            type="submit"
            disabled={disableLogin}
          >
            {submitTitl}
          </Button>
        </Form>


      </Container>
    </Container>
  );
};

export default ResetPasswordPage;
