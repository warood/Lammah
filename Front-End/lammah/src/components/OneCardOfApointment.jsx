import React from 'react'
import { Col, Card, Row, Modal, Form , Button } from 'react-bootstrap'
import Moment from 'react-moment';

export default function OneCardOfApointment(props) {


    const onSubmit = (e) =>{
        console.log(e)

    }


    //chane date format 
    const dateToFormat = props.apointmentsDate;

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
                                {props.status == "waiting" ? <> <Button onClick={() => {onSubmit(props.apointmentId)}}> delete  </Button> </>:
                                <></>
                                }
                            </Card.Body>

                        </Col>
                    </Row>

                </Card>
            </Col>

        </>
    )
}
