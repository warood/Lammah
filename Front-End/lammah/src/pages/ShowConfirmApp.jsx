import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

export default function ShowConfirmApp(props) {

    const [allUsers, setAllUsers] = useState([]);
    const [allUsersA, setAllUsersA] = useState(false);

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

    return (
        <div>
            <Card className="card-container">
                
                {props.facility.appointment.map((app, i) => {
                    return (
                        <div className="card-body">
                            <div className="card-content">

                                {allUsersA &&
                                    <>
                                        {(app.status == "confirmed") ?
                                            <>

                                                <Card.Header as="h5">{props.facility.name} </Card.Header>
                                                <Card.Body> 
                                                    <Card.Img variant="null" src={props.facility.images} />
                                                    <Card.Title>User name {findUser(app.user)[0].name}</Card.Title> 
                                                    <Card.Text> Email: {findUser(app.user)[0].email} </Card.Text>
                                                    <Card.Text> User phone {findUser(app.user)[0].phone} </Card.Text>
                                                </Card.Body>
                                            </>
                                            : <></>}
                                    </>
                                }

                            </div>
                        </div>
                    )
                })}




            </Card>
        </div>
    )
}
