import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Modal, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'


export default function HomeHeader(props) {
    
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });
  
  
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
        .post("http://localhost:5000/api/user/login", credentials)
        .then((res) => {
          console.log("Express backend /login response", res);
  
          const token = res.data.token;
          const msg = res.data.msg;
  
          if (token) {
            localStorage.setItem("jwtToken", token);
            props.loginCallback();
            console.log('props.loginCallback();', props.loginCallback())
            console.log('before navigating to the profile')
            setShow(false)
          } else {
            console.log("Login error: ", msg);
          }
        });
    };
  
      return (
          <>
        <div className="header">
        <Link style={{marginLeft:"1200px" , color:"white"}} onClick={() => {
              console.log("Logging Out!");
              localStorage.removeItem("jwtToken");
              props.loginCallback() 
              history.push(`/`)
              ;
            }}>
                    Logout
                </Link>
        <Link style={{marginLeft:"1200px" , color:"white"}} onClick={handleShow}>
                    Login
                </Link>
            <div className="container">
                {/* The Description in heart of the header */}
                <h1>DCRP....</h1>
                
            </div>
        </div>




        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form >

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label style={{color:"black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Email
                </Form.Label>

                <Form.Control name="email" onChange={(e) => onChangeInput(e)} placeholder="email@example.com" />

              </Form.Group>


              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label style={{color:"black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Password
              </Form.Label>

                <Form.Control name="password" onChange={(e) => onChangeInput(e)} type="password" placeholder="Password" />

              </Form.Group>

              <Form.Group>
                <Col md={12}>
                  <p style={{color:"black", fontFamily: "serif" }}> You don't have an account? Please <Link eventKey={2} as={Link} to="/signup">
                    Register
                    </Link> 
                  </p>

                  <Button style={{ marginLeft: "150px" }} onClick={(e) => onSubmit(e)} variant="secondary">Login</Button>
                </Col>
              </Form.Group>

            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
        </>
    )
}
