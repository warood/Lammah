import React, { useEffect, useState } from 'react';
import axios from "axios";
import ManageOneAppointments from './ManageOneAppointments';

export default function ManageAppointments(props) {
    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/manage-brand/${userId}`)
            .then((res) => {
                console.log(res)
                setFacilities(res.data.facilities)
                
            })
    }, [])

    //Get all facilities belong to user
    const allFacilities = facilities.map((facility, i)=>{
        return (
            <ManageOneAppointments key={i} facility={facility} auth={props.auth} afterUpdateFacility={props.afterUpdateFacility} setAfterUpdateFacility={props.setAfterUpdateFacility}
            />
        )
        
    })


    return (
        <div>
            <h3>Recent Appointement:</h3>
            {allFacilities}
        </div>
    )
}
