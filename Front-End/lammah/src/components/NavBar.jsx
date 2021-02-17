import API_URL from '../apiConfig.js'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { Button, Form, Container, Row, Modal, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";

const validationSchema = Yup.object({
    email: Yup.string().required(" Enter your email ").email("example@example.com"),
    password: Yup.string().required(" Enter password "),
})

export const NavBar = (props) => {
    // Login functional
    const history = useHistory();

    //For Translation
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    //for show alert 
    const [login, setLogin] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    //login function
    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`${API_URL}/api/user/login`, credentials)
            .then((res) => {

                const token = res.data.token;
                const msg = res.data.msg;

                if (token) {
                    localStorage.setItem("jwtToken", token);
                    props.loginCallback();
                    setShow(false)
                } else {
                    setLogin(false);
                    setTimeout(() => {
                        setLogin(true);
                    }, 5000);

                }
            });
    };
    //=================
    return (
        <>
            <div className="NavBar">
                <div className="frist-row">
                    
                    {/* Brand Logo */}
                    <Link to="/" className="logo menu-element">

                    </Link>

                    <input
                        style={{ height: '20px' }}
                        type="text" name="search" placeholder="Search" onChange={event => {
                            props.ToSetSearch(event.target.value)
                        }}></input>

                    {/* <div className="menu-element" >ENG</div> */}
                    <div className="language-select">
                        <LanguageSelect />
                    </div>
                    <div className="menu-element">ACCOUNT</div>
                    <div className="menu-element">MY REQUESTS</div>
                    <button onClick={props.themeToggler}> switch mode</button>

                </div>
                <div className="sec-row">


                    {/* The Menu */}

                    <Link to="/facilities" className="menu-element">{t("facilities")}</Link>

                    {props.auth.isLoggedIn ?
                        <Link to="/manage-brand" className="menu-element">{t("my_requests")}</Link>
                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <Link to="/my-page" className="menu-element">{t("my_page")}</Link>
                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <Link to="/new-facility" className="menu-element">{t("new_facility")}</Link>

                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <></>
                        :
                        <Link
                            className="menu-element"
                            onClick={() => {
                                handleShow()
                                props.loginCallback()
                            }}>
                            {t("login")}
                </Link>}
                    {console.log(props.auth)}

                    {props.auth.isLoggedIn ?
                        <Link
                            className="menu-element"
                            onClick={() => {

                                localStorage.removeItem("jwtToken");
                                props.loginCallback()
                                history.push(`/`)
                                    ;
                            }}>
                            {t("logout")}
                </Link>
                        : <></>}



                    {/* Login pop-up model */}
                    <>


                        <Modal
                            show={show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            {!login && (
                                <Alert variant={"danger"}>
                                    Your email or password is wrong
                                </Alert>
                            )}
                            <Modal.Header closeButton>
                                <Modal.Title>{t("login")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Formik
                                    validationSchema={validationSchema}
                                >
                                    <Container>
                                        <FormikForm>
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Form.Label style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                                    {t("email")}
                                     </Form.Label>

                                                <Form.Control as={Field} name="email" onChange={(e) => onChangeInput(e)} placeholder="email@example.com" />
                                                <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
                                                    {msg}
                                                </Alert>} />
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                                <Form.Label style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                                    {t("password")}
                                    </Form.Label>

                                                <Form.Control as={Field} name="password" onChange={(e) => onChangeInput(e)} type="password" placeholder="Password" />
                                                <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                                                    {msg}
                                                </Alert>} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Col md={12}>
                                                    <p style={{ color: "black", fontFamily: "serif" }}> {t("you_dont_have_account")} <Link eventKey={2} as={Link} to="/signup">
                                                        {t("register")}
                                       </Link>
                                                    </p>

                                                    <Button style={{ marginLeft: "150px" }} onClick={(e) => onSubmit(e)} variant="secondary">{t("login")}</Button>
                                                </Col>
                                            </Form.Group>

                                        </FormikForm>
                                    </Container>
                                </Formik>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    {t("close")}
                        </Button>

                            </Modal.Footer>
                        </Modal>
                    </>
                    {/* ==================== */}

                </div>
            </div>
        </>
    )
}