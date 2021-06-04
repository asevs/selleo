import React from 'react';
import DatePicker from 'react-datepicker';

const TimePickerWrapper = ({
  input: { onChange, value, onBlur },
  meta: { error, touched },
}) => {
  return (
    <React.Fragment>
      <DatePicker
        selected={value}
        onChange={onChange}
        onBlur={() => onBlur}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="h:mm aa"
        timeCaption="Time"
      />
      {touched && error && <span className="reservations__error">{error}</span>}
    </React.Fragment>
  );
};
export default TimePickerWrapper;
