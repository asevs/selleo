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
  const errorsArray = {};

  for (const key in values) {
    const dayErrorsArray = [];
    const conflictBetweenResevations = {};

    values[key].forEach((reservation, index) => {
      const reservationErrors = {};

      if (
        reservation.start &&
        reservation.end &&
        reservation.owner &&
        reservation.owner !== 'Set owner'
      ) {
        if (moment(reservation.start).isAfter(reservation.end)) {
          reservationErrors.end = 'End time should be after start time';
        }

        if (
          moment
            .duration(moment(reservation.end).diff(moment(reservation.start)))
            .asHours() > 2.5
        ) {
          reservationErrors.end = 'Reservation too long';
        }

        if (
          moment(reservation.start).isBetween(
            reservation.start,
            reservation.end
          )
        ) {
          errorsArray[key] = {
            _error: 'Conflict between two reservations',
          };
        }

        dayErrorsArray[index] = reservationErrors;
      } else {
        if (!reservation.start) {
          reservationErrors.start = 'must be present';
        }
        if (!reservation.end) {
          reservationErrors.end = 'must be present';
        }
        reservationErrors.owner = 'Is required';
        dayErrorsArray[index] = reservationErrors;
      }

      values[key].forEach((reserv, reservIndex) => {
        if (index !== reservIndex) {
          if (
            moment(reservation.start).isBetween(reserv.start, reserv.end) ||
            moment(reservation.end).isBetween(reserv.start, reserv.end)
          ) {
            conflictBetweenResevations._error =
              'Conflict between two reservations';
          }
          if (
            moment(reservation.start).isBetween(
              reserv.start,
              moment(reserv.end).add(14, 'minutes')
            )
          ) {
            conflictBetweenResevations._error =
              'Two reservations too close to each other';
          }
        }
      });
      if (conflictBetweenResevations._error) {
        errorsArray[key] = conflictBetweenResevations;
      } else {
        errorsArray[key] = dayErrorsArray;
      }
    });
  }
  return errorsArray;
};

const Reservations = ({
  clearReservations,
  handleSubmit,
  machine,
  users: { users },
  saveReservations,
}) => (
  <Container className="reservations">
    <Form onSubmit={handleSubmit(saveReservations)}>
      <Row>
        <Col xs={8}>
          <h2>Reservations</h2>
          {_map(WEEK_DAYS, (day) => (
            <FieldArray
              users={users}
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
