import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row  } from 'react-bootstrap';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { ArrowRight, EyeFill } from 'react-bootstrap-icons';
import { Radio } from 'react-bootstrap';


export default function Facilities(props) {
    const [facilities, setFacilities] = useState([])
    const [Radiocity, setRadioCity] = useState("");
    let term = props.search;
 

    const Radiocomponent = ({ value, setGender }) => ( 
        <div onChange={setGender.bind(this)}>
          <input type="radio" value="MALE" name="gender" defaultChecked={value ==="MALE"} /> 
          <input type="radio" value="FEMALE" name="gender" defaultChecked={value ==="FEMALE"}/> 
        </div>
      );
    useEffect(() => {
        axios.get(`${API_URL}/api/facility/facilities`)
            .then(res => {
                setFacilities(res.data.facilities)
            })
    }, [])

    

//Map (facilities) 

    
    let allFacilities = facilities.map((facility, i) => {

        if (facility.status == 1) {
            return (
                <Link key={i}
                    onClick={() => props.setSelectFacility(facility)}
                    to={`/facilities/${facility._id}`}
                    style={{ textDecoration: "none" }}>
                    <Card className="facility-card" >
                        <Card.Img variant="top"
                            style={{
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: '50% 50%',

                            }}
                            src={facility.images} />

                        <Card.Title
                            style={{
                                position: 'absolute',
                                bottom: '20%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                maxWidth: '70%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '1.3em',
                                maxHeight: '50px',
                                overflow: 'hidden',

                            }}>{facility.name}</Card.Title>
                        <Card.Text

                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            {facility.city}
                        </Card.Text>


                        <small
                            style={{
                                position: 'absolute',
                                bottom: '3%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                backgroundColor: 'rgba(255, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '1.5em',

                            }}>{facility.price} SR</small>

                        <Card.Text

                            style={{
                                position: 'absolute',
                                top: '2%', left: '0',
                                color: 'white',
                                padding: '0 1% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            <Rating readOnly value={facility.stars} />
                        </Card.Text>

                        <Card.Text

                            style={{
                                position: 'absolute',
                                top: '12%', left: '0',
                                color: 'white',
                                padding: '0 1% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            <span /><EyeFill color="white" size={20} /> {facility.views}
                        </Card.Text>

                    </Card>
                </Link>
            )
        }
    })
    


    if(Radiocity != "" && term != ""){
        let cities = facilities.filter(facility => facility.city.toLowerCase().includes(Radiocity.toLowerCase()) )


        let cityWithTerm = cities.filter(facility => facility.name.toLowerCase().includes(term.toLowerCase()) )
         allFacilities = cityWithTerm.map((facility, i) => {
    
            
        if (facility.status == 1) {
            return (
                <Link key={i}
                    onClick={() => props.setSelectFacility(facility)}
                    to={`/facilities/${facility._id}`}
                    style={{ textDecoration: "none" }}>
                    <Card className="facility-card" >
                        <Card.Img variant="top"
                            style={{
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: '50% 50%',

                            }}
                            src={facility.images} />

                        <Card.Title
                            style={{
                                position: 'absolute',
                                bottom: '20%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                maxWidth: '70%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '1.3em',
                                maxHeight: '50px',
                                overflow: 'hidden',

                            }}>{facility.name}</Card.Title>
                        <Card.Text

                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            {facility.city}
                        </Card.Text>


                        <small
                            style={{
                                position: 'absolute',
                                bottom: '3%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                backgroundColor: 'rgba(255, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '1.5em',

                            }}>{facility.price} SR</small>

                        <Card.Text

                            style={{
                                position: 'absolute',
                                top: '2%', left: '0',
                                color: 'white',
                                padding: '0 1% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            <Rating readOnly value={facility.stars} />
                        </Card.Text>

                        <Card.Text

                            style={{
                                position: 'absolute',
                                top: '12%', left: '0',
                                color: 'white',
                                padding: '0 1% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            <span /><EyeFill color="white" size={20} /> {facility.views}
                        </Card.Text>

                    </Card>
                </Link>
            )
        }
        })
    
        }
    

    if(Radiocity != ""){
    const city = facilities.filter(facility => facility.city.toLowerCase().includes(Radiocity.toLowerCase()));
     allFacilities = city.map((facility, i) => {

        if (facility.status == 1) {
            return (
                <Link key={i}
                    onClick={() => props.setSelectFacility(facility)}
                    to={`/facilities/${facility._id}`}
                    style={{ textDecoration: "none" }}>
                    <Card className="facility-card" >
                        <Card.Img variant="top"
                            style={{
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: '50% 50%',

                            }}
                            src={facility.images} />

                        <Card.Title
                            style={{
                                position: 'absolute',
                                bottom: '20%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                width: '70%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '1.3em',
                                maxHeight: '50px',
                                overflow: 'hidden',

                            }}>{facility.name}</Card.Title>
                        <Card.Text

                            style={{
                                position: 'absolute',
                                bottom: '10%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '0.9em',
                            }}
                        >

                            {facility.city}
                        </Card.Text>


                        <small
                            style={{
                                position: 'absolute',
                                bottom: '3%',
                                color: 'white',
                                padding: '0 5% 0 5%',
                                backgroundColor: 'rgba(255, 0, 0, 0.623)',
                                fontWeight: 'bold',
                                fontSize: '1.5em',

                            }}>{facility.price} SR</small>

                    </Card>
                </Link>
            )
        }
    })

    }

    if (term !== ""){
        const result = facilities.filter(facility => facility.name.toLowerCase().includes(term.toLowerCase()) ||
        facility.city.toLowerCase().includes(term.toLowerCase()) || facility.type.toLowerCase().includes(term.toLowerCase())
        || facility.description.toLowerCase().includes(term.toLowerCase()));
         allFacilities = result.map((facility, i) => {


            if (facility.status == 1) {
                return (
                    <Link key={i}
                        onClick={() => props.setSelectFacility(facility)}
                        to={`/facilities/${facility._id}`}
                        style={{ textDecoration: "none" }}>
                        <Card className="facility-card" >
                            <Card.Img variant="top"
                                style={{
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: '50% 50%',
    
                                }}
                                src={facility.images} />
    
                            <Card.Title
                                style={{
                                    position: 'absolute',
                                    bottom: '20%',
                                    color: 'white',
                                    padding: '0 5% 0 5%',
                                    maxWidth: '70%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                    fontWeight: 'bold',
                                    fontSize: '1.3em',
                                    maxHeight: '50px',
                                    overflow: 'hidden',
    
                                }}>{facility.name}</Card.Title>
                            <Card.Text
    
                                style={{
                                    position: 'absolute',
                                    bottom: '10%',
                                    color: 'white',
                                    padding: '0 5% 0 5%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                }}
                            >
    
                                {facility.city}
                            </Card.Text>
    
    
                            <small
                                style={{
                                    position: 'absolute',
                                    bottom: '3%',
                                    color: 'white',
                                    padding: '0 5% 0 5%',
                                    backgroundColor: 'rgba(255, 0, 0, 0.623)',
                                    fontWeight: 'bold',
                                    fontSize: '1.5em',
    
                                }}>{facility.price} SR</small>
    
                            <Card.Text
    
                                style={{
                                    position: 'absolute',
                                    top: '2%', left: '0',
                                    color: 'white',
                                    padding: '0 1% 0 5%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                }}
                            >
    
                                <Rating readOnly value={facility.stars} />
                            </Card.Text>
    
                            <Card.Text
    
                                style={{
                                    position: 'absolute',
                                    top: '12%', left: '0',
                                    color: 'white',
                                    padding: '0 1% 0 5%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.623)',
                                    fontWeight: 'bold',
                                    fontSize: '0.9em',
                                }}
                            >
    
                                <span /><EyeFill color="white" size={20} /> {facility.views}
                            </Card.Text>
    
                        </Card>
                    </Link>
                )
            }
        })
    


    }





    //Render Facilities page
    return (
         <div className="Facilities">
       
       
         <input type="radio" id="jeddah" name="city" value="jeddah" onChange={(e)=>{setRadioCity(e.target.value)}}/>
             <label for="jeddah">Jeddah</label> 
            <input type="radio" id="dammam" name="city" value="dammam" onChange={(e)=>{setRadioCity(e.target.value)}}/>
           <label for="dammam">Dammam</label> 
           <input type="radio" id="riyadh" name="city" value="riyadh" onChange={(e)=>{setRadioCity(e.target.value)}}/>
            <label for="riyadh">Riyadh</label> 
            <input type="radio" id="all" name="city" value="" onChange={(e)=>{setRadioCity(e.target.value)}}/>
            <label for="all">All</label> 
                    
            <Container className="container">
            
                <Row className="justify-content-md-center facility-row" >
                    <Col className="facility-col"
                        style={{ justifyContent: 'center' }}>
                       
                           {allFacilities}
                      
                      

                    </Col>
                </Row>

            </Container>

        </div>
    )
}