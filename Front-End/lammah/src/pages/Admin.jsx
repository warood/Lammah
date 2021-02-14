import API_URL from '../apiConfig.js'
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";

const Toggle = styled.button`
    cursor: pointer;
    height: 50px;
    width: 50px;   
    border-radius: 50%;
    border: none;
    background-color: ${props => props.theme.titleColor};
    color: ${props => props.theme.pageBackground};
    &:focus {
        outline: none;
    }
    transition: all .5s ease;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.pageBackground};
  transition: all .5s ease;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: ${props => props.theme.titleColor};
    transition: all .5s ease;
`;

const TagLine = styled.span`
    color: ${props => props.theme.tagLineColor};
    font-size: 18px;
    transition: all .5s ease;
`;
export default function Admin(props) {
    function changeTheme() {
        if (props.theme === "light") {
            props.setTheme("dark");
        } else {
            props.setTheme("light");
        }
    };

    const icon = props.theme === "light" ? <HiMoon size={40} /> : <CgSun size={40} />;
    
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
              
                console.log("api admin users "+res.data)
                setUsers(res.data.msg)
            })

    }, [changeAfterDelete])

    const changeUserPermission = (e, user) =>{
       
        const isAdmin = user.isAdmin
       
        if(e==false&&isAdmin==true || e==true&&isAdmin==false){
            axios.put(`${API_URL}/api/admin/${user._id}`, {isAdmin: isAdmin})
            .then(res=>{
                console.log(res)
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
                    <TagLine className="container-title">{facility.name} </TagLine>

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
                  <TagLine  className="container-title"> Name: {user.name}, Email: {user.email}</TagLine>  

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
                    <TagLine className="container-title">{facility.name}</TagLine>
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
    //  else if (!props.auth.currentUser.isAdmin) {
    //     return (
    //         <>
    //             <div class="alert alert-warning" role="alert">
    //                 <strong>Oh !!!</strong> <Link to="/" class="alert-link">You dont have permission</Link>  to access this page.
    //             </div>
    //         </>
    //     )
    // } 
    else {
        return (
           
            <div className="dashboard-container ">
             <Page>
            <Container>
                <Toggle onClick={changeTheme}>
                    {icon}
                </Toggle>
               
            
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
                </Container>
        </Page>
            </div>

           
        )
    }

}
