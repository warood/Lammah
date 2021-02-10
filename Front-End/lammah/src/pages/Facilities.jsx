import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Facilities(props) {
    const [facilities, setFacilities] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/facility/facilities')
            .then(res => {
                setFacilities(res.data.msg)                 //store all facilities in the variable (facilities)
            })
    }, [])

    //Map (facilities) 
    let allFacilities = facilities.map((facility, i) => {
        return (
            <Link key={i}
                onClick={() => props.setSelectFacility(facility)}
                to={`/facilities/${facility._id}`}
                style={{ textDecoration: "none" }}>
                <Card className="facility-card" >
                    <Card.Img variant="top" src={facility.imgages} />
                    <Card.Body>
                        <Card.Title>{facility.name}</Card.Title>
                        <Card.Text>
                            {facility.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{facility.price}</small>
                    </Card.Footer>
                </Card>
            </Link>
        )
    })

    //Render Facilities page
    return (
        <div className="Facilities">
            <Container className="container">

                <Row className="justify-content-md-center facility-row" >
                    <Col className="facility-col">

                        {allFacilities}
                        {/* <Card className="facility-card" >
                            <Card.Img variant="top" src="https://cf.bstatic.com/images/hotel/max1024x768/235/235508291.jpg" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card className="facility-card">
                            <Card.Img variant="top" src="https://cf.bstatic.com/images/hotel/max1024x768/100/100399366.jpg" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a natural lead-in to additional content.{' '}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card className="facility-card">
                            <Card.Img variant="top" src="https://cf.bstatic.com/images/hotel/max1024x768/220/220546381.jpg" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This card has even longer content than the first to
                                    show that equal height action.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card className="facility-card">
                            <Card.Img variant="top" src="https://cf.bstatic.com/images/hotel/max1024x768/235/235508291.jpg" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card className="facility-card">
                            <Card.Img variant="top" src="https://cf.bstatic.com/images/hotel/max1024x768/100/100399366.jpg" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a natural lead-in to additional content.{' '}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card className="facility-card">
                            <Card.Img variant="top" src="https://cf.bstatic.com/images/hotel/max1024x768/220/220546381.jpg" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This card has even longer content than the first to
                                    show that equal height action.
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card> */}

                    </Col>
                </Row>

            </Container>
        </div>
    )
}
