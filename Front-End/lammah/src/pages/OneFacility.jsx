
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Form ,Modal} from "react-bootstrap";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function OneFacility(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
//   const { id } = useParams();
//  // const [Facility, setFacility] = useState({});
// //   const [selectFacility, setSelectFacility] = useState(props.selectFacility);

//   //const { name ,images , location, description , city , price ,type , appointment} = selectFacility;
//   const userId = props.auth.currentUser;
  const onChange = date =>{setDate(date)};
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//   useEffect(() => {
//    // if (!name) {
//       axios.get(`api/facility/facilities/?=${id}`)
//       .then(res => {
//         console.log(res.data.msg)
//         // let facility = res.data.msg.find((ele) => ele._id == id);
//         // setSelectProduct(facility);
//       })
//   //  }
      
//   }, []);

//   const onChangeInput = ({ target: { name, value } }) => {
//     setProduct({ ...facility, [name]: value });
//   };

     
 
  
let arrayOfImages = ["http://static.holdinn.net/uploadfiles/40/madakhil-camp-115683.jpg","https://www.visitsaudi.com/content/dam/no-dynamic-media-folder/manifest-newarticles-batch2/a-guide-to-al-ula/guide_to_al_ula_horiz_article_4.jpg" ,"https://sahary-al-ola-camp-villa.hotels-saudi-arabia.com/data/Photos/767x460/10098/1009837/1009837849.JPEG"]
  
    
  return (
  
     
     <div className="OneFacility" > 
      <Container className="mt-5 ">
        <Row style={{marginBottom: "500px"}}>
  


          {/* main image */}
    
          <Col md="6">
            <img className="mainIMG" width="100%" src="https://pbs.twimg.com/media/C066sxKXEAAUV2t.jpg" alt="" srcset="" />
          </Col>
          {/* facility details */}
          <Col md="6">
            <h1> name: </h1>
            <p>type: camp</p>
            <p> descreption: This unit for families and singles consists of a main council that can accommodate up to 20 people, an outdoor session for 10 people, an external extension that can accommodate 10 people, 2 toilets, a kitchen with an oven, and many facilities such as speakers, a wood stove, a projector, a grooming session, Two parts and the total area of ​​1000 m </p>
            <p>City: jeddah</p>
            <p>location:<a href="#"> check in google map</a></p>
            <p>Price: 500 SR</p>

     
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
          
       
        <Calendar onChange={onChange} value={date}/>
           
           <p>  {date.toString()} </p> 


        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
         </Button>
          
        </Modal.Footer>
      </Modal>

         
          </Col>

          
        </Row>
      </Container>


    </div>
  );
}
