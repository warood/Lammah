
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Row, Form } from "react-bootstrap";


export default function OneFacility(props) {
  const { id } = useParams();
  const [Facility, setFacility] = useState({});
//   const [selectFacility, setSelectFacility] = useState(props.selectFacility);

  const { name ,images , location, description , city , price ,type , appointment} = selectFacility;
  const userId = props.auth.currentUser;
  
  
  useEffect(() => {
    if (!name) {
      axios.get(`api/facility/facilities/?=${id}`)
      .then(res => {
        console.log(res.data.msg)
        // let facility = res.data.msg.find((ele) => ele._id == id);
        // setSelectProduct(facility);
      })
    }
      
  }, []);

//   const onChangeInput = ({ target: { name, value } }) => {
//     setProduct({ ...facility, [name]: value });
//   };

     
 
  

  
    
  return (
  
     
     <div>
      <Container className="mt-5 ">
        <Row style={{marginBottom: "500px"}}>
          <Col md="6">
            <img width="100%" src="https://pbs.twimg.com/media/C066sxKXEAAUV2t.jpg" alt="" srcset="" />
          </Col>
          <Col md="6">
            <h1>{name}</h1>
            <p> {description}</p>
            <h3
             style={{color: 'green'}}

             >${price}
             </h3>
            
          </Col>
        </Row>
      </Container>


    </div>
  );
}
