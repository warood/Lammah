import React from "react";
import { Row, Form, Col, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function NewFacility() {

    


    


    return (
        <>
            <Container className="justify-content-center" className=" pt-5" style={{ width: "70%", padding: "270px" }}>

                <Col>
                    <Form >
                        <Form.Group as={Row} controlId="formPlaintextName">

                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" , fontSize:"25px"}} sm="2">
                                Facility Information :
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Name
                            </Form.Label>

                            <Form.Control placeholder="Facility Name" />

                        </Form.Group>

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

                            <Form.Control placeholder="Add Location Link" />

                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextCity">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                City
                            </Form.Label>

                            <Form.Control as="select">
                                <option>Riyadh</option>
                                <option>Jeddah</option>
                                <option>Dammam</option>
                            </Form.Control>

                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextType">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Type
                            </Form.Label>

                            <Form.Control as="select">
                                <option>Chalet</option>
                                <option>Camp</option>
                            </Form.Control>

                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPrice">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                Price
                            </Form.Label>

                            <Form.Control placeholder="SR" />


                        </Form.Group>


                        <Form.Group as={Row} controlId="ControlDesciption">
                            <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">Desciption</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                    </Form>

                </Col>
                <Button style={{ fontFamily: "serif", marginLeft: "140px" }} variant="secondary" active>
                    Submite
                </Button>

            </Container>
        </>
    )
}
