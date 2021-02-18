import API_URL from '../apiConfig.js'
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom';

export default function Admin(props) {

    
    const [facilities, setFacilities] = useState([])
    const [users, setUsers] = useState([])
    const [changeAfterDelete, setChangeAfterDelete] = useState(false)

    useEffect(() => {
        

        /*     *****    GET ALL Facilities    *****      */
        axios.get(`${API_URL}/api/facility/facilities`)
            .then(res => {
                setFacilities(res.data.facilities) 
            })


        /*     *****    GET ALL USERS    *****      */
        axios.get(`${API_URL}/api/admin/users`)
            .then(res => {
              
                // console.log("api admin users "+res.data)
                setUsers(res.data.msg)
            })

    }, [changeAfterDelete])

    const changeUserPermission = (e, user) =>{
       
        const isAdmin = user.isAdmin
       
        if(e==false&&isAdmin==true || e==true&&isAdmin==false){
            axios.put(`${API_URL}/api/admin/${user._id}`, {isAdmin: isAdmin})
            .then(res=>{
                // console.log(res)
            })
        }
    }

    

     /*    *****    CONFIRM Facility    *****       */
     const confirmFacility = (facility) => {
       
        const facilityId = facility._id;
     
        axios.put(`${API_URL}/api/admin/${facilityId}/status`)
            .then(data => {
               
                setChangeAfterDelete(!changeAfterDelete)
            })
    }


    /*    *****    DELETE Facility    *****       */
    const deleteFacility = (facility) => {
       
        const facilityId = facility._id;
        axios.delete(`${API_URL}/api/admin/${facilityId}/deleteFacility`)
            .then(data => {
                // console.log(data)
                setChangeAfterDelete(!changeAfterDelete)
            })
    }
    /*    *****    DELETE USER    *****       */
    const deleteUser = (user) => {
       
        const userId = user._id;
        axios.delete(`${API_URL}/api/admin/${userId}/deleteuser`)
            .then(data => {
                // console.log(data)
                setChangeAfterDelete(!changeAfterDelete)
            })
    }


    

    /*    *****    MAP ALL Facilities    *****       */
    const allFacilities = facilities.map(facility => {

        return (
            <>
                <div className='content-container'>
                    <img
                        src={facility.images[0]}
                        alt=""
                    />
                    <h5 className="container-title">{facility.name}</h5>

                    <p className="admin-delete-btn" onClick={() => deleteFacility(facility)}>X</p>
                </div>
            </>
        )
    })
    /*    *****    MAP ALL USERS    *****       */
    const allUsers = users.map(user => {

        return (
            <>
                <div className='content-container'>
                    <img
                        src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                        alt=""
                    />
                    <h5 className="container-title">Name: {user.name}, Email: {user.email}, </h5> 

                    <p style={{ marginTop: '12px', float: 'left', marginRight:'10px', fontSize:'18px' }}>Admin: </p>
                    
                    <BootstrapSwitchButton
                        checked={user.isAdmin}
                        onlabel='Yes'
                        offlabel='NO'
                        onChange={(e)=>changeUserPermission(e,user)}
                    />

                    <p className="admin-delete-btn" onClick={() => deleteUser(user)}>X</p>
                </div>
            </>
        )
    })
    /*    *****    MAP ALL NEW  ADDED FACILITIES     *****       */


    let newAdd = facilities.filter(function (facility) { 
        return facility.status == 0; 
    }).map(function (facility) { 
        return (
            <>
                <div className='content-container'>
                    <img
                        src={facility.images[0]}
                        alt=""
                    />
                    <h5 className="container-title">{facility.name}</h5>
                    <p className="admin-confirm-btn" onClick={() => confirmFacility(facility)}>&#x2714;</p>
                    <p className="admin-delete-btn" onClick={() => deleteFacility(facility)}>X</p>
                </div>
            </>
        ) 
    }) 
    /*    *****    RENDER ADMIN PAGE    *****       */

    if (!props.auth.isLoggedIn) {
        return (
            <>
                <div class="alert alert-danger" role="alert">
                    <strong>Oh !!!</strong> <Link to="/login" class="alert-link">You have to login first</Link> and try submitting again.
                </div>
            </>
        )
    }
     else if (!props.auth.currentUser.isAdmin) {
        return (
            <>
                <div class="alert alert-warning" role="alert">
                    <strong>Oh !!!</strong> <Link to="/" class="alert-link">You dont have permission</Link>  to access this page.
                </div>
            </>
        )
    } 
    else {
        return (
            <div className="dashboard-container ">
            
                <h1>Facilities</h1>
                <div className='admin-container'>
                    {allFacilities}
                </div> <br />
                <h1>Users</h1>
                <div className='admin-container'>
                    {allUsers}
                </div>
                <h1>Confirm addition of facility</h1>
                <div className='admin-container'>
                         {newAdd}
                </div>
                
            </div>
        )
    }
}