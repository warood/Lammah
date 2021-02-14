import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import { Card, Button, Accordion, Collapse } from 'react-bootstrap';
import axios from "axios";

export default function ManageAppointments(props) {
    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/user/manage-brand/${userId}`)
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



    return (
        <div>
            <h3>Recent Appointement:</h3>

            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Facility Name
            </Button>
            <Collapse in={open}>
                <div>
                    <div>
                        User name
            <br />
            Contact info.
            </div>
                    <div>
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>

                    <div>
                        User name
            <br />
            Contact info.

        </div>
                    <div>
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>
                </div>
            </Collapse>

            <br /> <br />

            <Button
                onClick={() => setOpen1(!open1)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
            >
                Facility Name
            </Button>
            <Collapse in={open1}>
                <div>
                    <div>
                        User name
            <br />
            Contact info.
        </div>
                    <div>
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>

                    <div>
                        User name
            <br />
            Contact info.

        </div>
                    <div>
                        <Button variant="success">Confirm</Button>
                        <Button variant="danger">Cancel</Button>
                    </div>
                </div>
            </Collapse>

            <br />

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
        </div>
    )
}
