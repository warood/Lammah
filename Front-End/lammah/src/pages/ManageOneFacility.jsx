import React, { useEffect, useState } from 'react';
import { Card, Button, Accordion, Modal } from 'react-bootstrap';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ManageOneFacility(props) {

    const history = useHistory();

   
    //Facility Edit button
    const [showEdit, setShowEdit] = useState(false);
    function handleCloseEdit (){
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
    const [updateFacility, setUpdateFacility] = useState({ name: props.facility.name, description: props.facility.description, images: props.facility.images, location:props.facility.location, price:props.facility.price });



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
        axios.put(`http://localhost:5000/api/facility/${facilityId}/edit`, updateFacility)
            .then(data => {
                console.log("update facility")
                props.setAfterUpdateFacility(!(props.afterUpdateFacility))
                
            })
    }

    //Delete Facility
    const deleteFacility = (facilityId) => {

        axios.delete(`http://localhost:5000/api/facility/${facilityId}`)
            .then(data => {

                history.push('/manage-brand')
            })
    }

    return (
        <div>
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="i">
                            {props.facility.name}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="i" className="card-container">
                        <Card.Body className="card-body ">
                            <Card.Img variant="null" src={props.facility.images} />
                            <div className="card-content">

                                <Card.Text> {props.facility.description} </Card.Text>
                                <Card.Text> {props.facility.location} </Card.Text>
                                <Card.Text> {props.facility.city} </Card.Text>
                                <Card.Text> {props.facility.price} SR</Card.Text>
                            </div>
                            <div className="card-btns">
                                <Button variant="success" onClick={handleShowEdit}>
                                    Edit</Button>
                                <Button variant="danger" onClick={handleShow}>Delete</Button>
                            </div>

                            {/* Edit Modal */}
                            <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Facility</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Name:  <input type="text" name="name" size="80" defaultValue={props.facility.name} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   Description: <textarea rows="8" cols="80" type="text" name="description" defaultValue={props.facility.description} onChange={(e) => onChangeFacility(e)} /> <br /> <br/>
                                   Location: <input type="text" name="location" size="80" defaultValue={props.facility.location} onChange={(e) => onChangeFacility(e)} /> <br/> <br/>
                                   Price: <input type="text" name="price" size="80" defaultValue={props.facility.price} onChange={(e) => onChangeFacility(e)} /> <br/> <br/>
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
                                <Button variant="primary" onClick={() => {deleteFacility(props.facility._id);
                                handleClose()}}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    )
}
