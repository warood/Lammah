import API_URL from '../apiConfig.js'
import React, { useEffect, useState } from 'react';
import { Card, Button, Accordion, Modal, Tabs, Row, Tab } from 'react-bootstrap';
import axios from "axios";
import { useHistory } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useTranslation } from "react-i18next";

export default function ManageOneFacility(props) {

    const history = useHistory();

    //For Translation
    const { t } = useTranslation();

      //To display text as stored with styling
    const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
     }
    }

    //Facility Edit button
    const [showEdit, setShowEdit] = useState(false);
    function handleCloseEdit() {
        setShowEdit(false);
    }
    const handleShowEdit = () => setShowEdit(true);

    //Facility Delete button
    const [show, setShow] = useState(false);
    function handleClose() {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    //Update Facility 
    const [updateFacility, setUpdateFacility] = useState({ name: props.facility.name, description: props.facility.description, images: props.facility.images, location: props.facility.location, price: props.facility.price });



    //Take values of update facility
    const onChangeFacility = (e) => {
        const { name, value } = e.target;
        setUpdateFacility({
            ...updateFacility,
            [name]: value,
        });
    };

    //Edit Facility
    const editFacility = (facilityId) => {
        axios.put(`${API_URL}/api/facility/${facilityId}/edit`, updateFacility)
            .then(data => {
                props.setAfterUpdateFacility(!props.afterUpdateFacility)
                history.push('/manage-brand')
            })
    }

    //Delete Facility
    const deleteFacility = (facilityId) => {

        axios.delete(`${API_URL}/api/facility/${facilityId}`)
            .then(data => {
                props.setAfterDeleteFacility(!props.afterDeleteFacility)
                history.push('/manage-brand')
            })
    }



    return (

        <div>

            <Row style={{
                display: 'flex',
                border: '1px solid gray',
                flexWrap: 'nowrap',
                maxWidth: '800px',
                margin: '0 0 15px 0 ',
                background: `url('${props.facility.images}')`,
                backgroundSize: 'cover',
                objectPosition: '10% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                justifyContent: 'flex-end',
                minWidth: '800px',
                flexWrap: 'wrap',

            }}>

                <div style={{
                    maxWidth: '40%'
                }}>

                    {/* <img src={`${props.facility.images}`}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: '50% 50%',
                            height: '100%',
                        }} /> */}

                </div>


                <div style={{
                    position: 'relative',
                    maxWidth: '80%',
                    minWidth: '80%',
                }}>
                    <div style={{
                       
                        backgroundColor: 'rgba(40, 44, 54, 0.9)',
                        color: 'white',
                        padding: '3%',
                    }}>
                        <p>{t("name")}: {props.facility.name}</p>
                        <p style={{
                            maxWidth: '100%'
                        }}>{t("desciption")}: </p> <span dangerouslySetInnerHTML={createMarkup(props.facility.description)} ></span>
                        <p>{t("location")}: {props.facility.location}</p>
                        <p>{t("requests")}: {props.facility.appointment.length}</p>
                        <p>{t("cost")}: {props.facility.price} {t("sr")}</p>

                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            right: '0',
                            bottom: '5%',
                            maxWidth: '150px',
                            minWidth: '100px',
                            borderBottom: '1px solid white',
                            borderTop: '1px solid white',
                            color: 'red',
                            textAlign: 'center',
                            cursor: 'pointer',

                        }}
                        variant="success" onClick={handleShowEdit}>
                        {t("edit")}</div>
                    <p
                        style={{
                            position: 'absolute',
                            right: '1%', top: '2%',
                            color: 'red',
                            cursor: 'pointer',
                            border: '1px solid gray',
                            padding: '0 10px 0 10px'

                        }}
                        onClick={handleShow}>X</p>
                </div>
            </Row>
            <Row
                style={{
                    backgroundColor: 'yellow',
                    display: 'flex',
                    flexDirection: 'column',

                }}>

            </Row>

            {/* Edit Modal */}
            <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("edit")} {t( "facility")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t("name")}:  <input type="text" name="name" size="80" defaultValue={props.facility.name} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   {t("desciption")}: <textarea rows="8" cols="80" type="text" name="description" defaultValue={props.facility.description} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   {t("location")}: <input type="text" name="location" size="80" defaultValue={props.facility.location} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   {t("price")}: <input type="text" name="price" size="80" defaultValue={props.facility.price} onChange={(e) => onChangeFacility(e)} /> <br /> <br />
                                   {t("photos")}: <input type="text" size="80" name="images" defaultValue={props.facility.images} onChange={(e) => onChangeFacility(e)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        {t("close")}
                                    </Button>
                    <Button variant="primary" onClick={() => {
                        editFacility(props.facility._id);
                        handleCloseEdit();
                    }}>
                        {t("edit")}
                                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t("confirm_delete")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t("are_you_sure_delete_this")}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("close")}
                                </Button>
                    <Button variant="primary" onClick={() => {
                        deleteFacility(props.facility._id);
                        handleClose()
                    }}>
                        {t("delete")}
                                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
