
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { Button, Form, Container, Row, Modal, Col, Alert } from "react-bootstrap";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required(" Enter your email "),
    password: Yup.string().required(" Enter password "),
})

export const NavBar = (props) => {

    
    // Login functional
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    //for show alert 
    const [login, setLogin] = useState(true);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const onChangeInput = (event) => {
    //     const { name, value } = event.target;
    //     setCredentials({
    //         ...credentials,
    //         [name]: value,
    //     });
    // };

    //login function
    const onSubmit = (values) => {
       
        axios
            .post("http://localhost:5000/api/user/login", values)
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
                {/* Brand Logo */}
                <Link to="/" className="logo menu-element">LAMMAH</Link>

                {/* The Menu */}
                <div className="menu">

                    <Link to="/facilities" className="menu-element">FACILITIES</Link>

                    {props.auth.isLoggedIn ?
                        <Link to="/manage-brand" className="menu-element">BRAND</Link>
                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <Link to="/my-page" className="menu-element">MY PAGE</Link>
                        :
                        <></>}
                    {props.auth.isLoggedIn ?
                        <Link to="/new-facility" className="menu-element">NEW FACILITY</Link>

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
                            LOGIN
                </Link>}
                    {console.log(props.auth)}

                    {props.auth.isLoggedIn ?
                        <Link
                            className="menu-element"
                            style={{ color: "black" }} onClick={() => {

                                localStorage.removeItem("jwtToken");
                                props.loginCallback()
                                history.push(`/`)
                                    ;
                            }}>
                            LOGOUT
                </Link>
                        : <></>}
                </div>


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
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Formik
          initialValues={credentials}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}
        >
          <Form>
            <div >
              <label>Email address</label>
              <Field type="email" className="form-control" name="email" placeholder="Enter email" />
            </div>
            <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />
            <div >
              <label>Password</label>
              <Field type="password" name="password" className="form-control" placeholder="Enter password" />
            </div>
            <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
              {msg}
            </Alert>} />

            <button className="btn" type="submit" >Login</button>



            <p style={{ color: "black", fontFamily: "serif" }}> You don't have an account? Please <Link eventKey={2} as={Link} to="/signup">
                                                    Register
                                       </Link>
                                                </p>
          </Form>
        </Formik>
                        </Modal.Body>



                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                        </Button>

                        </Modal.Footer>
                    </Modal>
                </>
                {/* ==================== */}

            </div>
        </>
    )
}