import { Card, Button } from 'react-bootstrap';
import React, {  useEffect} from "react";
import { useHistory } from "react-router-dom";
export default function ManageBrand(props) {
    const history = useHistory();
    useEffect(() => {


    }, [])

    return (
        <>
        {props.auth.isLoggedIn?
        <div className="ManageBrand">
            <h1>Reservation Management</h1>
            <hr />

            <h3>Recent Appointement:</h3>
            <Card className="card-container">
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
            </Card>

            <Card className="card-container">
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
            </Card>

            <h3>Your Facilities:</h3>
            <Card className="card-container">
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
            </Card>

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
