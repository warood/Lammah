import React from 'react';
import ShowConfirmApp from './ShowConfirmApp';
import { useTranslation } from "react-i18next";

export default function ConfirmAppointment(props) {

    //For Translation
    const { t } = useTranslation();

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
                        
                    }}>{t("facility")}</th>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }}>{t("user")}</th>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }} >{t("email")}</th>
                    <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }} >{t("phone")}</th>
                     <th
                    style={{
                        border: '1px solid #282C36',
                        
                    }} >{t("date")}</th>
                </tr>
                {allFacilities}

            </table>

        </div>
    )
}
