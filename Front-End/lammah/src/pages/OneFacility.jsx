import API_URL from '../apiConfig.js'
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"


function Map() {
  let [adress, setAdress] = useState({ lat: 25.095042882671507, lng: 46.12474465486534 })
  const myLocation = "https://goo.gl/maps/JZS6aSpaY2hLbGdq7"


  // useEffect(() => {
  //   const id = "602aa11355888512448627af"

  //   axios.get(`http://localhost:5000/api/facility/facilities/${id}`).then(data => {

  //     console.log(data.data.facility.location)

  //     setAdress(data.data.facility.location)

  //   })

  // }, [])


  console.log("here", adress.lat)
  return (<GoogleMap defaultZoom={12}
    defaultCenter={{ lat: adress.lat, lng: adress.lng }}
  >

    <Marker position={{ lat: adress.lat, lng: adress.lng }} />
  </GoogleMap>
  );

}


const WrappedMap = withScriptjs(withGoogleMap(Map));







export default function OneFacility(props) {

  const [loadingDate, setLoadingDate] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [Facility, setFacility] = useState({});
  const [selectFacility, setSelectFacility] = useState(props.selectFacility);
  const [apointment, setApointment] = useState({})
  // const [userId, setUserId] = useState(props.auth.currentUser._id)


  //apointment date for one facility
  const [dateOfAllApointment, setDateOfAllApointment] = useState([])


  const { name, images, location, description, city, price, type, appointment } = selectFacility;

  const handleClose = () => setShow(false);


  const handleShow = () => {

    setShow(true);
    // setApointment({ date: date, facility: selectFacility, status: "waiting", userId: userId })

    axios.get(`http://localhost:5000/api/facility/facilities/${id}`)
      .then(res => {
        //console.log(res)
        const addDate = res.data.facility.appointment.map((ele) => {

          return new Date(ele.date);
        })
        setDateOfAllApointment(addDate);

      })
  };


  useEffect(() => {

    if (!city) {
      axios.get(`http://localhost:5000/api/facility/facilities/${id}`)
        .then(res => {
         // let facility = res.data.find((ele) => ele._id == id);
         console.log(res.data.facility)
         setSelectFacility(res.data.facility);
          setFacility(res.data.facility._id);
          console.log("from axios" )

          const addDate = res.data.facility.appointment.map((ele) => {

            return new Date(ele.date);

          })
          setDateOfAllApointment(addDate)

        })
    }

  }, []);


  const onChange = date => {
    setDate(date)
    setApointment({ date: date, facility: selectFacility, status: "waiting", userId: props.auth.currentUser._id })
  };

  //booking function 
  const onsubmit = () => {
    //console.log('newAppointment',apointment)

    axios.post("http://localhost:5000/api/appointment/new-appointment", apointment)
      .then((res) => {
        //console.log(res)
      })
      .catch((err) => console.log(err));

    //to close the modal after book
    setShow(false);
  }

  let arrayOfImages = ["http://static.holdinn.net/uploadfiles/40/madakhil-camp-115683.jpg", "https://www.visitsaudi.com/content/dam/no-dynamic-media-folder/manifest-newarticles-batch2/a-guide-to-al-ula/guide_to_al_ula_horiz_article_4.jpg", "https://sahary-al-ola-camp-villa.hotels-saudi-arabia.com/data/Photos/767x460/10098/1009837/1009837849.JPEG"]
  const mapStyles = {
    width: '100%',
    height: '100%',
  };





  return (


    <div className="OneFacility" >
      <Container className="mt-5 ">
        <Row style={{ marginBottom: "500px" }}>

          <Col col-md-3>

            <Row><img className="smallIMG" src="https://pbs.twimg.com/media/C066sxKXEAAUV2t.jpg" alt="" srcset="" /></Row>
            <Row><img className="smallIMG" src="https://pbs.twimg.com/media/C066sxKXEAAUV2t.jpg" alt="" srcset="" /></Row>
            <Row><img className="smallIMG" src="https://pbs.twimg.com/media/C066sxKXEAAUV2t.jpg" alt="" srcset="" /></Row>
          </Col>

          {/* main image */}

          <Col col-md-6
            style={{
              minWidth: '300px',
              maxWidth: '500px',
              padding: '0',
              width: '100%'

            }}>
            <img className="mainIMG" src={images} alt="" srcset=""
              style={{
                width: '100%',
                marginBottom: '10%',
              }}
            />
          </Col>


          {/* facility details */}
          <Col col-md-3 style={{
            minWidth: '250px',
            maxWidth: '500px',
            padding: '0 2% 2% 2%',
            margin: '0 2% 2% 2%',
            width: '100%'

          }}>
            <h1> {name} </h1>
            <hr />
            <p>Faclity: {type} </p>

            <p>City: {city}</p>
            {/* <p>location:<a href="#"> {location}</a></p> */}
            <p>Price: {price} SR</p>


            <button onClick={handleShow}>Book</button>


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

                <Calendar onChange={onChange} value={date} minDate={new Date()}
                  tileDisabled={({ date, view }) =>
                    (view === 'month') && // Block day tiles only
                    dateOfAllApointment.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}

                />


              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onsubmit}>
                  Book
          </Button>

                <Button variant="secondary" onClick={handleClose}>
                  Close
         </Button>

              </Modal.Footer>
            </Modal>
          </Col>
          <div style={{ height: "100vw", width: "100vh" }}>

            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Row>


        <hr style={{
          marginTop: "100px",
          width: '100%'
        }} />


        <Row>
          <p style={{
            padding: '3%',
            width: '100%',
            maxWidth: '90%',
            overflow: 'hidden',
            wordWrap: "break-word",

          }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat nostrum autem adipisci similique, sed nihil corrupti labore nisi beatae perferendis dolor quisquam dolore vitae accusamus non omnis officiis unde! Quis.{description} </p>


        </Row>


      </Container>



    </div>
  );
}

