import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Field } from 'redux-form';
import _capitalize from 'lodash/capitalize';
import TimePickerWrapper from './TimePickerWrapper';

const SingleDayReservations = ({ users, fields, meta: { error } }) => {
  return [
    <Row key="header">
      <Col>
        <h5>{_capitalize(fields.name)}</h5>
        <span className="reservations__error">{error}</span>
      </Col>
    </Row>,
    <Row key="entry">
      {fields.map((name, index) => (
        <Row key={`${name}-${index}`} className="reservations__single-entry">
          <Col xs={{ size: 3, offset: 1 }}>
            <Field name={`${name}.start`} component={TimePickerWrapper} />
          </Col>
          <Col xs={{ size: 3, offset: 1 }}>
            <Field name={`${name}.end`} component={TimePickerWrapper} />
          </Col>
          <Col xs={{ size: 3, offset: 5 }}>
            <Field name={`${name}.ownerId`} component="select">
              <option>{'Set owner'}</option>
              {users.map((user) => (
                <option value={user.id}>
                  {user.firstName + ' ' + user.lastName}
                </option>
              ))}
            </Field>
          </Col>
          <Col xs={{ size: 1, offset: 1 }}>
            <Button
              onClick={() => {
                fields.remove(index);
              }}
              color="danger"
              className="reservations__remove-btn"
            >
              Remove
            </Button>
          </Col>
        </Row>
      ))}
    </Row>,
    <Row key="footer">
      <Col xs={{ size: 3, offset: 6 }}>
        <Button
          onClick={() => {
            fields.push({ start: null, end: null, ownerId: null });
          }}
          color="warning"
          className="reservations__clear-btn"
        >
          + Add Entry
        </Button>
      </Col>
    </Row>,
  ];
};

export default SingleDayReservations;
