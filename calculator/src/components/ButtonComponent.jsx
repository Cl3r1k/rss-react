import React from 'react';
import PropTypes from 'prop-types';

export default class ButtonComponent extends React.PureComponent {
  render() {
    const { isSelected, buttonName, value, onClick } = this.props;

    return (
      <button
        className={`button-styled ${isSelected ? 'selected-button' : ''}`}
        type="button"
        name={buttonName}
        value={value}
        onClick={evt => onClick(evt, buttonName)}
      >
        {value}
      </button>
    );
  }
}

ButtonComponent.propTypes = {
  isSelected: PropTypes.bool,
  buttonName: PropTypes.string,
  value: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

ButtonComponent.defaultProps = {
  isSelected: false,
  buttonName: 'buttonName',
  value: 1,
};
