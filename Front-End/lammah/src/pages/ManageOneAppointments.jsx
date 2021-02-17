import API_URL from '../apiConfig.js'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Collapse, Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';
import { useTranslation } from "react-i18next";

export default function ManageOneAppointments(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allUsersA, setAllUsersA] = useState(false);
    
    //For Translation
    const { t } = useTranslation();

    var numberOfApoointmentWaiting = 0;

    //Appointment Confirm button
    const [showConfirm, setShowConfirm] = useState(false);
    function handleCloseConfirm() {
        setShowConfirm(false);
    }
    const handleShowConfirm = () => setShowConfirm(true);

    //Appointment Delete button
    const [show, setShow] = useState(false);
    function handleClose() {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/user/users')
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

    //Confirm Appointment
    const confirmAppointment = (appointmentId) => {
        axios.put(`http://localhost:5000/api/appointment/${appointmentId}/confirm`)
            .then(data => {
                props.setAfterConfirm(!props.afterConfirm);
            })

    }

    //Delete Appointment
    const deleteAppointment = (facilityId, appointmentId) => {
        axios.delete(`http://localhost:5000/api/appointment/${appointmentId}/${facilityId}`)
            .then(data => {
                props.setAfterCancel(!props.afterCancel)
            })
    }

    const numOfAppointmentStateWaiting = props.facility.appointment.forEach((appointment) => {
        if (appointment.status == 'waiting') {
            numberOfApoointmentWaiting += 1;

        }


    })
    return (
        <div
            style={{ color: 'black' }}>

            <div
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                style={{
                    borderBottom: '1px solid gray',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#282C36',
                    color: "white",
                    borderRadius: '5px'

                }}
            >
                <p
                    style={{
                        margin: '1%',
                        backgroundColor: 'red',
                        width: '30px',
                        borderRadius: '3px',
                        textAlign: 'center',

                    }}
                >{numberOfApoointmentWaiting}</p>
                <p style={{
                    margin: '1%'
                }}>{props.facility.name}</p>

            </div>
            <Collapse in={open}>
                <div>
                    <br />
                    <table style={{
                        width: "100%",
                        border: '1px solid #282C36',
                        borderCollapse: 'collapse',


                    }}>
                        <tr
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#282C36',
                                border: '1px solid #282C36',
                                color: 'white',
                            }}>
                            <th
                                style={{
                                    border: '1px solid #282C36',

                                }}>{t("user")}</th>
                            <th
                                style={{
                                    border: '1px solid #282C36',
                                }}
                            >{t("phone")}</th>
                            <th
                                style={{
                                    border: '1px solid #282C36',
                                }}
                            >{t("email")}</th>
                            <th
                                style={{
                                    border: '1px solid #282C36',
                                }}
                            >{t("date")}</th>
                            <th
                                colspan="2"
                                style={{

                                }}
                            >{t("accept_cancel")}</th>

                        </tr>
                        {props.facility.appointment.slice(0).reverse().map((app, i) => {
                            return (
                                <>
                                    {allUsersA &&
                                        <>
                                            {(app.status == "waiting") ?
                                                <>

                                                    <tr style={{
                                                        textAlign: 'center'
                                                    }}>
                                                        <td
                                                            style={{
                                                                border: '1px solid #282C36',
                                                                paddingLeft: '10px'
                                                            }}

                                                        > {findUser(app.user)[0].name}</td>
                                                        <td
                                                            style={{
                                                                border: '1px solid #282C36',
                                                                paddingLeft: '10px'
                                                            }}

                                                        >{findUser(app.user)[0].phone}</td>
                                                        <td

                                                            style={{
                                                                border: '1px solid #282C36',
                                                                paddingLeft: '10px'
                                                            }}

                                                        >{findUser(app.user)[0].email}</td>
                                                        <td

                                                            style={{
                                                                border: '1px solid #282C36',
                                                                paddingLeft: '10px'
                                                            }}

                                                        ><Moment format="YYYY/MM/DD">
                                                                {
                                                                    app.date
                                                                }</Moment></td>
                                                        <td
                                                            variant="success"
                                                            onClick={() => {
                                                                props.setIdOfAppointment(app._id)
                                                                handleShowConfirm()
                                                            }}
                                                            style={{
                                                                border: '1px solid #282C36',
                                                                paddingLeft: '10px',
                                                                backgroundColor: 'rgb(66, 235, 51)',
                                                                cursor: 'pointer',
                                                            }}

                                                        >{t("confirm")}</td>
                                                        <td
                                                            variant="danger"
                                                             onClick={()=>{
                                                                props.setIdOfAppointment(app._id);
                                                                handleShow();
                                                             }}
                                                            style={{
                                                                border: '1px solid #282C36',
                                                                paddingLeft: '10px',
                                                                backgroundColor: 'red',
                                                                cursor: 'pointer',
                                                            }}

                                                        >{t("cancel")}</td>

                                                    </tr>







                                                </>
                                                : <></>}
                                        </>
                                    }


                                </>
                            )
                        })}
                    </table>
                </div>
            </Collapse> <br />

            <br />

            {/* Confirm Modal */}
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirm_reservation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("are_you_sure_accept_this")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        {t("close")}
                                                        </Button>
                    <Button variant="primary" onClick={() => {
                        confirmAppointment(props.IdOfAppointment);
                        handleCloseConfirm();

                    }}>
                        {t("confirm")}
                                                        </Button>
                </Modal.Footer>

            </Modal>
            {/* Cancel Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirm_delete")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("are_you_sure_to_delete_reservation")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("close")}
                                                        </Button>
                    <Button variant="primary" onClick={() => {
                        deleteAppointment(props.facility._id,props.IdOfAppointment);
                        handleClose();

                    }}>
                        {t("delete")}
                                                        </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}
