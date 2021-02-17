import API_URL from '../apiConfig.js'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Collapse, Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Moment from 'react-moment';


export default function ManageOneAppointments(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allUsersA, setAllUsersA] = useState(false);



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
                            <th>User</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th colspan="2">Accept/Cancel</th>

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
                                                        >Confirm</td>
                                                        <td className="btn-delete-req"
                                                            variant="danger"
                                                            onClick={() => {
                                                                props.setIdOfAppointment(app._id);
                                                                handleShow();
                                                            }}
                                                        >Cancel</td>

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
                    <Modal.Title>Confirm Reservation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to accept this reservation</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        Close
                                                        </Button>
                    <Button variant="secondary" onClick={() => {
                        confirmAppointment(props.IdOfAppointment);
                        handleCloseConfirm();

                    }}>
                        Confirm
                                                        </Button>
                </Modal.Footer>

            </Modal>
            {/* Cancel Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this reservation</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                                                        </Button>
                    <Button variant="secondary" onClick={() => {
                        deleteAppointment(props.facility._id, props.IdOfAppointment);
                        handleClose();

                    }}>
                        Delete
                                                        </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}
