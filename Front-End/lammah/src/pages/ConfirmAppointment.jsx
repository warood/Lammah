import API_URL from '../apiConfig.js'

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
        <div className= "confirmed-res" style={{
            
        }}>

            <table >
                <tr className="tb-title">
                    <th>{t("facility")}</th>
                    <th>{t("user")}</th>
                    <th>{t("email")}</th>
                    <th>{t("phone")}</th>
                    <th>{t("date")}</th>
                </tr>
                {allFacilities}

            </table>

        </div>
    )
}
