import API_URL from '../apiConfig.js'
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function OneFacility(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [Facility, setFacility] = useState({});
  const [selectFacility, setSelectFacility] = useState(props.selectFacility);
  const [apointment, setApointment] = useState({})
  const [userId, setUserId] = useState(props.auth.currentUser._id)

  const { name, images, location, description, city, price, type, appointment } = selectFacility;

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setApointment({ date: date, facility: selectFacility, status: "waiting", userId: userId })
  };
  useEffect(() => {

    if (!city) {
      axios.get(`${API_URL}/api/facility/facilities/?=${id}`)
      .then(res => {
        console.log( "from one facility" + res.data);
         let facility = res.data.find((ele) => ele._id == id);
         setSelectFacility(Facility);
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

    axios.post(`${API_URL}/api/appointment/new-appointment`, apointment)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err));


    //to close the modal after book
    setShow(false);
  }






  let arrayOfImages = ["http://static.holdinn.net/uploadfiles/40/madakhil-camp-115683.jpg", "https://www.visitsaudi.com/content/dam/no-dynamic-media-folder/manifest-newarticles-batch2/a-guide-to-al-ula/guide_to_al_ula_horiz_article_4.jpg", "https://sahary-al-ola-camp-villa.hotels-saudi-arabia.com/data/Photos/767x460/10098/1009837/1009837849.JPEG"]


  return (


    <div className="OneFacility" >
      <Container 
      style={{ marginTop: '10%' ,marginBottom: "500px",}}
      >
        <Row>

          <Col col-md-3 style={{
            maxWidth: '100px',
            minWidth: '100px',
            marginBottom: '8%',
          }}>

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


                <Calendar onChange={onChange} value={date} />

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
        <hr style={{
          marginTop: "100px",
          width: '100%'
          }}/>
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
