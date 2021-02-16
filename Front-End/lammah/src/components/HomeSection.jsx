import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HomeSection() {

    const [dataLoading , setDataLoading] =useState (false)

    const [image, setImage] = useState({})

    useEffect(() => {

        axios.get(`${API_URL}/api/facility/facilities`)
            .then(res => {
                console.log(res)

                setImage(res.data)
                setDataLoading(true)
            })

    }, [])



    return (
        <>
        { dataLoading ? <>
            
            
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
                    Because we Know how social life is important, so Lammah gives you 
                    the opportunity to access more than 100 chalets and camps around 
                    Kingdom of Saudi Arabia in an easy way to get comfortable meetings 
                    with your families and your friends .
                        </p>

                </div>
            </div>
            {/* ========================================= */}


            {/* ========================================= */}
            {/* 1st section "Top Facilities" 2st Row */}
            {/* ========================================= */}
            <div className="tf-items">
                <div className="item1">
                    <img src={image.facilities[0].images} />
                </div>
                <div className="item2">
                    <img src={image.facilities[0].images} />
                </div><div className="item3">
                    <img src={image.facilities[0].images} />
                </div><div className="item4">
                    <img src={image.facilities[0].images} />
                </div>
            </div>
            {/* ========================================= */}


        </div>
        </>
        :
        <></>}
        </>
    )
}