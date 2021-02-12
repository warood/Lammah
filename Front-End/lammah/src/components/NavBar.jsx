import React from 'react'
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <div className="NavBar">
            {/* Brand Logo */}
            <div className="logo">LAMMAH</div>

            {/* The Menu */}
            <div className="menu">
                <Link to="/" className="menu-element"
                 >HOME</Link>
                 
                <Link to="/facilities" className="menu-element">FACILITIES</Link>

                <Link to="/manage-brand" className="menu-element">BRAND</Link>  

                <Link to="/new-facility" className="menu-element">NEW FACILITY</Link>  
            </div>
            
        </div>
    )
}
