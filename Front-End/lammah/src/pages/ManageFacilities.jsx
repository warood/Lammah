import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ManageOneFacility from './ManageOneFacility';

export default function ManageFacilities(props) {

    const userId = props.auth.currentUser._id;
    const [facilities, setFacilities] = useState([]);
    const [afterUpdateFacility, setAfterUpdateFacility] = useState(false);
    const [afterDeleteFacility, setAfterDeleteFacility] = useState(false);

    useEffect(() => {

        axios.get(`${API_URL}/api/user/manage-brand/${userId}`)
            .then((res) => {
                // console.log(res)
                setFacilities(res.data.facilities)
            })
    }, [afterUpdateFacility, afterDeleteFacility])

    //Get all facilities for user
    const allFacilities = facilities.map((facility, i) => {
        return (
            <ManageOneFacility key={i} facility={facility}
                auth={props.auth} afterUpdateFacility={afterUpdateFacility}
                setAfterUpdateFacility={setAfterUpdateFacility}
                afterDeleteFacility={afterDeleteFacility}
                setAfterDeleteFacility={setAfterDeleteFacility} />
        )
    })

    return (
        <div className="your-facilities">
            {allFacilities}
        </div>
    )
}
