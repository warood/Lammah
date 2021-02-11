import React from "react";
import { Row, Form, Col, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object({
    name: Yup.string().required(" Facility name is required "),
    city: Yup.string().required("You must choose one "),
    type: Yup.string().required("You must choose one "),
    price: Yup.string().required("Facility price is required "),
  })

export default function NewFacility() {

    const [facility, setFacility] = useState({name: "", description:"", location:"", city:"", price:"", type:""});
    const history = useHistory();
    const onSubmit = (values) => {

         axios
             .post('http://localhost:5000/api/facility/new-facility', values)
             .then((res) => {
                 console.log(res)
                 history.push("/facilities"); 
             })
             .catch((err) => console.log(err));
     }
    
    return (
        <>
            <Container className="justify-content-center" className=" pt-5" style={{ width: "70%", padding: "270px" }}>

                <Col>
                <Formik
                initialValues = {facility}
                validationSchema={validationSchema}
                onSubmit = {values => onSubmit(values) }
                >
                    <Form as={FormikForm} className="form">
                        <Form.Group as={Row} controlId="formPlaintextName">

                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" , fontSize:"25px"}} sm="2">
                                Facility Information :
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Name
                            </Form.Label>

                            <Form.Control as={Field} placeholder="Facility Name" name="name" type="text" />

                        </Form.Group>

                        <ErrorMessage name="name" render={(msg) =>  <Alert variant={"danger"}>
                            {msg}
                            </Alert>} />
                        <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Images
                            </Form.Label>
                            <Form.File
                                id="custom-file-translate-scss"
                                label="Choose Images"
                                lang="en"
                                custom
                            />
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextNameLocation">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Location
                            </Form.Label>

                            <Form.Control placeholder="Add Location Link" name="location" type="text"/>

                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextCity">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                City
                            </Form.Label>

                            <Field as="select" name="city">
                                <option>Riyadh</option>
                                <option>Jeddah</option>
                                <option>Dammam</option>
                            </Field>

                        </Form.Group>
                        <ErrorMessage name="city" render={(msg) =>  <Alert variant={"danger"}>
                            {msg}
                            </Alert>} />

                        <Form.Group as={Row} controlId="formPlaintextType">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Type
                            </Form.Label>

                            <Field as="select" name="type">
                                <option>Chalet</option>
                                <option>Camp</option>
                            </Field>

                        </Form.Group>
                        <ErrorMessage name="type" render={(msg) =>  <Alert variant={"danger"}>
                            {msg}
                            </Alert>} />
                        <Form.Group as={Row} controlId="formPlaintextPrice">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Price
                            </Form.Label>

                            <Form.Control as={Field} placeholder="SR" name="price" type="text"/>


                        </Form.Group>

                        <ErrorMessage name="price" render={(msg) =>  <Alert variant={"danger"}>
                            {msg}
                            </Alert>} />

                        <Form.Group as={Row} controlId="ControlDesciption">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">Desciption</Form.Label>
                            <Form.Control as="textarea" rows={3} name="desciption"/>
                        </Form.Group>
                <Button style={{ fontFamily: "serif", marginLeft: "140px" }} variant="secondary" type="submit">
                    Submite
                </Button>
                    </Form>
                    </Formik>
                </Col>


            </Container>
        </>
    )
}
