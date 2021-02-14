import API_URL from '../apiConfig.js'
import React from "react";
import HomeHeader from '../components/HomeHeader'
import HomeSection from '../components/HomeSection'
import { useEffect, useState } from 'react';
import { Button } from '../components/button/ button';
export const Home = (props) => {
    const [theme, setTheme] = useState('dark');
    return (

        <div className={`App ${theme}`}>
      
      <Button label="Click Me" />
    
        <div className="Home">
            <HomeHeader loginCallback={props.loginCallback} auth={props.auth} />
            <HomeSection />
        </div>

        </div >
    );
};
