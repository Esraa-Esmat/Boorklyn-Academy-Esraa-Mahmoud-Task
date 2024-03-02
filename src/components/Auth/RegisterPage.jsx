import React, { useState } from 'react';
import { Form, Button, Container, InputGroup, Image, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import companyLogo from '../../assets/images/boorklynLogo.png';
import { MdEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash, FaUserAlt, FaLock } from 'react-icons/fa';
import { successMsg } from '../Toast/Toast';

const registerSchema = yup.object().shape({
  fName: yup.string().min(3).max(30).required('First Name is required'),
  lName: yup.string().min(3).max(30).required('Last Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(5).required('Password is required'),
  passwordCon: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

const Signup = () => {
  const navigate = useNavigate();
  const [submitTitl, setSubmitTitl] = useState('SIGN UP');
  const [disableLogin, setDisableLogin] = useState(false);
  const [messages, setMessages] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassCon, setShowPassCon] = useState(false);

  const initialInputData = {
    fName: '',
    lName: '',
    email: '',
    password: '',
    passwordCon: '',
  };

  const submitRegister = async (values, actions) => {
    setSubmitTitl('Sending...');  
    
    setDisableLogin(true);
    setTimeout(() => {
    setSubmitTitl('SIGN UP');
      successMsg('You Signed Up successfully');
      setDisableLogin(false);
      actions.resetForm();
      navigate('/login');

 
    },1000);
  };
  

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialInputData,
    validationSchema: registerSchema,
    onSubmit: submitRegister,
  });

  return (
    <Container className="animate__animated animate__zoomIn login-page-container text-light text-center pt-5 pb-2 vh-100 w-100 d-flex align-items-center justify-content-center">
      <Container className="login-form-container bg-light w-75 rounded-4 pb-4 pt-5 px-0 mt-5">
        <Container className="logo-container  text-center mb-5 pb-5 position-absolute start-50 translate-middle" style={{ top: "26%" }}>
          <Image src={companyLogo} alt="Company Logo" roundedCircle width="160" className='imgBorder bg-white' />
        </Container>
        <Form onSubmit={handleSubmit} className="login-form px-4 pt-5 pb-1 mt-5">
          <div className='row'>
            <Form.Group className="col-lg-6 col-12 sign-up-first-name-box mb-3">
              <InputGroup hasValidation>
                <InputGroup.Text> <FaUserAlt className="primary-color" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  autoFocus
                  name="fName"
                  value={values.fName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.fName && !!errors.fName}
                />
                <Form.Control.Feedback type="invalid">{errors.fName}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="col-lg-6 col-12 sign-up-last-name-box mb-3">
              <InputGroup hasValidation>
                <InputGroup.Text> <FaUserAlt className="primary-color" /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lName"
                  value={values.lName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.lName && !!errors.lName}
                />
                <Form.Control.Feedback type="invalid">{errors.lName}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </div>
          <Form.Group className="col-12 sign-up-email-box1 mb-3">
            <InputGroup hasValidation>
              <InputGroup.Text><MdEmail className="primary-color"/></InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-2 mt-2 row" controlId="formBasicPassword">
            <Form.Group className="col-lg-6 col-12 sign-up-password-box mb-3 signup-inputs">
              <InputGroup hasValidation>
                <InputGroup.Text>   <FaLock className="primary-color" /></InputGroup.Text>
                <FormControl
                  className={`sign-up-password form-control pass-padding ${touched?.password && (!errors.password ? 'is-valid' : 'is-invalid')
                    }`}
                  placeholder="PASSWORD"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="ms-1 ms-lg-3 invalid-tooltip">{errors?.password}</div>

                <InputGroup.Text
                  className="login_right-icon text-white-50 clickable "
                  onClick={() => setShowPass((prev) => !prev)}
                >
                  {showPass ?  <FaRegEye className="secondary-color" /> : <FaRegEyeSlash  className="primary-color" />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="col-lg-6 col-12 sign-up-password-confirmation-box mb-3 signup-inputs">
              <InputGroup hasValidation>
                <InputGroup.Text>   <FaLock className="primary-color" /></InputGroup.Text>
                <FormControl
                  className={`sign-up-password-confirmation form-control pass-padding ${touched?.passwordCon && (!errors.passwordCon ? 'is-valid' : 'is-invalid')
                    }`}
                  placeholder="PASSWORD CONFIRMATION"
                  name="passwordCon"
                  type={showPassCon ? 'text' : 'password'}
                  value={values?.passwordCon || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* Toggle password confirmation visibility */}
                <InputGroup.Text
                  className="login_right-icon text-white-50 clickable "
                  onClick={() => setShowPassCon((prev) => !prev)}
                >
                  {showPassCon ?  <FaRegEye className="secondary-color" /> : <FaRegEyeSlash  className="primary-color" />}
                </InputGroup.Text>
                <div className="ms-1 ms-lg-3 invalid-tooltip">{errors?.passwordCon}</div>
              </InputGroup>
            </Form.Group>
          </Form.Group>
  
          <Button type="submit" className="sign-up-button btn w-25 my-2" disabled={disableLogin}>
            {disableLogin ? (
              <>
                <div className="spinner-border spinner-border-sm" role="status"></div>
                <span className="ms-2">Sending...</span>
              </>
            ) : (
              'SIGN UP'
            )}
          </Button>
          
        </Form>
        <p className="sign-up-already text-dark">
          Already have an account? <Link to="/login" className="sign-up-login">Login</Link>
        </p>
      </Container>
    </Container>
  );
};

export default React.memo(Signup);
