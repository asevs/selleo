import React from 'react';

const SelectOwnerWrapper = ({
  input: { onChange, onBlur, value },
  meta: { error, touched },
  users,
}) => {
  return (
    <React.Fragment>
      <select onChange={onChange} value={value} onBlur={onBlur}>
        <option>Set owner</option>

        {users.map((user) => (
          <option value={JSON.stringify(user)}>{user.firstName}</option>
        ))}
      </select>
      {error && touched && <span className="reservations__error">{error}</span>}
    </React.Fragment>
  );
};
export default SelectOwnerWrapper;
