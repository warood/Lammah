import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ManageFacilities from './ManageFacilities';
import { useHistory } from "react-router-dom";
import ManageAppointments from './ManageAppointments';
import ConfirmAppointment from './ConfirmAppointment';

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
 
            <ManageFacilities auth={props.auth} afterUpdateFacility={afterUpdateFacility} setAfterUpdateFacility={setAfterUpdateFacility}/>
            <br />

            
            <ConfirmAppointment auth={props.auth} facilities={facilities}/>

        </div>
    :<>
    {
    history.push(`/`)
      }
    </>}
    </>
    )
}
