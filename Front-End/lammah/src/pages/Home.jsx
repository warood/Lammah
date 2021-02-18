
import API_URL from '../apiConfig.js'
import React from "react";
import HomeHeader from '../components/HomeHeader'
import HomeSection from '../components/HomeSection'
import { useEffect, useState } from 'react';


export const Home = (props) => {

    return (





        <div className="Home">
            <HomeHeader loginCallback={props.loginCallback} auth={props.auth}/>
            <HomeSection />

        </div>

    );
};
