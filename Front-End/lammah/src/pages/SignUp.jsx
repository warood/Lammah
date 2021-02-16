import API_URL from '../apiConfig.js'
import React, { useState, useEffect } from "react";
import { Row, Form, Col, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validtionSchima = Yup.object({
  name: Yup.string().required("This Field is Reqiured"),
  email: Yup.string().required(" This Field is Reqiured!!").email("example@example.com"),
  phone: Yup.string().required("This Field is Reqiured!!").min(10, "must be 10 numbers ").max(10),
  password: Yup.string().required('Please Enter your password')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  ),confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null], "Passwords not match")

})

export default function SignUp() {
  
  const history = useHistory();

  // to show aleart
  const [register, setRegister] = useState(true);

  // user info
  const [user, setUser] = useState(false ? "" : { name: "", email: "", password: "" , phone:"" });

  // to add the user info to database
  const onSubmit = (values) => {

    axios
      .post(`${API_URL}/api/user/register`, values)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          history.push("/");
        } else {
          setTimeout(() => {
            setRegister(false);
          }, 3000);
        }

      }).catch((err) => console.log(err));
  };

  return (
    <>

      {!register && (
        <Alert variant={"danger"}>
          The email is already in use. Please change the email
        </Alert>
      )}


      

      <Formik
        initialValues={user}
        validationSchema={validtionSchima}
        onSubmit={values => onSubmit(values)}

      >

        <Container className="justify-content-center  pt-5"  style={{ width: "70%", padding: "270px" }}>
        <h2>Create Account </h2>
          <FormikForm className="mt-5">
            <Col>


              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label style={{ fontWeight: "bold" }} sm="2">
                  Name
               </Form.Label>

                <Form.Control as={Field}
                  placeholder="First name"
                  name="name" />
                <ErrorMessage name="name" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextPhone">
                <Form.Label style={{ fontWeight: "bold" }} sm="2">
                  Phone Number
              </Form.Label>

                <Form.Control as={Field} name="phone" placeholder="05XXXXXXXX" />
                <ErrorMessage name="phone" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label style={{ fontWeight: "bold" }} sm="2">
                  Email
              </Form.Label>

                <Form.Control as={Field}
                  type="email"
                  placeholder="Enter email"
                  name="email" />

                <ErrorMessage name="email" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />

              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label style={{ fontWeight: "bold" }} sm="2">
                  Password
              </Form.Label>

                <Form.Control as={Field} name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />
              </Form.Group>


              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label style={{ fontWeight: "bold" }}sm="2">
                Confirm Password
              </Form.Label>

                <Form.Control as={Field} name="confirmPassword" type="password" placeholder="Password" />
                <ErrorMessage name="confirmPassword" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />
              </Form.Group>
              
            </Col>
            <Button  type="submit" style={{ marginLeft: "140px" }} variant="secondary" active>
              SignUp
          </Button>
          </FormikForm>
          

        </Container>

      </Formik>
    </>
  )
}
