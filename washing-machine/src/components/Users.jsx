import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form, Field } from 'redux-form';
import { addUser, removeUser } from '../actions/user';
import { Button, Container, Row, Col } from 'reactstrap';

const Users = ({ handleSubmit, users, addUser, removeUser }) => {
  return (
    <Container className="register">
      <Form onSubmit={handleSubmit(addUser)}>
        <Row>
          <Col xs={8}>
            <h2>Registration</h2>
            <div>
              <label>First Name</label>
              <div>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div>
              <label>Room number</label>
              <div>
                <Field
                  name="roomNumber"
                  component="input"
                  type="text"
                  placeholder="Room number"
                />
              </div>
            </div>
            <Button color="primary" type="submit">
              Save data
            </Button>
          </Col>
        </Row>
      </Form>

      <table>
        <tr>
          <th>FISRT NAME</th>
          <th>LAST NAME</th>
          <th>ROOM NUMBER</th>
          <th>REMOVE USER</th>
        </tr>
        {users.users.map(
          (user) =>
            user && (
              <tr>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.roomNumber}</td>
                <td>
                  <button onClick={() => removeUser(user.id)}>
                    Remove {user.firstName}
                  </button>
                </td>
              </tr>
            )
        )}
      </table>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  initialValues: state.users,
});

const mapDispatchToProps = {
  addUser,
  removeUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({
    form: 'register',
    enableReinitialize: true,
  })(Users)
);
