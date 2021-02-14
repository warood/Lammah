import API_URL from '../apiConfig.js'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Collapse } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function ManageOneAppointments(props) {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [allUsersA, setAllUsersA] = useState(false);

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
 
   useEffect(()=>{
       axios.get('http://localhost:5000/api/user/users')
       .then((res)=>{

            // console.log(res.data.msg)
            setAllUsers(res.data.msg)
            setAllUsersA(true)
       })
   }, [])


   const findUser = (userId) =>{
       
       const userInfo =allUsers.filter(user=> user._id == userId)
       
       return userInfo
   }

   //Confirm Appointment
   const confirmAppointment = (appointmentId)=>{
        axios.put(`http://localhost:5000/api/appointment/${appointmentId}/confirm`)
        .then(data=>{
            console.log(data)
           
        })
    
   }

   //Delete Appointment
   const deleteAppointment=(facilityId, appointmentId)=>{
       axios.delete(`http://localhost:5000/api/appointment/${appointmentId}/${facilityId}`)
       .then(data=>{
           console.log(data)
           history.push('/manage-brand')
       })
   }

    return (
        <div>
            
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                {props.facility.name} 
            </Button>
            <Collapse in={open}>
                <div>
                <br/>
            {props.facility.appointment.map((app, i)=>{
                return(
                    <div>
                        
                       {allUsersA && 
                       <>
                       {(app.status == "waiting")?
                       <>
                     User name: {findUser(app.user)[0].name} <br/>
                     Phone: {findUser(app.user)[0].phone} <br/>
                     Email: {findUser(app.user)[0].email}
                     
                   
                        <Button variant="success"  onClick={handleShowConfirm}>Confirm</Button>
                        <Button variant="danger" onClick={handleShow}>Cancel</Button>
                       <br/>  <hr/>

                      
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
                                <Button variant="primary" onClick={() => {confirmAppointment(app._id);
                                handleCloseConfirm()}}>
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
                                <Button variant="primary" onClick={() => {deleteAppointment(props.facility._id, app._id);
                                handleClose()}}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        </>
                     : <></> } 
                     </>
                        }


                    </div>
                ) 
            })}
                    
                    
                </div>
            </Collapse> <br/>

            <br />

            

        </div>
    )
}
