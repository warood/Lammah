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
        return {
            __html: DOMPurify.sanitize(html, {ALLOWED_TAGS: ['b']})
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
    const [updateFacility, setUpdateFacility] = useState({ name: props.facility.name, description: props.facility.description, images: props.facility.images, price: props.facility.price });



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

            <Row className="fc-card"
                style={{
                    background: `url('${props.facility.images[0]}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}>

                {/* remove it */}
                {/* <div style={{
                    // maxWidth: '40%',
                    // backgroundColor: 'red'
                }}>

                    {/* <img src={`${props.facility.images}`}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: '50% 50%',
                            height: '100%',
                        }} /> }

                </div> */}


            <div className="fc-layer">
                <div className="content">
                    <p>{t("name")}: {props.facility.name}</p>
                            <p style={{
                                maxWidth: '100%'
                            }}>{t("desciption")}: </p> <span dangerouslySetInnerHTML={createMarkup(props.facility.description)} ></span>
                            <p>{t("requests")}: {props.facility.appointment.length}</p>
                            <p>{t("cost")}: {props.facility.price} {t("sr")}</p>

                        </div>
                        <div className="btn-edit-fc" variant="success" onClick={handleShowEdit}>
                            {t("edit")}</div>

                        <p className="btn-delete-fc" onClick={handleShow}>X</p>
                    </div>
            </Row>

                {/* remove it */}
                {/* <Row
                style={{
                    backgroundColor: 'yellow',
                    display: 'flex',
                    flexDirection: 'column',

                }}>

            </Row> */}

                {/* Edit Modal */}
                <Modal show={showEdit} onHide={handleCloseEdit}
                    class="edit-fc-model" style= {{color: 'black'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t("edit")} {t("facility")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {t("name")}:  <input type="text" name="name" defaultValue={props.facility.name} onChange={(e) => onChangeFacility(e)} style={{ width: '70%' }} /> <br /> <br />
                        {t("desciption")}: <textarea rows="8" cols="80" type="text" name="description" defaultValue={props.facility.description} onChange={(e) => onChangeFacility(e)}
                            style={{ width: '100%' }} /> <br /> <br />
                        {t("location")}: <input type="text" name="location"  onChange={(e) => onChangeFacility(e)}
                            style={{ width: '50%' }} /> <br /> <br />
                        {t("price")}: <input type="text" name="price" defaultValue={props.facility.price} onChange={(e) => onChangeFacility(e)}
                            style={{ width: '20%' }} /> <br /> <br />
                        {t("photos")}: <input type="text" name="images" defaultValue={props.facility.images} onChange={(e) => onChangeFacility(e)}
                            style={{ width: '70%' }} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            {t("close")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
                            editFacility(props.facility._id);
                            handleCloseEdit();
                        }}>
                            {t("edit")}
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Modal */}
                <Modal show={show} onHide={handleClose} style= {{color: 'black'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t("confirm_delete")}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{t("are_you_sure_delete_this")}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            {t("close")}
                        </Button>
                        <Button variant="secondary" onClick={() => {
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
