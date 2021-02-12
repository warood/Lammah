import React from "react";
import HomeHeader from '../components/HomeHeader'
import HomeSection from '../components/HomeSection'
export const Home = (props) => {

    return (
        <div className="Home">
            <HomeHeader loginCallback={props.loginCallback} auth={props.auth} />
            <HomeSection />
        </div>
    );
};
