import React, { useState, useRef, useContext } from 'react';
import { Form, Col, FormGroup, Label, Input, Row, Button } from 'reactstrap';
import CustomModal from '../Modals/CustomModal';
import { useApolloClient } from 'react-apollo';
import { CHANGE_EMAIL_MUTATION } from 'constants/user';
import { AuthContext } from 'contexts/auth';
import useForm from '../../lib/useForm';

const ChangeEmail = ({ oldEmail }) => {
    const client = useApolloClient()
    const authContent = useContext(AuthContext)

    const { inputs, handleChange, resetForm } = useForm({
        email: oldEmail
      })

    const onSubmit = async (e) => {
        e.preventDefault()
        
        await client.mutate({
            mutation:CHANGE_EMAIL_MUTATION,
            awaitRefetchQueries: true,
            variables: {
                id: authContent.user.id,
                email: inputs.email
            }
        });

        window.location.reload(false);
    };

    return (
        <CustomModal header="change" size="sm" body={
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Label>New Email</Label>
                            <Input
                                placeholder="email"
                                type="email"
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        } onSave={onSubmit} />
    );
};

export default ChangeEmail;