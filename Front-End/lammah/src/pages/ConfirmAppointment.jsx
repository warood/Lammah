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
        <div style={{
            marginTop: '5%'
        }}>

            <table
                style={{
                    width: "100%",
                    border: '1px solid #282C36',
                    borderCollapse: 'collapse',
                }}
            >
                <tr
                style={{
                    textAlign: 'center',
                    backgroundColor: '#282C36',
                    border: '1px solid #282C36',
                    color: 'white',
                }}>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }}>Facility</th>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }}>User</th>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }} >Email</th>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }} >Phone</th>
                     <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }} >Date</th>
                </tr>
                {allFacilities}

            </table>

        </div>
    )
}
