import API_URL from '../apiConfig.js'
import React from "react";
import { Row, Form, Col, Button, Container, Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import Image from '../components/Images'


var address = {}

function Map() {

    //const myLocation = "https://goo.gl/maps/JZS6aSpaY2hLbGdq7"
    const getLat = 25.57043310909312;
    const getLen = 46.5060904037667;

    // function handleMarkerClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);}
    var latNew
    var lngNew

    function onClick(address) {
        //const { latLng } = coord;
        latNew = address.latLng.lat();
        lngNew = address.latLng.lng();
        address = address
        localStorage.setItem("address", JSON.stringify({ lat: address.latLng.lat(), lng: address.latLng.lng() }))
        console.log(address.latLng.lat(), address.latLng.lng())
    }

    return (<GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: getLat, lng: getLen }}
        onClick={onClick}
    >
      
      <Marker position={{ lat: latNew, lng: lngNew }} />          
        

    </GoogleMap>
    );


}

const WrappedMap = withScriptjs(withGoogleMap(Map));


const validationSchema = Yup.object({
    name: Yup.string().required(" Facility name is required "),
    city: Yup.string().required("You must choose one "),
    type: Yup.string().required("You must choose one "),
    price: Yup.number().required("Facility price is required "),
})

export default function NewFacility(props) {

    const [address, setaddress] = useState({});

    //for upload array of images 
    var arrayImages = [];

    const [array, setArray] = useState([])



    const [updateLink, setUpdateLink] = useState([])
    const [image, setImages] = useState([]);

    //.......................

    //     const onChangeImage = (e) => {
    //         if(e.target.value !="" && e.target.value.includes("http")){
    //         arrayImages.push(e.target.value);
    //         console.log(e.target.value);
    //         console.log("array of image" , arrayImages);
    //         }
    //         // to clear input field after push link in array
    //         e.target.value = ""
    //     };
    //     console.log("from map" , updateLink)
    //    const allImages = arrayImages.map(ele=> {

    //         return (<Image imageLink={ele}/>);

    //         })
    //................//




    const userId = props.auth.currentUser._id;
    const history = useHistory();
    const [updateFacilityImg, setUpdateFacilityImg] = useState("");


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
                console.log(res)
                history.push("/facilities");
                alert("Wait for our confirmation to add your facility.Thank You !!");
            })
            .catch((err) => console.log(err));
    }



    const uploadImageHundler = (e) => {
        e.preventDefault();
        console.log(e.target.files[0])
        var format = new FormData()
        format.append("file", e.target.files[0])
        format.append('upload_preset', 'lammah')
        axios.post("https://api.cloudinary.com/v1_1/dwyky6yt6/image/upload", format)
            .then(data => {
                console.log("fffff", data.data.url)
                setUpdateFacilityImg(data.data.url)
                arrayImages = [...arrayImages, data.data.url]
                console.log(arrayImages)
                setArray([...array, data.data.url])
                console.log(array)
                console.log(data)
                // setUpdateFacilityImg(data.data.url)
            })


    }


    //Render NewFacility page
    return (
        <>

            <div className="NewFacility">
                <Container className="justify-content-center" className=" pt-5" style={{
                    height: '1200px',
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    padding: "10% 10% 1050px 10%",
                    margin: '50px auto 400px auto',
                    maxWidth: '700px'
                }}>
                    <Col>
                        <Formik
                            initialValues={{ name: "", description: convertedContent, city: "", price: "", type: "", userId: userId }}
                            validationSchema={validationSchema}
                            onSubmit={values => onSubmit({ ...values, location: JSON.parse(localStorage.getItem("address")), images: array, description: convertedContent })}
                        >
                            <Form as={FormikForm} className="form">

                                <Form.Group as={Row} controlId="formPlaintextName">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold", fontSize: "25px", textAlign: 'center' }} sm="2">
                                        Facility Information :
                                    </Form.Label>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextName">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold", fontSize: "25px", textAlign: 'center' }} sm="2">
                                        Facility Information :
                                    </Form.Label>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formPlaintextName">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                        Name
                                     </Form.Label>
                                    <Form.Control as={Field}
                                        placeholder="Facility Name" name="name" type="text" />
                                </Form.Group>

                                <ErrorMessage name="name" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />
                                <Form.Group as={Row} controlId="formPlaintextName" >
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                        Images
                                    </Form.Label>
                                    <Form.Control type="file" multiple name="images" onChange={uploadImageHundler} />
                                    <img src={updateFacilityImg} height='100px' width='100px' alt="" />
                                    <Form.Control as={Field} placeholder="www.image.com" name="images" type="text" style={{ marginTop: '5%' }} />
                                </Form.Group>

                                {/* <h1>{allImages}</h1> */}




                                <Form.Group as={Row} controlId="formPlaintextNameLocation">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                        Location
                                </Form.Label>
                                    <Form.Control as={Field} placeholder="Add Location Link" name="location" type="text" />
                                </Form.Group>
                                <div style={{ height: "100vw", width: "100vh" }}>
                                    <WrappedMap
                                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `400px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}

                                    />
                                </div>
                                <Form.Group as={Row} controlId="formPlaintextCity">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold", minWidth: '100%' }} sm="2">
                                        City
                                    </Form.Label>
                                    <Field size="mm" as="select" name="city">
                                        <option>Choose City</option>
                                        <option>Riyadh</option>
                                        <option>Jeddah</option>
                                        <option>Dammam</option>
                                    </Field>
                                </Form.Group>

                                <ErrorMessage name="city" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />

                                <Form.Group as={Row} controlId="formPlaintextType">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold", minWidth: '100%' }} sm="2">
                                        Type
                                    </Form.Label>
                                    <Field as="select" name="type">
                                        <option>Choose one</option>
                                        <option>Chalet</option>
                                        <option>Camp</option>
                                    </Field>
                                </Form.Group>

                                <ErrorMessage name="type" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />

                                <Form.Group as={Row} controlId="formPlaintextPrice">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">
                                        Price
                                    </Form.Label>
                                    <Form.Control as={Field} placeholder="SR" name="price" type="text" />
                                </Form.Group>

                                <ErrorMessage name="price" render={(msg) => <Alert variant={"danger"}> {msg} </Alert>} />

                                <Form.Group as={Row} controlId="ControlDesciption">
                                    <Form.Label style={{ fontFamily: "serif", fontWeight: "bold" }} sm="2">Desciption</Form.Label>
                                    <Editor as={Field} name="description"
                                        editorState={editorState}
                                        onEditorStateChange={handleEditorChange}
                                        style={{ minWidth: '100%', maxHeight: '500px' }}
                                    />

                                    {/* <Field as="textarea" cols={70} rows={10} name="description"
                                style={{ minWidth: '100%'}} /> */}
                                </Form.Group>
                                <Row>
                                    <Button style={{
                                        fontFamily: "serif",
                                        margin: "160px auto 50px auto",

                                    }} variant="secondary" type="submit">
                                        Submite
                            </Button>
                                </Row>
                            </Form>
                        </Formik>

                    </Col>
                </Container>
            </div>
        </>
    );
}