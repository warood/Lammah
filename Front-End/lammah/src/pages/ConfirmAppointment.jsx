import React from 'react';
import ShowConfirmApp from './ShowConfirmApp';

export default function ConfirmAppointment(props) {

    //Get all facilities belong to user
    const allFacilities = props.facilities.map((facility, i)=>{
        return (
            <ShowConfirmApp key={i} facility={facility} auth={props.auth} />
        )
    })

    return (
        <div>
            <h3>Confirmed Reservations:</h3>
            {allFacilities}
        </div>
    )
}
