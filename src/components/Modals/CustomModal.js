import React, { useState } from 'react';
import Error from '../../views/shared/ErrorMessage'
import Success from '../../views/shared/SuccessMessage'

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
} from 'reactstrap'

const CustomModal = (props) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <span>
            <Button variant="primary" className="mr-3 my-1 animation-on-hover" size={props.size} onClick={() => setModalShow(true)}>
                {props.header}
            </Button>
            <Modal
                isOpen={modalShow}
                backdrop={false}
                toggle={() => setModalShow(prev => !prev)}
            >
                <Row>
                    <Error error={props.error} />
                    <Success success={props.success} />
                </Row>
                <ModalHeader toggle={() => setModalShow(false)}>
                    
                    {props.header}
                </ModalHeader>
                <ModalBody>
                    {props.body}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={props.onSave}>Save</Button>
                    <Button color="secondary" onClick={() => setModalShow(false)}>Cancel</Button>
                </ModalFooter>

            </Modal>
        </span>
    );
};

export default CustomModal;