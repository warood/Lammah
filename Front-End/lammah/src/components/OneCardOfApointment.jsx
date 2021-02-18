import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from "react";
import { Col, Card, Row, Modal, Form, Button } from 'react-bootstrap'
import Moment from 'react-moment';
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function OneCardOfApointment(props) {

    //For Select Language
    const { t } = useTranslation();

    const [show, setShow] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allUsersA, setAllUsersA] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/user/users`)
            .then((res) => {
                // console.log(res.data.msg)
                setAllUsers(res.data.msg)
                setAllUsersA(true)
            })
    }, [])

    const findUser = (userId) => {

        const userInfo = allUsers.filter(user => user._id == userId)

        return userInfo
    }


    const onSubmit = (apointmentId) => {

        axios.delete(`${API_URL}/api/appointment/${apointmentId}/${props.facilityId}`)
            .then()
        setShow(false)
    }

    return (
        <>
        {allUsersA &&
        <>
            <Row className="appoitment-container">
                <Card className="app-card" style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                }}>
                    <Row className="card-row" style={{
                        height: "100%",
                        width: '100%',
                    }} >
                        <Col xs={6} md={5}  >
                            <Card.Img className="card-img" variant="top" src={props.facilityImage} />

                        </Col>
                        <Col >
                            <Card.Body style= {{color: 'black'}}>
                                <Row className="card-info"  >

                                    <p>{props.facilityName}</p>
                                    <p className="card-date" style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        fontSize: '0.7em',
                                    }}><Moment format="YYYY/MM/DD">
                                            {props.apointmentsDate}
                                        </Moment></p>

                                </Row>
                                <Row>
                                    <p style={{
                                        fontSize: '0.8em'
                                    }}>{t("status")}: {props.status}</p>
                                </Row>
                               
                                <Row>
                                    <p style={{
                                        fontSize: '0.8em'
                                    }}>{t("owner")}: {findUser(props.facility.user)[0].name}</p>
                                </Row>
                                <Row>
                                    <p style={{
                                        fontSize: '0.8em'
                                    }}>{t("phone")}: {findUser(props.facility.user)[0].phone}</p>
                                </Row>

                                <Row>
                                    <p style={{
                                        fontSize: '0.8em'
                                    }}>{t("apointment_id")}: {props.apointmentId}</p>

                                </Row>



                            </Card.Body>

                        </Col>
                        <div style={{
                            position: 'absolute',
                            top: '1%',
                            right: '1%',

                        }}>
                            {props.status == "waiting" ? <>
                                <p
                                    className="delete-appointment-btn"
                                    variant="danger" onClick={() => {
                                        setShow(true);
                                    }} > X  </p> </> :
                                <></>
                            }
                        </div>
                    </Row>

                </Card>
            </Row>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style= {{color: 'black'}}>

                <Modal.Header closeButton>
                    <Modal.Title>{t("confirm_delete")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {t("are_you_sure_to_delete_reservation")}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       {t("no")}
                </Button>
                    <Button variant="secondary" onClick={() => {
                        onSubmit(props.apointmentId);
                        props.setDeleteAppointment(!props.deleteAppointment);

                    }}>{t("yes")}</Button>
                </Modal.Footer>
            </Modal>
        </>
    }
    </>
    )
}
