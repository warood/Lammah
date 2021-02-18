import API_URL from '../apiConfig.js'
import React from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default function HomeHeader(props) {

  return (
    <div className="header" style={{position:'relative'}}>
      <h1 style={{
        position: 'absolute',
        bottom: '3%', left: '5%',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>Lammah gives you the opportunity to access more than 100 chalets and camps around Saudi Arabia in an easy way to get comfortable meetings with your families and your friends</h1>
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        {/* The Description in heart of the header */}

      </div>
    </div>
  )
}
