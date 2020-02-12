/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

export default class MaskedInputCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      warningMessage: '',
    };
  }

  changeHandler(evt, inputName) {
    const { valueLimit, onChange } = this.props;
    const {
      target: {
        value,
        value: { length },
      },
    } = evt;

    const warningLengthMessage = length > 10 && `Max length is 10!`;
    const warningValueMessage = valueLimit > 0 && value > valueLimit ? `Max value is ${valueLimit}!` : '';

    this.setState({ warningMessage: warningLengthMessage || warningValueMessage });

    if (!warningLengthMessage && !warningValueMessage) {
      onChange(evt, inputName);
    }
  }

  keyDownHandler(evt) {
    const ALLOWED_KEYS = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter', 'Home', 'End'];
    const { key } = evt;

    if (ALLOWED_KEYS.includes(key)) {
      return;
    }

    if (Number.isNaN(+key)) {
      evt.preventDefault();
    }
  }

  render() {
    const { inputLabel, inputName, value } = this.props;
    const { warningMessage } = this.state;

    return (
      <div className="masked-input-card-container">
        <label className="card-label" htmlFor={inputName}>
          {inputLabel}
        </label>
        {warningMessage && <span className="card-warning-info">{warningMessage}</span>}
        <input
          className="card-input"
          placeholder="Enter value"
          type="text"
          name={inputName}
          value={value}
          id={inputName}
          onChange={evt => this.changeHandler(evt, inputName)}
          onKeyDown={evt => this.keyDownHandler(evt)}
        />
      </div>
    );
  }
}

MaskedInputCardComponent.propTypes = {
  inputLabel: PropTypes.string,
  value: PropTypes.number,
  inputName: PropTypes.string,
  valueLimit: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

MaskedInputCardComponent.defaultProps = {
  inputLabel: 'Masked input label',
  value: 0,
  valueLimit: -1,
  inputName: 'inputName',
};
