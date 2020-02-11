import React from 'react';
import PropTypes from 'prop-types';

// TODO: Consider to change `Component` to `PureComponent`
export default class MaskedInputComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.value,
    };
  }

  render() {
    const { inputLabel, onChange, inputName } = this.props;
    const { inputValue } = this.state;

    return (
      <div>
        <label htmlFor={inputName}>{inputLabel}</label>
        <input
          placeholder="Enter value"
          type="text"
          name={inputName}
          value={inputValue}
          id={inputName}
          onChange={evt => onChange(evt, inputName)}
        />
      </div>
    );
  }
}

MaskedInputComponent.propTypes = {
  inputLabel: PropTypes.string,
  value: PropTypes.number,
  inputName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

MaskedInputComponent.defaultProps = {
  inputLabel: 'Masked input label',
  value: 0,
  inputName: 'inputName',
};
