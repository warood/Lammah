import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Row, Col, Image, Button, Container, Modal, Form } from "react-bootstrap";
import { GearFill } from 'react-bootstrap-icons';
import OneCardOfApointment from '../components/OneCardOfApointment'
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function MyPage(props) {
    const history = useHistory();
    
    const { _id } = props.auth.currentUser;

    const [userInformation, setUserInformation] = useState({});
    const [editProfile, setEditProfile] = useState({});
    const [apointments, setApointments] = useState([])
    const [deleteAppointment, setDeleteAppointment] = useState(false);
    const [infoUpdate, setInfoUpdate] = useState(false);

    //For Translation
    const { t } = useTranslation();

    //to show edit Modal
    const [show, setShow] = useState(false);

    //to show edit Modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //take userinformation
    useEffect(() => {
        axios.get(`${API_URL}/api/user/my-page/${_id}`)

            .then((res) => {
                setUserInformation(res.data.user_info)
                setEditProfile(res.data.user_info)
                //   console.log('res ', res.data.appointments[0].facility)
                setApointments(res.data.appointments)
            })
    }, [deleteAppointment, infoUpdate])

    

    //take change 
    const onChangeInput = (e) => {
        e.preventDefault();

        setEditProfile((previousProfile) => ({ ...previousProfile, [e.target.name]: e.target.value }))

    };

    //change user informaation 
    const onSubmit = () => {

        axios.put(`${API_URL}/api/user/${_id}`, editProfile)
            .then(res => {
                
            })

        setShow(false);


        //to show new changes in user profile 
        axios.get(`${API_URL}/api/user/my-page/${_id}`)

            .then((res) => {
                setUserInformation(res.data.user_info)
                setEditProfile(res.data.user_info)
                //   console.log('res ', res.data.appointments[0].facility.images)
                setApointments(res.data.appointments)
            })

    }


    //show all user aponintments
    const allApointment = apointments.map((apointment, index) => {
        // console.log(apointment)
        return <OneCardOfApointment
            apointmentsDate={apointment.date}
            status={apointment.status}
            apointmentId={apointment._id}
            facilityName={apointment.facility.name}
            facilityImage={apointment.facility.images[0]}
            facilityId={apointment.facility._id}
            facility = {apointment.facility}
            setDeleteAppointment={setDeleteAppointment}
            deleteAppointment={deleteAppointment}
        />
    })


    return (
        <>
            {props.auth.isLoggedIn ?
                <>
                    <div className="MyPage">
                        <Container >
                            <Row className="personal-info">
                            <h1>{t("personal_info")}</h1>
                            </Row>
                            <Row className="info-container" style={{display: 'flex',
                        flexWrap: 'wrap',}}>
                                <Col className="img-container"xs={4} xl={3} md={4}>
                                    <Image src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png"
                                    style={{
                                        width: '100%',
                                        maxWidth: '100%',   
                                    }}
                                     />
                                </Col>
                                <Col className="user-info" xs={4} xl={6} md={4}>
                                    <p className='user-name'><b>{t("name")} : </b>{userInformation.name}  </p>
                                    <p className="user-email"><b>{t("email")} : </b> {userInformation.email} </p>
                                    <p className="user-phone"><b> {t("phone")} : </b>  {userInformation.phone} </p>

                                </Col>
                                <Col className="pt-5"
                                    style={{
                                        position: 'realtive',
                                        right: '0',
                                        paddingBottom: '0',
                                        width: '100%',

                                    }}>
                                    <Button onClick={handleShow} variant="white"
                                        style={{
                                            position: 'relative',
                                            top: '0',
                                            margin: '0',
                                            padding: '0',
                                            width: '100%',



                                        }}>
                                        <GearFill color="#A4A2A1" size={30}   />

                                    </Button>
                                </Col>
                            </Row>
                            <hr style={{ boxShadow: '0 4px 8px 0 gray, 0 6px 5px 0 orange',}}/>
                            <Row className="justify-content-md-center">
                                <h1 className="my-appoinment">{t("my_appointments")} </h1>
                            </Row>
                            <Row >
                                {allApointment}

                            </Row>
                        </Container>



                        <Modal show={show} onHide={handleClose} style= {{color: 'black'}}>
                            <Modal.Header closeButton >
                                <Modal.Title style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}>{t("edit_your_info")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Col}>
                                    <h4 style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> {t("name")} : </h4>
                                    <Form.Control name="name"
                                        onChange={(e) => onChangeInput(e)}
                                        defaultValue={userInformation.name}
                                        type="text" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <h4 style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> {t("email")} : </h4>
                                    <Form.Control
                                        name="email"
                                        onChange={(e) => onChangeInput(e)}
                                        defaultValue={userInformation.email}
                                        type="text" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <h4 style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> {t("phone")} : </h4>
                                    <Form.Control name="phone"
                                        onChange={(e) => onChangeInput(e)}
                                        defaultValue={userInformation.phone}
                                        type="text" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    {t("close")}
                    </Button>
                                <Button variant="secondary" onClick={(e) =>{
                                    onSubmit(e);
                                    setInfoUpdate(!infoUpdate);
                                }}>
                                    {t("save_changes")}
                    </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </>


                : <>{
                    history.push(`/`)
                }
                </>}
        </>
    )
}
