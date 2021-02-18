
import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { ArrowRight, EyeFill } from 'react-bootstrap-icons';
import { Radio } from 'react-bootstrap';
import { useTranslation } from "react-i18next";


export default function Facilities(props) {
    const [facilities, setFacilities] = useState([])
    const [Radiocity, setRadioCity] = useState("");
    let term = props.search;

    //For Translation
    const { t } = useTranslation();


    const Radiocomponent = ({ value, setGender }) => (
        <div onChange={setGender.bind(this)}>
            <input type="radio" value="MALE" name="gender" defaultChecked={value === "MALE"} />
            <input type="radio" value="FEMALE" name="gender" defaultChecked={value === "FEMALE"} />
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
                        <Card.Img className="card-img" variant="top"
                            src={facility.images[0]} />

                        <Card.Title className="fc-name"
                        >{facility.name}</Card.Title>

                        <Card.Text className="fc-city">
                            {facility.city}
                        </Card.Text>


                        <small className="fc-price"
                        >{facility.price}{t("sr")}</small>

                        <Card.Text className="fc-stars">

                            <Rating className="fc-rating" readOnly value={facility.stars} />
                        </Card.Text>

                        <Card.Text className="fc-views"
                        >

                            <span /><EyeFill color="white" size={15} /> {facility.views}
                        </Card.Text>

                    </Card>
                </Link>
            )
        }
    })



    if (Radiocity != "" && term != "") {
        let cities = facilities.filter(facility => facility.city.toLowerCase().includes(Radiocity.toLowerCase()))


        let cityWithTerm = cities.filter(facility => facility.name.toLowerCase().includes(term.toLowerCase()))
        allFacilities = cityWithTerm.map((facility, i) => {


            if (facility.status == 1) {
                return (
                    <Link key={i}
                        onClick={() => props.setSelectFacility(facility)}
                        to={`/facilities/${facility._id}`}
                        style={{ textDecoration: "none" }}>
                        <Card className="facility-card" >
                            <Card.Img className="card-img" variant="top"
                                src={facility.images[0]} />

                            <Card.Title className="fc-name"
                            >{facility.name}</Card.Title>

                            <Card.Text className="fc-city">
                                {facility.city}
                            </Card.Text>


                            <small className="fc-price"
                            >{facility.price}{t("sr")}</small>

                            <Card.Text className="fc-stars">

                                <Rating className="fc-rating" readOnly value={facility.stars} />
                            </Card.Text>

                            <Card.Text className="fc-views"
                            >

                                <span /><EyeFill color="white" size={15} /> {facility.views}
                            </Card.Text>

                        </Card>
                    </Link>
                )
            }
        })

    }


    if (Radiocity != "") {
        const city = facilities.filter(facility => facility.city.toLowerCase().includes(Radiocity.toLowerCase()));
        allFacilities = city.map((facility, i) => {

            if (facility.status == 1) {
                return (
                    <Link key={i}
                        onClick={() => props.setSelectFacility(facility)}
                        to={`/facilities/${facility._id}`}
                        style={{ textDecoration: "none" }}>
                        <Card className="facility-card" >
                            <Card.Img className="card-img" variant="top"
                                src={facility.images[0]} />

                            <Card.Title className="fc-name"
                            >{facility.name}</Card.Title>

                            <Card.Text className="fc-city">
                                {facility.city}
                            </Card.Text>


                            <small className="fc-price"
                            >{facility.price} {t("sr")}</small>

                            <Card.Text className="fc-stars">

                                <Rating className="fc-rating" readOnly value={facility.stars} />
                            </Card.Text>

                            <Card.Text className="fc-views"
                            >

                                <span /><EyeFill color="white" size={15} /> {facility.views}
                            </Card.Text>

                        </Card>
                    </Link>
                )
            }
        })

    }

    if (term !== "") {
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
                            <Card.Img className="card-img" variant="top"
                                src={facility.images[0]} />

                            <Card.Title className="fc-name"
                            >{facility.name}</Card.Title>

                            <Card.Text className="fc-city">
                                {facility.city}
                            </Card.Text>


                            <small className="fc-price"
                            >{facility.price}{t("sr")}</small>

                            <Card.Text className="fc-stars">

                                <Rating className="fc-rating" readOnly value={facility.stars} />
                            </Card.Text>

                            <Card.Text className="fc-views"
                            >

                                <span /><EyeFill color="white" size={15} /> {facility.views}
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


            <div style={{
                width: '100%',
                backgroundColor: 'orange',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <input style={{ margin: '0 0 0 0' }} type="radio" id="jeddah" name="city" value="jeddah" onChange={(e) => { setRadioCity(e.target.value) }} />
                <label style={{ margin: '0 0 0 1%' }} for="jeddah">{t("jeddah")}</label>
                <input style={{ margin: '0 0 0 2%' }} type="radio" id="dammam" name="city" value="dammam" onChange={(e) => { setRadioCity(e.target.value) }} />
                <label style={{ margin: '0 0 0 1%' }} for="dammam">{t("dammam")}</label>
                <input style={{ margin: '0 0 0 2%' }} type="radio" id="riyadh" name="city" value="riyadh" onChange={(e) => { setRadioCity(e.target.value) }} />
                <label style={{ margin: '0 0 0 1%' }} for="riyadh">{t("riyadh")}</label>
                <input style={{ margin: '0 0 0 2%' }} type="radio" id="all" name="city" value="" onChange={(e) => { setRadioCity(e.target.value) }} />
                <label style={{ margin: '0 0 0 1%' }} for="all">{t("all")}</label>
            </div>
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