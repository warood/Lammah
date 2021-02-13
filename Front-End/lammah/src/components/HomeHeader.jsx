import React from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default function HomeHeader(props) {

  return (
      <div className="header">

        <div className="container">
          {/* The Description in heart of the header */}
          <h1 style={{color: 'white'}}>DCRP....</h1>
        </div>
      </div>
  )
}
