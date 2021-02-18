import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';

export default function ShowConfirmApp(props) {

    const [allUsers, setAllUsers] = useState([]);
    const [allUsersA, setAllUsersA] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/user/users`)
            .then((res) => {
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

                                            <tr className="tb-row">
                                                <td>{props.facility.name}</td>
                                                <td>{findUser(app.user)[0].name}</td>
                                                <td>{findUser(app.user)[0].email} </td>
                                                <td>{findUser(app.user)[0].phone} </td>
                                                <td>{<Moment format="YYYY/MM/DD">{app.date}</Moment>} </td>
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
