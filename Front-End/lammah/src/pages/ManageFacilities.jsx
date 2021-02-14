import React, { useEffect, useState } from 'react';
import axios from "axios";
import ManageOneFacility from './ManageOneFacility';

export default function ManageFacilities(props) {

    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/manage-brand/${userId}`)
            .then((res) => {
                // console.log(res)
                setFacilities(res.data.facilities)
            })
    }, [])


    //Get all facilities for user
    const allFacilities = facilities.map((facility, i) => {
        return (
            <ManageOneFacility key={i} facility={facility} auth={props.auth} afterUpdateFacility={props.afterUpdateFacility} setAfterUpdateFacility={props.setAfterUpdateFacility}/>
        )
    })

    return (
        <div>
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
        </div>
    )
}
