import API_URL from '../apiConfig.js'
import React, { useState, useEffect } from "react";
import { Row, Form, Col, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";




export default function SignUp() {
  
  //For Translation
  const { t } = useTranslation();

  const validtionSchima = Yup.object({
  name: Yup.string().required(t("this_field_is_reqiured")),
  email: Yup.string().required(t("this_field_is_reqiured")).email("example@example.com"),
  phone: Yup.string().required(t("this_field_is_reqiured")).min(10, t("must_be_10_numbers")).max(10),
  password: Yup.string().required(t("please_enter_your_password"))
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    t("must_contain_8_characters")
  ),confirmPassword: Yup.string().required().oneOf([Yup.ref("password"), null], t("passwords_not_match"))

})

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

      }).catch((err) => {});
  };

  return (
    <>

      {!register && (
        <Alert variant={"danger"}>
         {t("this_email_is_already_used")}
        </Alert>
      )}


      

      <Formik
        initialValues={user}
        validationSchema={validtionSchima}
        onSubmit={values => onSubmit(values)}

      >

        <Container className="justify-content-center  pt-5"  style={{ width: "70%", padding: "10%", }}>
          <FormikForm className="mt-5" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Col>


              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label style={{ fontWeight: "bold" }} sm="2">
                   {t("name")}
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
                    {t("phone")}
              </Form.Label>

                <Form.Control as={Field} name="phone" placeholder="05XXXXXXXX" />
                <ErrorMessage name="phone" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />

              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label style={{ fontWeight: "bold" }} sm="2">
                  {t("email")}
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
                   {t("password")}
              </Form.Label>

                <Form.Control as={Field} name="password" type="password" placeholder="Password" />
                <ErrorMessage name="password" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />
              </Form.Group>


              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label style={{ fontWeight: "bold" }}sm="2">
                {t("confirm_password")}
              </Form.Label>

                <Form.Control as={Field} name="confirmPassword" type="password" placeholder="Password" />
                <ErrorMessage name="confirmPassword" render={(msg) => <Alert variant={"danger"}>
                  {msg}
                </Alert>} />
              </Form.Group>
              
            </Col>
            <Button type="submit" style={{ margin: '10% auto 10% auto' }} variant="secondary" active>
              {t("confirm")}
          </Button>
          </FormikForm>
          

        </Container>

      </Formik>
    </>
  )
}
