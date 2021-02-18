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

    //Confirm Appointment
    const confirmAppointment = (appointmentId) => {
        axios.put(`${API_URL}/api/appointment/${appointmentId}/confirm`)
            .then(data => {
                props.setAfterConfirm(!props.afterConfirm);
            })

    }

    //Delete Appointment
    const deleteAppointment = (facilityId, appointmentId) => {
        axios.delete(`${API_URL}/api/appointment/${appointmentId}/${facilityId}`)
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
        <div className="facilities">

            <div className="fc-bar"
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}

            >
                <p className="fc-nav-num">{numberOfApoointmentWaiting}</p>
                <p className="fc-name">
                    {props.facility.name}</p>

            </div>
            <Collapse in={open}>
                <div>
                    <br />
                    <table className="fc-table">
                        <tr className="fc-titles">
                            <th>{t("user")}</th>
                            <th>{t("phone")}</th>
                            <th>{t("email")}</th>
                            <th>{t("date")}</th>
                            <th colspan="2">{t("accept_cancel")}</th>

                        </tr>
                        {props.facility.appointment.slice(0).reverse().map((app, i) => {
                            return (
                                <>
                                    {allUsersA &&
                                        <>
                                            {(app.status == "waiting") ?
                                                <>

                                                    <tr className="fc-t-row">
                                                        <td> {findUser(app.user)[0].name}</td>
                                                        <td>{findUser(app.user)[0].phone}</td>
                                                        <td>{findUser(app.user)[0].email}</td>
                                                        <td><Moment format="YYYY/MM/DD">
                                                            {
                                                                app.date
                                                            }</Moment></td>
                                                        <td className="btn-confirm-req"
                                                            variant="success"
                                                            onClick={() => {
                                                                props.setIdOfAppointment(app._id)
                                                                handleShowConfirm()
                                                            }}
                                                        >{t("confirm")}</td>
                                                        <td className="btn-delete-req"
                                                            variant="danger"
                                                            onClick={() => {
                                                                props.setIdOfAppointment(app._id);
                                                                handleShow();
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
            <Modal show={showConfirm} onHide={handleCloseConfirm} style= {{color: 'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirm_reservation")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("are_you_sure_accept_this")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        {t("close")}
                                                        </Button>
                    <Button variant="secondary" onClick={() => {
                        confirmAppointment(props.IdOfAppointment);
                        handleCloseConfirm();

                    }}>
                        {t("confirm")}
                                                        </Button>
                </Modal.Footer>

            </Modal>
            {/* Cancel Modal */}
            <Modal show={show} onHide={handleClose} style= {{color: 'black'}}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirm_delete")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("are_you_sure_to_delete_reservation")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("close")}
                                                        </Button>
                    <Button variant="secondary" onClick={() => {
                        deleteAppointment(props.facility._id, props.IdOfAppointment);
                        handleClose();

                    }}>
                        {t("delete")}
                                                        </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}
