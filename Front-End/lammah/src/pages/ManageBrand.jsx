import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import { Card, Button, Accordion, Collapse } from 'react-bootstrap';
import axios from "axios";
import { Link } from 'react-router-dom';
import ManageFacilities from './ManageFacilities';
import { useHistory } from "react-router-dom";
import ManageAppointments from './ManageAppointments';

export default function ManageBrand(props) {
    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);

    const [afterUpdateFacility, setAfterUpdateFacility] = useState(false);
    const history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/api/user/manage-brand/${userId}`)
            .then((res) => {
                // console.log(res)
                setFacilities(res.data.facilities)
                history.push('/manage-brand')
            })

    }, [afterUpdateFacility])

    //Render Manage-Brand Page
    return (
        <>
        {props.auth.isLoggedIn?
        <div className="ManageBrand">
            <h1>Reservation Management</h1>
            <hr />

            <ManageAppointments auth={props.auth}/>
            <br />


            <ManageFacilities auth={props.auth} afterUpdateFacility={afterUpdateFacility} setAfterUpdateFacility={setAfterUpdateFacility}/>


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
    :<>
    {
    history.push(`/`)
      }
    </>}
    </>
    )
}
