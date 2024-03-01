import React, { useState } from 'react';
import { Form, Button, Container, InputGroup, Image } from 'react-bootstrap';
import companyLogo from '../../assets/images/boorklynLogo.png';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

const ForgetPasswordPage = () => {
  const validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState({});
  const [submitTitl, setSubmitTitl] = useState('Send');
  const [disableLogin, setDisableLogin] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [timer, setTimer] = useState(2);
  const [showTimer, setShowTimer] = useState(false);

  const handleInput = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);
    setIsSent(false);
    checkValidate(emailValue);
  };

  const checkValidate = (emailValue) => {
    const isValidEmail = emailValue.trim().match(validRegex);
    setIsValid({
      email: {
        invalid: isValidEmail ? 'is-valid' : 'is-invalid',
        message: isValidEmail ? '' : 'Please enter a valid email',
      },
    });
    return isValidEmail;
  };

  function countdown(minutes) {
    let seconds = minutes * 60;
    setDisableLogin(true);

    const interval = setInterval(function () {
      let m = Math.floor(seconds / 60);
      let s = seconds % 60;
      let timeFormat = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      setTimer(timeFormat);
      setShowTimer(true);
      seconds--;
      if (seconds < 0) {
        clearInterval(interval);
        setDisableLogin(false);
        setShowTimer(false);
        setIsShowPass(true);
      }

    }, 1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = checkValidate(email);

    if (isValidEmail) {
      setSubmitTitl('Sending...');
      setDisableLogin(true);

      await new Promise((resolve) =>
        setTimeout(() => {
          setSubmitTitl('Send');
          setIsSent(true);
          countdown(.1);
        }, 1000)
      );
    }
  };

  return (
    <Container className="animate__animated animate__zoomIn login-page-container text-light text-center pt-5 vh-100 w-100 d-flex align-items-center justify-content-center">
      <Container className="login-form-container w-50 rounded-4 pb-4 pt-1 px-0 mt-5">
        <Container className="logo-container text-center mb-5 position-absolute start-50 translate-middle" style={{ top: '25%' }}>
          <Image src={companyLogo} alt="Company Logo" roundedCircle width="160" className="bg-light" />
        </Container>

        <Form onSubmit={handleSubmit} className="login-form px-4 pt-5 pb-1 mt-5">
          <h4 className="text-center primary-color-light pb-3">Forgot Password</h4>
          {isSent && isSent ? (
            <p className="text-secondary">Please! check your email...</p>
          ) : (
            <p className="text-secondary">Enter your email and we'll send you a link to reset your password.</p>
          )}
          {isValid.email?.invalid && <p className="text-danger">{isValid.email?.message}</p>}

          <div className="login-inputs rounded position-relative mt-1">
            <InputGroup hasValidation>
              <InputGroup.Text>
                <MdEmail className="primary-color" />
              </InputGroup.Text>
              <Form.Control
                autoFocus
                className={`form-control ps-5 ${isValid?.email?.invalid}`}
                type="text"
                id="Forget-email"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={handleInput}
              />
            </InputGroup>
          </div>

          <Button className="btn btn-lg w-100 my-3 mb-4 btn-primary text-uppercase fw-bold fs-6 py-10" type="submit" disabled={disableLogin}>
            {submitTitl}
          </Button>
          {showTimer && (
            <p className="text-secondary mb-0">{`Did not receive an email? You can resend after ${timer}`}</p>
          )}

          {isShowPass &&

            (
              <>
                <h6 className="text-center fw-bold py-1">
                  <Link to="/resetpassword" className="hover_primary shadow text_primary">
                    <MdKeyboardArrowLeft className="text_primary" /> <span >Go to Reset Password</span>
                  </Link>
                </h6></>
            )
          }

        </Form>
        <h6 className="mt-2">
          Don't have an account yet ?{' '}
          <Link to="/signup" className="text_primary fw-bold">
            Sign up
          </Link>
        </h6>
      </Container>
    </Container>
  );
};

export default ForgetPasswordPage;
