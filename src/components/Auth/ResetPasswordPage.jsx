import React, { useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash, FaLock } from 'react-icons/fa';
import companyLogo from '../../assets/images/boorklynLogo1.png';
import { Link, useNavigate } from 'react-router-dom';
import { errorMsg, successMsg } from '../Toast/Toast';
import '../../App.css';

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
      <Row className="login-form-container bg-light w-100 rounded-4   px-0 my-5">
        <Col xs={5} className="logo-container text-center mt-3 d-flex justify-content-between align-items-center " >
          <Container className='logoContainerImage rounded-circle  bg-white  position-relative ' >
            <Image src={companyLogo} alt="Company Logo" className='m-auto   position-absolute start-50 translate-middle top-50' />

          </Container>
        </Col>

        <Col xs={7} className='px-4'>
          <Form onSubmit={handleSubmit} className="login-form px-4  py-5 my-2">
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
              className="btn btn-lg btn-primary text-uppercase fw-bold fs-6 w-100 my-3 mt-4"
              type="submit"
              disabled={disableLogin}
            >
              {submitTitl}
            </Button>
          </Form>
        </Col>


      </Row>
    </Container>
  );
};

export default ResetPasswordPage;
