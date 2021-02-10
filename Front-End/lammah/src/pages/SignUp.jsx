import React, { useState, useEffect } from "react";
import { Row, Form, Col, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const validtionSchima = Yup.object({
  name: Yup.string().required("This Field is Reqiured"),
  email: Yup.string().required(" This Field is Reqiured!!").email("example@example.com"),
  password: Yup.string().required("This Field is Reqiured!!").min(8, "must be more than 8 ").max(20, "whatEver")
})

export default function SignUp() {

  const history = useHistory();

  // to show aleart
  const [register, setRegister] = useState(true);

  // user info
  const [user, setUser] = useState(false ? "" : { name: "", email: "", password: "" });

  // to add the user info to database
  const onSubmit = (user) => {
    console.log("test")

    axios
      .post("http://localhost:5000/api/user/register", user)
      .then((res) => {

        if (user) {
          history.push("/login");
        } else {

          setTimeout(() => {
            setRegister(true);
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

        <Container className="justify-content-center" className=" pt-5" style={{ width: "70%", padding: "270px" }}>

          <Col>
            <FormikForm className="mt-5">

              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Name
          </Form.Label>

                <Form.Control as={Field} name="name" placeholder="Your Name" />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextPhone">
                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Phone Number
          </Form.Label>

                <Form.Control as={Field} name="phone" placeholder="05XXXXXXXX" />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Email
          </Form.Label>

                <Form.Control as={Field} name="email" placeholder="email@example.com" />

              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Password
          </Form.Label>

                <Form.Control as={Field} name="password" type="password" placeholder="Password" />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextConfirmPassword">
                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Confirm Password
          </Form.Label>

                <Form.Control as={Field} name="password" type="password" placeholder="confirm password" />

              </Form.Group>
            </FormikForm>
          </Col>
          <Button type="submit" style={{ fontFamily: "serif", marginLeft: "140px" }} variant="secondary" active>
            SignUp
          </Button>

        </Container>

      </Formik>
    </>
  )
}
