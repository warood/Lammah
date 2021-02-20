import API_URL from '../apiConfig.js'
import React from 'react'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";


export default function HomeHeader(props) {
  const { t } = useTranslation();
  return (
    <div className="header" style={{position:'relative'}}>
      <h1 style={{
        position: 'absolute',
        bottom: '3%', left: '5%',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}>{t("header_main_description")}</h1>
      <div className="container" style={{ position: 'relative', width: '100%' }}>
        {/* The Description in heart of the header */}

      </div>
    </div>
  )
}
