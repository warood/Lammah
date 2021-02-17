import API_URL from '../apiConfig.js'
import React from "react";
import { Row, Form, Col, Button, Container, Alert , Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { useTranslation } from "react-i18next";



export default function NewFacility(props) {

        //For Translation
        const { t } = useTranslation();

    const validationSchema = Yup.object({
        name: Yup.string().required(t("facility_name_is_required")),
        city: Yup.string().required(t("you_must_choose_one")),
        type: Yup.string().required(t("you_must_choose_one")),
        price: Yup.number().required(t("facility_price_is_required")),
    })
    const userId = props.auth.currentUser._id;
    const history = useHistory();
    const [updateFacilityImg, setUpdateFacilityImg] = useState("");
    const [show, setShow] = useState(false);
    //For Text Editor
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
      const  [convertedContent, setConvertedContent] = useState(null);
      const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
      }
      const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
      }

    const onSubmit = (values) => {
        console.log(values)
        axios
            .post(`${API_URL}/api/facility/new-facility`, values)
            .then((res) => {
                
               
              
              
            })

           
            .catch((err) => console.log(err));
          
           
    }

    const handleClose = () => {setShow(false);
    
        history.push("/facilities");
    }


    const handleShow = () => {
  
      setShow(true);
    }

    const uploadImageHundler = (e) => {
        console.log(e.target.files[0])
        var format = new FormData()
        format.append("file", e.target.files[0])
        format.append('upload_preset', 'lammah')
        axios.post("https://api.cloudinary.com/v1_1/dwyky6yt6/image/upload", format)
            .then(data => {
                console.log(data)
                setUpdateFacilityImg(data.data.url)
            })
    }


  

    //Render NewFacility page
    return (
        <>
        <div className="NewFacility">
            <Container className="justify-content-center" className=" pt-5" style={{
                  height: '1500px',
                  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  padding: "10% 10% 1050px 10%",
                  margin: '50px auto 20% auto',
                  maxWidth: '700px'
                  }}>
                <Col>
                    <Formik
                        initialValues={{ name: "", description: convertedContent, location: "", city: "", price: "", type: "", images:updateFacilityImg, userId: userId }}
                        validationSchema={validationSchema}
                        onSubmit={values => onSubmit({...values, images: updateFacilityImg, description: convertedContent})}
                    >
                        <Form as={FormikForm} className="form" >

                            <Form.Group as={Row} controlId="formPlaintextName">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold", fontSize: "25px"  , textAlign: 'center'}} sm="2">
                                    {t("facility_info")} :
                            </Form.Label>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextName">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                    {t("name")}
                            </Form.Label>
                                <Form.Control as={Field}
                                placeholder="Facility Name" name="name" type="text" />
                            </Form.Group>

                            <ErrorMessage name="name" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />

                            <Form.Group as={Row} controlId="formPlaintextName" >
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                    {t("images")}
                                </Form.Label>
                                <Form.Control type="file" multiple name="images" onChange={uploadImageHundler} />
                                <img src={updateFacilityImg} height='100px' width='100px' alt=""/>
                                <Form.Control as={Field} placeholder="www.image.com" name="images" type="text" style={{ marginTop: '5%'}}/>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextNameLocation">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                    Location
                                </Form.Label>
                                <Form.Control as={Field} placeholder="Add Location Link" name="location" type="text" />
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextCity">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" , minWidth: '100%'}} sm="2">
                                    {t("city")} 
                                </Form.Label>
                                <Field size="mm" as="select" name="city">
                                    <option value="">{t("choose_city")}</option>
                                    <option value="Riyadh">{t("riyadh")}</option>
                                    <option value="Jeddah">{t("jeddah")}</option>
                                    <option value="Dammam">{t("dammam")}</option>
                                </Field>
                            </Form.Group>

                            <ErrorMessage name="city" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />

                            <Form.Group as={Row} controlId="formPlaintextType">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold"  , minWidth: '100%'}} sm="2">
                                    {t("type")}
                            </Form.Label>
                                <Field as="select" name="type">
                                    <option value="">{t("choose_one")}</option>
                                    <option value="Chalet">{t("chalet")}</option>
                                    <option value="Camp">{t("camp")}</option>
                                </Field>
                            </Form.Group>

                            <ErrorMessage name="type" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />

                            <Form.Group as={Row} controlId="formPlaintextPrice">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                    {t("price")}
                            </Form.Label>
                                <Form.Control as={Field} placeholder="SR" name="price" type="text" />
                            </Form.Group>

                            <ErrorMessage name="price" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />
                                
                            <Form.Group as={Row} controlId="ControlDesciption">
                                <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="1">{t("desciption")}</Form.Label>
                                <Editor as={Field} name="description"
                                        editorState={editorState}
                                        onEditorStateChange={handleEditorChange}
                                        style={{ minWidth: '100%', maxHeight: '500px'}}
                                />
                                 
                                {/* <Field as="textarea" cols={70} rows={10} name="description"
                                style={{ minWidth: '100%'}} /> */}
                            </Form.Group>
                            <Row>
                            <Button style={{
                                 fontFamily: "serif",
                                  margin: "160px auto 50px auto" ,

                                  }} variant="secondary" type="submit" onClick={handleShow}>
                                  {t("submit")}
                            </Button>
                           </Row>


                           <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', margin: '5%' }}>


                <p>  Please wiat for our confirmation to add your facility, Thank you!</p>
            </Modal.Body>
            <Modal.Footer>
              
              <Button variant="secondary" onClick={handleClose}>
                Close
         </Button>

            </Modal.Footer>
          </Modal>



                        </Form>
                    </Formik>
                </Col>
            </Container>
            </div>
        </>
    )
}
