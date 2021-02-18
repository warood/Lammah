import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ManageOneAppointments from './ManageOneAppointments';

export default function ManageAppointments(props) {
    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);
    const [afterCancel, setAfterCancel] = useState(false);
    const [afterConfirm, setAfterConfirm] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/user/manage-brand/${userId}`)
            .then((res) => {
                // console.log(res)
                setFacilities(res.data.facilities)

            })
    }, [afterCancel, afterConfirm])

    //Get all facilities belong to user
    const allFacilities = facilities.map((facility, i) => {
        return (
            <ManageOneAppointments key={i} facility={facility} auth={props.auth}
                afterCancel={afterCancel}
                setAfterCancel={setAfterCancel}
                afterConfirm={afterConfirm}
                setAfterConfirm={setAfterConfirm}
                setIdOfAppointment={props.setIdOfAppointment}
                IdOfAppointment={props.IdOfAppointment}
            />
        )

    })

    return (
        <div className="main-lists">
            {allFacilities}
        </div>
    )
}
