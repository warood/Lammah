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
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit esse accusamus delectus reprehenderit asperiores, magnam accusantium sunt. Laboriosam provident, ullam error eveniet animi accusamus sit, corrupti ex ab officiis minima?</p>
                    <hr />
                    <Tabs className="tap"
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        
                    >
                        <Tab  className="tap" eventKey="home" title={t("recent_appointement")}>

                            <ManageAppointments 
                            auth={props.auth}
                            setIdOfAppointment={setIdOfAppointment}
                            IdOfAppointment={IdOfAppointment}
                             />

                        </Tab>
                        <Tab  className="tap" eventKey="profile" title={t("your_facilities")}>
                            <ManageFacilities auth={props.auth} afterUpdateFacility={afterUpdateFacility} setAfterUpdateFacility={setAfterUpdateFacility} />
                            <br />
                        </Tab>
                        <Tab  className="tap" eventKey="contact" title="Confirmed Reservations" >
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