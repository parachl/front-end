
import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import styles from './InputLabel.module.css';
import PropsTypes from 'prop-types';

export const InputLabel = ({ label, type, value, onChange }) => {

    return (
        <Form>
            <FormGroup>
                <Label className="form-group">{label} :</Label>
                <Input className="form-group" type={type} value={value} onChange={onChange} placeholder="with a placeholder" />
            </FormGroup>
        </Form>
    );
}

InputLabel.defaultProps = {
    label: "",
    type: "text",
    value: "",
    onChange: () => { },
}

InputLabel.propsTypes = {
    label: PropsTypes.string,
    type: PropsTypes.string,
    value: PropsTypes.string,
    onChange: PropsTypes.func,
}