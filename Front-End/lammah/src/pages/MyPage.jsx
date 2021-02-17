import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { Row, Col, Image, Button, Container, Modal, Form } from "react-bootstrap";
import { GearFill } from 'react-bootstrap-icons';
import OneCardOfApointment from '../components/OneCardOfApointment'
import { useHistory } from "react-router-dom";



export default function MyPage(props) {
    const history = useHistory();
    

    const { _id } = props.auth.currentUser;

    const [userInformation, setUserInformation] = useState({});
    const [editProfile, setEditProfile] = useState({});
    const [apointments, setApointments] = useState([])
    const [deleteAppointment, setDeleteAppointment] = useState(false);
    const [infoUpdate, setInfoUpdate] = useState(false);

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
            .then(res => console.log('from backend i recieved ', res))

        setShow(false);


        //to show new changes in user profile 
        axios.get(`http://localhost:5000/api/user/my-page/${_id}`)

            .then((res) => {
                setUserInformation(res.data.user_info)
                setEditProfile(res.data.user_info)
                //   console.log('res ', res.data.appointments[0].facility.images)
                setApointments(res.data.appointments)
            })

    }


    //show all user aponintments
    const allApointment = apointments.map((apointment, index) => {
        return <OneCardOfApointment
            apointmentsDate={apointment.date}
            status={apointment.status}
            apointmentId={apointment._id}
            facilityName={apointment.facility.name}
            facilityImage={apointment.facility.images}
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
                            <h1>Personal Info</h1>
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
                                    <p className='user-name'><b>Name : </b>{userInformation.name}  </p>
                                    <p className="user-email"><b>Email : </b> {userInformation.email} </p>
                                    <p className="user-phone"><b> Phone : </b>  {userInformation.phone} </p>

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
                                        <GearFill color="" size={30} />

                                    </Button>
                                </Col>
                            </Row>
                            <hr />
                            <Row className="justify-content-md-center">
                                <h1 className="my-appoinment"> My Apointments </h1>
                            </Row>
                            <Row >
                                {allApointment}

                            </Row>
                        </Container>



                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton >
                                <Modal.Title style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}>Edit Your Information</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group as={Col}>
                                    <h4 style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> Name : </h4>
                                    <Form.Control name="name"
                                        onChange={(e) => onChangeInput(e)}
                                        defaultValue={userInformation.name}
                                        type="text" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <h4 style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> Email : </h4>
                                    <Form.Control
                                        name="email"
                                        onChange={(e) => onChangeInput(e)}
                                        defaultValue={userInformation.email}
                                        type="text" />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <h4 style={{ fontSize: "23px", color: "black", fontFamily: "serif", fontWeight: "bold" }}> Phone : </h4>
                                    <Form.Control name="phone"
                                        onChange={(e) => onChangeInput(e)}
                                        defaultValue={userInformation.phone}
                                        type="text" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                    </Button>
                                <Button variant="secondary" onClick={(e) =>{
                                    onSubmit(e);
                                    setInfoUpdate(!infoUpdate);
                                }}>
                                    Save Changes
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
