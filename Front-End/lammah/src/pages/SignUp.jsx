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
  phone: Yup.string().required("This Field is Reqiured!!").min(10, "must be more than 10 ").max(10),
  password: Yup.string().required("This Field is Reqiured!!").min(8, "must be more than 8 ").max(20)
})

export default function SignUp() {
  
  const history = useHistory();

  // to show aleart
  const [register, setRegister] = useState(true);

  // user info
  const [user, setUser] = useState(false ? "" : { name: "", email: "", password: "" , phone:"" });

  // to add the user info to database
  const onSubmit = (values) => {
    console.log("test")

    axios
      .post("http://localhost:5000/api/user/register", values)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          history.push("/login");
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
          <FormikForm className="mt-5">
            <Col>


              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label style={{ color:"black",fontFamily: "serif", fontWeight: "bold" }} sm="2">
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
                <Form.Label style={{color:"black", fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Phone Number
              </Form.Label>

                <Form.Control as={Field} name="phone" placeholder="05XXXXXXXX" />
                <ErrorMessage name="phone" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label style={{ color:"black",fontFamily: "serif", fontWeight: "bold" }} sm="2">
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
                <Form.Label style={{ color:"black",fontFamily: "serif", fontWeight: "bold" }} sm="2">
                  Password
              </Form.Label>

                <Form.Control as={Field} name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />
              </Form.Group>
              
            </Col>
            <Button type="submit" style={{ fontFamily: "serif", marginLeft: "140px" }} variant="secondary" active>
              SignUp
          </Button>
          </FormikForm>
        </Container>

      </Formik>
    </>
  )
}
