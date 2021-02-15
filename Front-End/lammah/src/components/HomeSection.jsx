import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeSection() {

    const [image , setImage] = useState({})

    useEffect(() => {

        axios.get("http://localhost:5000/api/facility/facilities")
        .then(res=>{
            console.log(res.data.facilities[0].images)

            setImage(res.data.facilities)
            
        })
       
    }, [])



    return (
        <div className="section">

            {/* ========================================= */}
            {/* 1st section "Top Facilities" 1st Row*/}
            {/* ========================================= */}
            <div className="top-facilities">
                <div className="tf-title">
                    <h1>TOP FACILITIES</h1>
                    <h2
                        style={{ color: 'gray', fontSize: '1em' }}
                    >THIS Month</h2>
                </div>
                <div className="tf-description">
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum
                        beatae possimus saepe sequi accusantium, repellat, iusto similique
                        blanditiis asperiores, doloremque qui. Deleniti obcaecati, quos
                        amet aperiam hic doloribus laboriosam recusandae.
                        </p>

                </div>
            </div>
            {/* ========================================= */}

   
            {/* ========================================= */}
            {/* 1st section "Top Facilities" 2st Row */}
            {/* ========================================= */}         
            <div className="tf-items">
                <div className="item1">
                    <img src={image[0].images} />
                </div>
                <div className="item2">
                    <img src={image[1].images} />
                </div><div className="item3">
                    <img src={image[0].images} />
                </div><div className="item4">
                    <img src={image[2].images} />
                </div>
            </div>
            {/* ========================================= */}

            
        </div>
    )
}
