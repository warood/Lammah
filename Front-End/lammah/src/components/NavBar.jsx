import React from 'react'
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <div className="NavBar">
            {/* Brand Logo */}
            <Link to="/" className="logo menu-element">LAMMAH</Link>

            {/* The Menu */}
            <div className="menu">
                 
                <Link to="/facilities" className="menu-element">FACILITIES</Link>

                <Link to="/manage-brand" className="menu-element">BRAND</Link>  

                <Link to="/new-facility" className="menu-element">NEW FACILITY</Link>  
            </div>
            
        </div>
    )
}
