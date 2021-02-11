import React from 'react'
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <div className="NavBar">
            {/* Brand Logo */}
            <div className="logo">LAMMAH</div>

            {/* The Menu */}
            <div className="menu">
                <a as={Link} to="/">HOME</a>
                <a as={Link} to="/facilities">FACILITIES</a>  
            </div>
            
        </div>
    )
}
