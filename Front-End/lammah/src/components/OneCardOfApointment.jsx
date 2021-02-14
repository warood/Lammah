import React, { useEffect, useState } from "react";
import { Col, Card, Row, Modal, Form, Button } from 'react-bootstrap'
import Moment from 'react-moment';
import axios from "axios";


export default function OneCardOfApointment(props) {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onSubmit = (apointmentId) => {
        // console.log(e , props.facilityId)

        axios.delete(`http://localhost:5000/api/appointment/${apointmentId}/${props.facilityId}`)
        .then()
        setShow(false)
    }

    //chane date format 
    const dateToFormat = props.apointmentsDate;
    //chane date format
    // var dateObj = new Date(props.apointmentsDate) ;
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();

    // var newdate = year + "/ " + month + "/ " + day;

    return (
        <>
            <Col className="mt-5 m-0 " style={{ left: "80px", width: "1000px" }}  >
                <Card className="ml-5" style={{ width: "900px" }}>
                    <Row style={{ height: "100%" }} >
                        <Col xs={6} md={5}  >
                            <Card.Img style={{ width: "100%" }} variant="top" src={props.facilityImage} />

                        </Col>
                        <Col style={{ width: "300px", left: "150px" }} className="pl-5 mt-2" >
                            <Card.Body>
                                <Row style={{ height: "100%" }}>
                                    <Col className="pr-5" style={{ width: "200px", left: "-200px" }}>
                                        <Card.Text  >
                                            <h6>  Facility Name :</h6>
                                            {props.facilityName}
                                        </Card.Text>
                                    </Col >
                                    <Col style={{ width: "500px", left: "-200px" }}>
                                        <Card.Text  >

                                            <h6>  Date :</h6>
                                            <Moment date={dateToFormat} />
                                            {/* {newdate} */}

                                        </Card.Text>
                                    </Col >
                                </Row>

                                <Row className="pt-3" style={{ height: "100%" }}>
                                    <Col className="pr-0" style={{ width: "200px", left: "-200px" }}>
                                        <Card.Text >
                                            <h6>Apointment ID:</h6>  {props.apointmentId}
                                        </Card.Text>
                                    </Col >
                                    <Col className="pt-1" style={{ left: "-175px" }}>
                                        <Card.Text  >
                                            <h6>  status :  {props.status}</h6>
                                        </Card.Text>
                                    </Col>
                                </Row>
                                {props.status == "waiting" ? <> <Button style={{ marginLeft: "200px" }} variant="danger" onClick={handleShow} > delete  </Button> </> :
                                    <></>
                                }
                            </Card.Body>

                        </Col>
                    </Row>

                </Card>
            </Col>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You Sure Want To Cancel This Appointment ?
        </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
          </Button>
                    <Button variant="primary" onClick={() => { onSubmit(props.apointmentId) }}>Yes Cancel It</Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}
