import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, Form } from 'redux-form';
import { Button, Container, Row, Col } from 'reactstrap';
import _map from 'lodash/map';
import ReactJson from 'react-json-view';

import { WEEK_DAYS } from '../common/constants';
import { clearReservations, saveReservations } from '../actions/machine';
import SingleDayReservations from './SingleDayReservations';
import './Reservations.scss';
import moment from 'moment';

const validate = (values) => {
  const errorsArray = {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
  const errorsObject = {};
  const days = Object.entries(values);

  days.forEach((day) => {
    const sortReservations = day[1].sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    sortReservations.forEach((reservation, index) => {
      const errorObj = {};
      if (!reservation.start) {
        errorObj.start = 'must be present';
      }
      if (reservation.ownerId === 'Set owner') {
        errorObj.ownerId = 'Is required';
      }
      if (!reservation.end) {
        errorObj.end = 'must be present';
      }
      if (moment(reservation.start).isAfter(reservation.end)) {
        errorObj.end = 'End time should be after start time';
      }
      if (
        moment
          .duration(moment(reservation.end).diff(moment(reservation.start)))
          .asHours() > 2.5
      ) {
        errorObj.end = 'Reservation too long';
      }
      if (
        sortReservations[index + 1] &&
        moment(sortReservations[index + 1].start).isBetween(
          reservation.start,
          reservation.end
        )
      ) {
        errorsObject[day[0]] = {
          _error: 'Conflict between two reservations',
        };
      }
      if (
        sortReservations[index + 1] &&
        moment
          .duration(
            moment(sortReservations[index + 1].start).diff(
              moment(reservation.end)
            )
          )
          .asHours() < 0.24
      ) {
        errorsObject[day[0]] = {
          _error: 'Two reservations too close to each other',
        };
      }
      errorsArray[day[0]].push(errorObj);
    });
  });
  if (Object.keys(errorsObject).length > 0) {
    return errorsObject;
  } else {
    return errorsArray;
  }
};

const Reservations = ({
  clearReservations,
  handleSubmit,
  machine,
  users,
  saveReservations,
}) => (
  <Container className="reservations">
    <Form onSubmit={handleSubmit(saveReservations)}>
      <Row>
        <Col xs={8}>
          <h2>Reservations</h2>
          {_map(WEEK_DAYS, (day) => (
            <FieldArray
              users={users.users}
              key={`single-${day}`}
              component={SingleDayReservations}
              name={day}
            />
          ))}
          <Button color="primary" type="submit">
            Save data
          </Button>
        </Col>
        <Col xs={4}>
          <ReactJson src={machine} name="machineStoreState" />
          <Button
            onClick={clearReservations}
            color="warning"
            className="reservations__clear-btn"
          >
            Reset Data
          </Button>
        </Col>
      </Row>
    </Form>
  </Container>
);

const mapStateToProps = (state) => ({
  machine: state.machine,
  users: state.users,
  initialValues: state.machine,
});

const mapDispatchToProps = {
  clearReservations,
  saveReservations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'reservations',
    validate,
    enableReinitialize: true,
  })(Reservations)
);
