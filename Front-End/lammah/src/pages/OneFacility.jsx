import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Map, GoogleApiWrapper } from 'google-maps-react';



function OneFacility(props) {

  const [loadingDate, setLoadingDate] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [Facility, setFacility] = useState({});
  const [selectFacility, setSelectFacility] = useState(props.selectFacility);
  const [apointment, setApointment] = useState({})
  const [userId, setUserId] = useState(props.auth.currentUser._id)


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
          //let facility = res.data.find((ele) => ele._id == id);
          setSelectFacility(res.data.facility);
          setFacility(res.data.facility._id);

          const addDate = res.data.facility.appointment.map((ele) => {

            return new Date(ele.date);

          })
          setDateOfAllApointment(addDate)

        })
    }

  }, []);


  const onChange = date => {
    setDate(date)
    setApointment({ date: date, facility: selectFacility, status: "waiting", userId: userId })
  };

  //booking function 
  const onsubmit = () => {



    //console.log('newAppointment',apointment)

    axios.post("http://localhost:5000/api/appointment/new-appointment", apointment)
      .then((res) => {
        //console.log(res)
        // window.location.reload()
      })
      .catch((err) => console.log(err));

    //to close the modal after book
    setShow(false);
  }
 const loction = "https://www.google.com.sa/maps/place/Legend+Tower,+%D8%B7%D8%B1%D9%8A%D9%82+%D8%A7%D9%84%D9%85%D9%84%D9%83+%D9%81%D9%87%D8%AF%D8%8C+%D8%A7%D9%84%D8%B9%D9%84%D9%8A%D8%A7%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+12313%E2%80%AD/@24.6937266,46.6827579,17z/data=!3m1!4b1!4m5!3m4!1s0x3e2f0339f942ede5:0xc55a00fdf29f39d1!8m2!3d24.6937217!4d46.6805692"

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

          <Col col-md-6>
            <img className="mainIMG" width="100%" src={images} alt="" srcset="" />
          </Col>


          {/* facility details */}
          <Col col-md-3>
            <h1> name: {name} </h1>
            <p>type: {type} </p>
            <p> descreption: {description} </p>
            <p>City: {city}</p>
            <p>location:<a href="#"> {location}</a></p>
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
              <Modal.Body>

                <Calendar onChange={onChange} value={date} minDate={new Date()}
                  tileDisabled={({ date, view }) =>
                    (view === 'month') && // Block day tiles only
                    dateOfAllApointment.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )}
                />
                <p>  {date.toString()} </p>


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
        </Row>
      </Container>

      <Map
          // google={this.props.google}
          zoom={8}
          style={{mapStyles}}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />


    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'TOKEN HERE'
})(OneFacility);
