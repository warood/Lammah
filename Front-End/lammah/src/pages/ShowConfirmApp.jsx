import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';

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
        <>

            {props.facility.appointment.slice(0).reverse().map((app, i) => {
                return (
                        <>
                        <>

                            {allUsersA &&
                                <>
                                    {(app.status == "confirmed") ?

                                            <tr
                                            style={{
                                                textAlign: 'center'
                                            }}>
                                                <td
                                                style={{
                                                    border: '1px solid black',
                                                    paddingLeft: '10px'
                                                }}>{props.facility.name}</td>
                                                <td
                                                style={{
                                                    border: '1px solid black',
                                                    paddingLeft: '10px'
                                                }}>{findUser(app.user)[0].name}</td>
                                                <td
                                                style={{
                                                    border: '1px solid black',
                                                    paddingLeft: '10px'
                                                }}>{findUser(app.user)[0].email} </td>
                                                <td
                                                style={{
                                                    border: '1px solid black',
                                                    paddingLeft: '10px'
                                                }}>{findUser(app.user)[0].phone} </td>
                                                <td
                                                style={{
                                                    border: '1px solid black',
                                                    paddingLeft: '10px'
                                                }}>{<Moment format="YYYY/MM/DD">{app.date}</Moment>} </td>
                                            </tr>
                                            : <></>}
                                    </>
                                }

                                        </>
                        </>
                    )
                })}




                        </>
    )
}
