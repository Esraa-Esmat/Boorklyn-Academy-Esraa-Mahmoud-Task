import React, { useEffect, useState } from 'react';
import { Button, Container, Form, Image, InputGroup } from 'react-bootstrap';
import { FaRegEye, FaRegEyeSlash, FaUserAlt, FaLock } from 'react-icons/fa';
import companyLogo from '../../assets/images/boorklynLogo.png';
import { errorMsg, successMsg } from '../Toast/Toast';
import 'animate.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [disableLogin, setDisableLogin] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [formInput, setFormInput] = useState({
        email: '',
        password: '',
    });

    const handleInput = (event) => {
        setFormInput({ ...formInput, email: event.target.value });
    };

    const handleInputPass = (event) => {
        setFormInput({ ...formInput, password: event.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const checkEmailValidate = () => {
        const isValidEmail = validateEmail(formInput.email);

        if (!isValidEmail) {
            errorMsg('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const checkPassValidate = () => {
        if (!formInput.password) {
            errorMsg('Password cannot be empty');
            return false;
        } else if (formInput.password.length < 3) {
            errorMsg('Password should be at least 3 characters long');
            return false;
        }
        return true;
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValidEmail = checkEmailValidate();
        const isValidPass = checkPassValidate();

        if (isValidEmail && isValidPass) {


            setDisableLogin(true);
            setTimeout(() => {

                setDisableLogin(false);
                successMsg('You login successfully');
            }, 1000)
        }
    };
    useEffect(() => {
        setIsVisible(true);
    }, []);
    return (

        <Container className={`animate__animated animate__zoomIn login-page-container text-light text-center pt-5 vh-100 w-100 d-flex align-items-center justify-content-center ${isVisible ? "animate__animated animate__zoomIn" : ""}`} >
            <Container className="login-form-container w-50 rounded-4 pb-4 pt-3 px-0 mt-5">
                <Container className="logo-container text-center mb-5 position-absolute start-50 translate-middle " style={{ top: "27%" }}>

                    <Image src={companyLogo} alt="Company Logo" roundedCircle width="160" className='bg-light' />
                </Container>
                <Form onSubmit={handleSubmit} className="login-form px-4 pt-5 pb-1 mt-5">
                    <Form.Group className="mb-4 mt-4  " >
                        <InputGroup>
                            <InputGroup.Text>
                                <FaUserAlt className="primary-color" />
                            </InputGroup.Text>
                            <Form.Control
                                className="input-lg"
                                autoFocus
                                type="email"
                                placeholder="Email"
                                value={formInput.email}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-1 mt-2" controlId="formBasicPassword">
                        <InputGroup>
                            <InputGroup.Text>
                                <FaLock className="primary-color" />
                            </InputGroup.Text>
                            <Form.Control
                                className="input-lg"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formInput.password}
                                onChange={handleInputPass}
                            />
                            <InputGroup.Text className="show-password" onClick={handleShowPassword}>
                                {showPassword ? <FaRegEye className="secondary-color" /> : <FaRegEyeSlash className="primary-color" />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <h6 className=" fw-bold text-end pe-3 mt-2">
                        <Link
                            to="/forgetpassword"
                            className="btn-forgetPassword secondary-color shadow"
                        >
                            Forget your password ?
                        </Link>
                    </h6>
                    {/* <Button
                        className="btn btn-lg btn-primary text-uppercase fw-bold fs-6 py-10"
                        type="submit"
                        disabled={disableLogin}
                    >
                        
                    </Button> */}
                    <Button type="submit" className="w-100 btn mt-2" disabled={disableLogin}>
                        {disableLogin ? (
                            <>
                                <div className="spinner-border spinner-border-sm" role="status"></div>
                                <span className="ms-2">Sending...</span>
                            </>
                        ) : (
                            'LOGIN'
                        )}
                    </Button>


                </Form>
                <h6 className="mt-2">
                    Don't have an account yet ?{' '}
                    <Link to="/singup" className="text_primary fw-bold">
                        Sign up
                    </Link>
                </h6>
            </Container>
        </Container>
    );
};

export default LoginPage;
