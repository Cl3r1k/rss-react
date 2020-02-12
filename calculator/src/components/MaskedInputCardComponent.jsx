/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

// TODO: Consider to change `Component` to `PureComponent`
export default class MaskedInputCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      warningMessage: '',
      // inputValue: props.value,
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

    // console.log('%c keyDownHandler() value', 'color: aqua;', value);
    // console.log('%c keyDownHandler() length', 'color: aqua;', length);
    // console.log('%c keyDownHandler() valueLimit', 'color: aqua;', valueLimit);

    const warningLengthMessage = length > 10 && `Max length is 10!`;
    const warningValueMessage = value > valueLimit ? `Max value is ${valueLimit}!` : '';
    // console.log('%c keyDownHandler() warningValueMessage', 'color: aqua;', warningValueMessage);

    // const num = evt;
    // console.log('%c changeHandler() num', 'color: aqua;', num);
    this.setState({ warningMessage: warningLengthMessage || warningValueMessage });

    if (!warningLengthMessage && !warningValueMessage) {
      // console.log('%c keyDownHandler() call onChange()', 'color: aqua;');
      onChange(evt, inputName);
    }
  }

  keyDownHandler(evt) {
    const ALLOWED_KEYS = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab', 'Enter', 'Home', 'End'];
    const { key } = evt;
    // const num = evt;
    // console.log('%c keyDownHandler() evt', 'color: aqua;', evt);
    // console.log('%c keyDownHandler() key', 'color: aqua;', key);

    // const numVal = +evt.key;
    // console.log('%c keyDownHandler() numVal', 'color: aqua;', numVal);

    if (ALLOWED_KEYS.includes(key)) {
      // console.log('%c ALLOWED_KEY', 'color: aqua;');
      return;
    }

    if (Number.isNaN(+key)) {
      evt.preventDefault();
    }
  }

  render() {
    const { inputLabel, inputName, value } = this.props;
    // const { inputValue } = this.state;
    const { warningMessage } = this.state;

    return (
      <div>
        <label htmlFor={inputName}>{inputLabel}</label>
        {warningMessage && <span className="warning-info">{warningMessage}</span>}
        <input
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
