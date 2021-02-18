import React from 'react';
import { useTranslation } from "react-i18next";

export default function HomeSection() {

    //For Translation
    const { t } = useTranslation();

    return (
        <div className="section">

            {/* ========================================= */}
            {/* 1st section "Top Facilities" 1st Row*/}
            {/* ========================================= */}
            <div className="top-facilities">
                <div className="tf-title">
                    <h1>{t("top_facilities")}</h1>
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
                    <img src="https://q-xx.bstatic.com/images/hotel/max1024x768/265/265080438.jpg" />
                </div>
                <div className="item2">
                    <img src="https://mostaql.hsoubcdn.com/uploads/thumbnails/621911/5f83610450284/1.jpg" />
                </div><div className="item3">
                    <img src="https://cf.bstatic.com/images/hotel/max1024x768/236/236605809.jpg" />
                </div><div className="item4">
                    <img src="https://cf.bstatic.com/images/hotel/max1024x768/257/257562657.jpg" />
                </div>
            </div>
            {/* ========================================= */}

            
        </div>
    )
}