import API_URL from '../apiConfig.js'
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Form, Modal } from "react-bootstrap";
import OneComment from '../components/OneComment'
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import DOMPurify from 'dompurify';
import { useTranslation } from "react-i18next";

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import WrappedMap from '../components/GoooglMap'


import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// material-ui
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));


export default function OneFacility(props) {

  const [loadingDate, setLoadingDate] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const [Facility, setFacility] = useState({});
  const [selectFacility, setSelectFacility] = useState(props.selectFacility);
  const [apointment, setApointment] = useState({})
  const [rating, setRating] = useState("")
  const [commentChange, setCommentChange] = useState("")
  const [refreshPage, setRefreshPage] = useState(false)
  const [displayAllComments, setdisplayAllComments] = useState([])
  const [showOnerInfo, setShowOnerInfo] = useState(false);
  const [minImages, setMinImages] = useState([])
  const [showImage, setShowImage] = useState(false);

  //For Translation
  const { t } = useTranslation();
  const [mainimage, setMainImage] = useState("")

  //To display text as stored with styling
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  // material-ui
  const classes = useStyles();
  // const [userId, setUserId] = useState(props.auth.currentUser._id)

  //apointment date for one facility
  const [dateOfAllApointment, setDateOfAllApointment] = useState([])


  const { name, images, description, city, price, type, appointment } = selectFacility;


  const handleChange = (e) => {
    setRating(e.target.value)
  }

  const handleCommentChange = (e) => {
    setCommentChange(e.target.value)

  }

  const onSubmitRating = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/api/rating/${id}/new-rating`,
      { stars: rating, comment: commentChange, userId: props.auth.currentUser._id })
      .then(res => {
        // make comment areatext empty
        document.forms['rating-form'].reset()
        setRefreshPage(!refreshPage)

      })

  }
  const handleClose = () => setShow(false);


  const handleShow = () => {

    setShow(true);
    // setApointment({ date: date, facility: selectFacility, status: "waiting", userId: userId })

    axios.get(`${API_URL}/api/facility/facilities/${id}`)
      .then(res => {
        const addDate = res.data.facility.appointment.map((ele) => {

          return new Date(ele.date);
        })
        setDateOfAllApointment(addDate);

      })
  };



  useEffect(() => {
    // if (!city) {
    axios.get(`${API_URL}/api/facility/facilities/${id}`)
      .then(res => {
        //let facility = res.data.find((ele) => ele._id == id);
        // console.log(res)
        setSelectFacility(res.data.facility);
        setFacility(res.data.facility._id);
        setMainImage(res.data.facility.images[0]);
        setMinImages(res.data.facility.images)
        const addDate = res.data.facility.appointment.map((ele) => {
          return new Date(ele.date);
        })
        setDateOfAllApointment(addDate)
      })
    // }
    axios.get(`${API_URL}/api/rating/${id}/ratings`)
      .then(res => {
        setdisplayAllComments(res.data.ratings)
      })

    setShowImage(!showImage);
  }, [refreshPage], [showImage]);



  const onChange = date => {
    setDate(date)
    setApointment({ date: date, facility: selectFacility, status: "waiting", userId: props.auth.currentUser._id })
  };

  //booking function 
  const onSubmit = () => {



    //console.log('newAppointment',apointment)

    axios.post("http://localhost:5000/api/appointment/new-appointment", apointment)
      .then((res) => {
      })
      .catch((err) =>{} );

    //to close the modal after book
    setShow(false);
    setShowOnerInfo(true)

  }


  let arrayOfImages = ["http://static.holdinn.net/uploadfiles/40/madakhil-camp-115683.jpg", "https://www.visitsaudi.com/content/dam/no-dynamic-media-folder/manifest-newarticles-batch2/a-guide-to-al-ula/guide_to_al_ula_horiz_article_4.jpg", "https://sahary-al-ola-camp-villa.hotels-saudi-arabia.com/data/Photos/767x460/10098/1009837/1009837849.JPEG"]



  const allComments = displayAllComments.map((comment, i) => {
    return (
      <OneComment
        comment={comment} key={i}
      />
    )
  })

  let allFacilities = minImages.map((image, i) => {
    return (
      <Row><img className="smallIMG" src={image} alt="" srcset="" onClick={(e) => { setMainImage(e.target.src) }} /></Row>
    )
  })

  return (


    <div className="OneFacility" >
      <Container className="mt-5" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Row style={{ marginBottom: "50px" }}>

          <Col col-md-3 style={{ maxWidth: '80px' }}>
            {allFacilities}
          </Col>

          {/* main image */}

          <Col col-md-6 className="main-img-container"
            style={{
              minWidth: '300px',
              maxWidth: '500px',
              padding: '0',
              width: '100%',
            }}>



            <img className="mainIMG" src={mainimage} alt="" srcset=""
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
            <p>{t("facility")} : {type} </p>

            <p>{t("city")} : {city}</p>
            <p>{t("price")} : {price} {t("sr")}</p>


            <button onClick={handleShow}>{t("book")}</button>


            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              style= {{color: 'black'}}
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
                <Button variant="secondary" onClick={onSubmit}>
                  {t("book")}
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                  {t("close")}
                </Button>

              </Modal.Footer>
            </Modal>
            {(showOnerInfo) ?
              <>
                <div class="alert alert-success" role="alert" style={{marginTop: '30px'}}>
                  <h4 class="alert-heading">{t("if_you_want_to_contant_facility_owner")}</h4>
                  <p>{t("go_to_your_page_and_you_can_find_his_contact_information")}</p>
                  {/* <p>Name: {user.name}</p>
    <p class="mb-0">Phone: {user.phone}</p> */}
                </div>
              </> : <></>
            }

          </Col>

          <div style={{ height: "25vh", width: "100%", minWidth: '500px', }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `200px`, width: '60%', margin: 'auto' }} />}
              mapElement={<div style={{ height: `100%` }} />}

            /></div>

        </Row>
        <hr style={{
          marginTop: "0px",
          width: '100%'
        }} />
        <Row>

          <div className="preview" dangerouslySetInnerHTML={createMarkup(description)}
            style={{
              padding: '3%',
              width: '100%',
              maxWidth: '90%',
              overflow: 'hidden',
              wordWrap: "break-word",

            }}></div>

        </Row>
        <h1>{t("feedback")}</h1>
        <Row style={{
          margin: '50px 0 100px 0',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%'
        }}>
          {allComments}
        </Row>

        <Row style={{
          margin: '0 0 200px 0',
        }}>
          <form
            name="rating-form"
            style={{
              width: '100%',
              padding: '3%',
              boxShadow: ' 0 4px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 15px 0 rgba(0, 0, 0, 0.19)',
            }}>
            <label for="fname">{t("rating")}</label><br></br>
            <div className={classes.root}>
              <Rating name="size-medium" defaultValue={2} value={rating} onChange={handleChange} />
            </div>
            <label for="comment">{t("comment")}</label><br></br>
            <textarea
              name="comment"
              type="text"
              onChange={handleCommentChange}
              style={{
                width: '100%',
                minHeight: '200px'

              }} />
            <input
              s type="submit" value={t("submit")} onClick={(e) => onSubmitRating(e)} />
          </form>

        </Row>
      </Container>
      {/* <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        /> */}


    </div>
  );
}