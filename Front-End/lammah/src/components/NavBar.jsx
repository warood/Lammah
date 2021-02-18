import API_URL from '../apiConfig.js'
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { Button, Form, Container, Row, Modal, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";

export const NavBar = (props) => {
    // Login functional
    const history = useHistory();

    //For Translation
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        email: Yup.string().required(t("please_enter_your_email")).email("example@example.com"),
        password: Yup.string().required(t("please_enter_your_password")),
    })

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


        axios.post(`${API_URL}/api/user/login`, credentials)
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
                    <Link to="/" className="logo">

                    </Link>

                    <input className="menu-element search"
                        type="text" name="search" placeholder="Search" onChange={event => {
                            props.ToSetSearch(event.target.value)
                        }}></input>
                    <Link to="/facilities" className="menu-element">{t("facilities")}</Link>
                    {/* <div className="menu-element" >ENG</div> */}
                    {props.auth.isLoggedIn ?
                        <Link to="/my-page" className="menu-element">{t("my_page")}</Link>
                        :
                        <></>}
                    <div className="language-select">
                        <LanguageSelect  />
                    </div>
                    <FormControlLabel
                        value="Dark Theme"
                        control={<Switch color="secondary" />}
                        label="Dark Theme"
                        labelPlacement="Dark Theme"
                        style={{ color: 'white' }}
                        onClick={props.themeToggler}
                    />
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
                    {/* {console.log(props.auth)} */}

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

                </div>

                <div className="sec-row">


                    {/* The Menu */}



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




                {/* Login pop-up model */}
                <>


                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        style= {{color: 'black'}}
                    >
                        {!login && (
                            <Alert variant={"danger"}>
                                {t("your_email_or_password_is_wrong")}
                            </Alert>
                        )}
                        <Modal.Header closeButton
                        style= {{color: 'black'}}>
                            <Modal.Title>{t("login")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik 
                            initialValues ={{email:"" , password:""}}
                            validationSchema={validationSchema}
                            validateOnBlur = {false}
                            validateOnChange={false}
                            onSubmit = {(e) => onSubmit(e)}
                            >
                                <Container>
                                    <FormikForm>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                            {t("email")}
                                     </Form.Label>

                                            <Form.Control as={Field} name="email" onKeyUp={(e) => onChangeInput(e)} placeholder="email@example.com" />
                                            <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
                                                {msg}
                                            </Alert>} />
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextPassword">
                                            <Form.Label style={{ color: "black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                            {t("password")}
                                    </Form.Label>

                                            <Form.Control as={Field} name="password" onKeyUp={(e) => onChangeInput(e)} type="password" placeholder="Password" />
                                            <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                                                {msg}
                                            </Alert>} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Col md={12}>
                                                <p style={{ color: "black", fontFamily: "serif" }}> {t("you_dont_have_account")}  <Link onClick={handleClose} eventKey={2} as={Link} to="/signup">
                                                {t("register")}

                                       </Link>
                                                    </p>

                                                <Button type="submit" style={{ marginLeft: "150px" }} variant="secondary">{t("login")}</Button>
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