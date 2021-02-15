import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Facilities(props) {
    const [facilities, setFacilities] = useState([])

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

    //Render Facilities page
    return (
        <div className="Facilities">
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
