import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ManageFacilities from './ManageFacilities';
import { useHistory } from "react-router-dom";
import ManageAppointments from './ManageAppointments';
import ConfirmAppointment from './ConfirmAppointment';
import { Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

export default function ManageBrand(props) {
    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);
    const [afterUpdateFacility, setAfterUpdateFacility] = useState(false);
    const [key, setKey] = useState('home');
    const [IdOfAppointment, setIdOfAppointment] = useState("");

    //For Translation
    const { t } = useTranslation();

    const history = useHistory();

    useEffect(() => {
        axios.get(`${API_URL}/api/user/manage-brand/${userId}`)
            .then((res) => {
                // console.log(res)
                setFacilities(res.data.facilities)
                history.push('/manage-brand')
            })

    }, [])


    //Render Manage-Brand Page
    return (
        <>
            {props.auth.isLoggedIn ?
                <div className="ManageBrand">
                    <h1>{t("my_requests")}</h1>
                    <hr />
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        style={{
                            backgroundColor: 'white',
                        }}
                    >
                        <Tab eventKey="home" title={t("recent_appointement")}
                            style={{
                                color: 'white',
                                textDecoration: 'none',

                            }}
                        >

                            <ManageAppointments 
                            auth={props.auth}
                            setIdOfAppointment={setIdOfAppointment}
                            IdOfAppointment={IdOfAppointment}
                             />

                        </Tab>
                        <Tab eventKey="profile" title={t("your_facilities")}>
                            <ManageFacilities auth={props.auth} afterUpdateFacility={afterUpdateFacility} setAfterUpdateFacility={setAfterUpdateFacility} />
                            <br />
                        </Tab>
                        <Tab eventKey="contact" title={t("confirmed_reservations")} >
                            <ConfirmAppointment auth={props.auth} facilities={facilities} />
                        </Tab>
                    </Tabs>


                </div>
                : <>
                    {
                        history.push(`/`)
                    }
                </>}
        </>
    )
}