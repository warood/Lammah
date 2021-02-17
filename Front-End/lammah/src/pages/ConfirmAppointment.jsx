import React from 'react';
import ShowConfirmApp from './ShowConfirmApp';

export default function ConfirmAppointment(props) {

    //Get all facilities belong to user
    const allFacilities = props.facilities.map((facility, i) => {
        return (
            <ShowConfirmApp key={i} facility={facility} auth={props.auth} />
        )
    })

    return (
        <div className= "confirmed-res" style={{
            
        }}>

            <table >
                <tr className="tb-title">
                    <th>Facility</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                </tr>
                {allFacilities}

            </table>

        </div>
    )
}
