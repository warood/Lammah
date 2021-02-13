import React, { useEffect, useState } from 'react';
import { Card, Button, Accordion } from 'react-bootstrap';
import axios from "axios";

export default function ManageBrand(props) {
    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/manage-brand/${userId}`)
            .then((res) => {
                // console.log(res)
                setFacilities(res.data.facilities)
            })

    }, [])

    //Get all appointments for user's facilities
    // const allAppointments = facilities.map((facility, i)=>{
    //     <Card className="card-container" key={i}>
    //             <Card.Header as="h5"> {facility.name}</Card.Header>
    //             <Card.Body className="card-body">
    //                 <Card.Img variant="null" src={facility.images} />
    //                 <div className="card-content">
    //                     <Card.Title>{facility.appointment.user.name}</Card.Title>
    //                     <Card.Text>
    //                     {facility.appointment.user.phone}
    //                     </Card.Text>
    //                     <Card.Text>
    //                     {facility.appointment.user.email}
    //                     </Card.Text>
    //                 </div>
    //                 <div className="card-btns">
    //                     <Button variant="success">Confirm</Button>
    //                     <Button variant="danger">Cancel</Button>
    //                 </div>
    //             </Card.Body>
    //         </Card>
    // })

    //Get all facilities for user
    const allFacilities = facilities.map((facility, i) => {
        return (
            // <Card className="card-container" key={i}>
            //     <Card.Body className="card-body">
            //         <Card.Img variant="null" src={facility.images} />
            //         <div className="card-content">
            //             <Card.Title>{facility.name}</Card.Title>
            //             <Card.Text> {facility.description} </Card.Text>
            //             <Card.Text> {facility.location} </Card.Text>
            //             <Card.Text> {facility.city} </Card.Text>
            //             <Card.Text> {facility.price} </Card.Text>
            //         </div>
            //         <div className="card-btns">
            //             <Button variant="success">Edit</Button>
            //             <Button variant="danger">Delete</Button>
            //         </div>
            //     </Card.Body>
            // </Card>


            <Accordion key={i}>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="i">
                            {facility.name}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="i" className="card-container">
                        <Card.Body className="card-body ">
                            <Card.Img variant="null" src={facility.images} />
                            <div className="card-content">

                                <Card.Text> {facility.description} </Card.Text>
                                <Card.Text> {facility.location} </Card.Text>
                                <Card.Text> {facility.city} </Card.Text>
                                <Card.Text> {facility.price} SR</Card.Text>
                            </div>
                            <div className="card-btns">
                                <Button variant="success">Edit</Button>
                                <Button variant="danger">Delete</Button>
                            </div>
                            {/* <Accordion>
                                <Accordion.Toggle as={Button} variant="link" eventKey="i*i">
                                Recent Appointement
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="i*i">
                                <Card.Body className="card-body">
                    
                    <div className="card-content">
                        <Card.Title>User name</Card.Title>
                        <Card.Text>
                            Contact info.
                    </Card.Text>
                    </div>
                    <div className="card-btns">
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>
                </Card.Body>
                                </Accordion.Collapse>
                            </Accordion> */}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    })

    return (
        <div className="ManageBrand">
            <h1>Reservation Management</h1>
            <hr />

            <h3>Recent Appointement:</h3>

            <Accordion>
                <Card>
                    <Card.Header as="h5">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Facility 1
                </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0" className="card-container">
                        
                        <Card.Body>
                            
                            <div className="card-content card-body">
                                <Card.Title>User name</Card.Title>
                                <Card.Text>
                                    Contact info.
                            </Card.Text>
                            </div>
                            <div className="card-btns">
                                <Button variant="success">Confirm</Button>
                                <Button variant="danger">Cancel</Button>
                            </div>
                                
                            
                            <div className="card-content">
                                <Card.Title>User name</Card.Title>
                                <Card.Text>
                                    Contact info.
                    </Card.Text>
                            </div>
                            <div className="card-btns">
                                <Button variant="success">Confirm</Button>
                                <Button variant="danger">Cancel</Button>
                            </div>

                            <div className="card-content">
                                <Card.Title>User name</Card.Title>
                                <Card.Text>
                                    Contact info.
                    </Card.Text>
                            </div>
                            <div className="card-btns">
                                <Button variant="success">Confirm</Button>
                                <Button variant="danger">Cancel</Button>
                            </div>

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            <Accordion>
                <Card>
                    <Card.Header as="h5">
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Facility Name
                </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1" className="card-container">
                        <Card.Body className="card-body">
                            <Card.Img variant="null" src="https://cf.bstatic.com/images/hotel/max1024x768/220/220546381.jpg" />
                            <div className="card-content">
                                <Card.Title>User name</Card.Title>
                                <Card.Text>
                                    Contact info.
                    </Card.Text>
                            </div>
                            <div className="card-btns">
                                <Button variant="success">Confirm</Button>
                                <Button variant="danger">Cancel</Button>
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>


            {/* <Card className="card-container">
                <Card.Header as="h5">Facility Name</Card.Header>
                <Card.Body className="card-body">
                    <Card.Img variant="null" src="https://cf.bstatic.com/images/hotel/max1024x768/220/220546381.jpg" />
                    <div className="card-content">
                        <Card.Title>User name</Card.Title>
                        <Card.Text>
                            Contact info.
                    </Card.Text>
                    </div>
                    <div className="card-btns">
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>
                </Card.Body>
            </Card> */}
            <br />
            <h3>Your Facilities:</h3>
            {allFacilities}
            {/* <Card className="card-container">
                <Card.Body className="card-body">
                    <Card.Img variant="null" src="https://cf.bstatic.com/images/hotel/max1024x768/220/220546381.jpg" />
                    <div className="card-content">
                        <Card.Title>Facility name</Card.Title>
                        <Card.Text> Description </Card.Text>
                        <Card.Text> Location </Card.Text>
                        <Card.Text> City </Card.Text>
                        <Card.Text> Price </Card.Text>
                    </div>
                    <div className="card-btns">
                        <Button variant="success">Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </div>
                </Card.Body>
            </Card> */}
            <br />
            <h3>Confirmed Reservations:</h3>
            <Card className="card-container">
                <Card.Header as="h5">Facility Name</Card.Header>
                <Card.Body className="card-body">
                    <Card.Img variant="null" src="https://cf.bstatic.com/images/hotel/max1024x768/220/220546381.jpg" />
                    <div className="card-content">
                        <Card.Title>User name</Card.Title>
                        <Card.Text> Appointement date </Card.Text>
                        <Card.Text> User phone </Card.Text>
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}
