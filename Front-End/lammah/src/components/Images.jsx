import API_URL from '../apiConfig.js'
import React from 'react'

export default function Images(props) {
    return (
        <div>
    <img className="mainIMG" src={props.imageLink} alt="" srcset="" style={{height:"100px" , width:"100px"}}/>

                        {/* <p>{props.imageLink}</p> */}
        </div>
    )
}
