import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import { Card, Button, Accordion, Modal, Tabs, Row, Tab } from 'react-bootstrap';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ManageOneFacility(props) {

    const history = useHistory();

    //Facility Edit button
    const [showEdit, setShowEdit] = useState(false);
    function handleCloseEdit() {
        setShowEdit(false);
    }
    const handleShowEdit = () => setShowEdit(true);

    //Facility Delete button
    const [show, setShow] = useState(false);
    function handleClose() {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Update Facility 
    const [updateFacility, setUpdateFacility] = useState({ name: props.facility.name, description: props.facility.description, images: props.facility.images, location: props.facility.location, price: props.facility.price });



    //Take values of update facility
    const onChangeFacility = (e) => {
        const { name, value } = e.target;
        setUpdateFacility({
            ...updateFacility,
            [name]: value,
        });
    };

    //Edit Facility
    const editFacility = (facilityId) => {
        axios.put(`${API_URL}/api/facility/${facilityId}/edit`, updateFacility)
            .then(data => {
                props.setAfterUpdateFacility(!props.afterUpdateFacility)
                history.push('/manage-brand')
            })
    }

    //Delete Facility
    const deleteFacility = (facilityId) => {

        axios.delete(`${API_URL}/api/facility/${facilityId}`)
            .then(data => {
                props.setAfterDeleteFacility(!props.afterDeleteFacility)
                history.push('/manage-brand')
            })
    }



    return (

        <div>

            <Row style={{
                display: 'flex',
                border: '1px solid gray',
                flexWrap: 'nowrap',
                maxWidth: '800px',
                margin: '0 0 15px 0 ',
                background: `url('${props.facility.images}')`,
                backgroundSize: 'cover',
                objectPosition: '10% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                justifyContent: 'flex-end',
                minWidth: '800px',
                flexWrap: 'wrap',

            }}>

                <div style={{
                    maxWidth: '40%'
                }}>

                    {/* <img src={`${props.facility.images}`}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: '50% 50%',
                            height: '100%',
                        }} /> */}

                </div>


                <div style={{
                    position: 'relative',
                    maxWidth: '80%',
                    minWidth: '80%',
                }}>
                    <div style={{
                       
                        backgroundColor: 'rgba(40, 44, 54, 0.9)',
                        color: 'white',
                        padding: '3%',
                    }}>
                        <p>Name: {props.facility.name}</p>
                        <p style={{
                            maxWidth: '100%'
                        }}>Description: {props.facility.description}</p>
                        <p>Location: {props.facility.location}</p>
                        <p>Requests: {props.facility.appointment.length}</p>
                        <p>Cost: {props.facility.price} SAR</p>

                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            right: '0',
                            bottom: '5%',
                            maxWidth: '150px',
                            minWidth: '100px',
                            borderBottom: '1px solid white',
                            borderTop: '1px solid white',
                            color: 'red',
                            textAlign: 'center',
                            cursor: 'pointer',

                        }}
                        variant="success" onClick={handleShowEdit}>
                        Edit</div>
                    <p
                        style={{
                            position: 'absolute',
                            right: '1%', top: '2%',
                            color: 'red',
                            cursor: 'pointer',
                            border: '1px solid gray',
                            padding: '0 10px 0 10px'

                        }}
                        onClick={handleShow}>X</p>
                </div>
            </Row>
            <Row
                style={{
                    backgroundColor: 'yellow',
                    display: 'flex',
                    flexDirection: 'column',

                }}>

            </Row>

            {/* Edit Modal */}
            <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Facility</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Name:  <input type="text" name="name" size="80" defaultValue={props.facility.name} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   Description: <textarea rows="8" cols="80" type="text" name="description" defaultValue={props.facility.description} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   Location: <input type="text" name="location" size="80" defaultValue={props.facility.location} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   Price: <input type="text" name="price" size="80" defaultValue={props.facility.price} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   Photos: <input type="text" size="80" name="images" defaultValue={props.facility.images} onChange={(e) => onChangeFacility(e)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                                    </Button>
                    <Button variant="primary" onClick={() => {
                        editFacility(props.facility._id);
                        handleCloseEdit();
                    }}>
                        Edit
                                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this facility</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                                </Button>
                    <Button variant="primary" onClick={() => {
                        deleteFacility(props.facility._id);
                        handleClose()
                    }}>
                        Delete
                                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
