/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

export default class SelectCardComponent extends React.PureComponent {
  generateOptions({ initialValue, endValue, step, predefinedValues }) {
    const optionsList = [];

    if (predefinedValues && predefinedValues.length) {
      predefinedValues.forEach(item => optionsList.push(<option key={`option-${item}`}>{item}</option>));
    } else {
      for (let i = initialValue; i <= endValue; i += step) {
        optionsList.push(<option key={`option-${i}`}>{i}</option>);
      }
    }

    return optionsList;
  }

  render() {
    const { rangeLabel, rangeName, value, initialValue, endValue, step, predefinedValues, onChange } = this.props;
    return (
      <div className="select-card-container">
        <label className="card-label" htmlFor={rangeName}>
          {rangeLabel}
        </label>
        <select
          className="card-select"
          name={rangeName}
          id={rangeName}
          onChange={evt => onChange(evt, rangeName)}
          value={value}
        >
          {this.generateOptions({ initialValue, endValue, step, predefinedValues })}
        </select>
      </div>
    );
  }
}

SelectCardComponent.propTypes = {
  rangeLabel: PropTypes.string,
  rangeName: PropTypes.string,
  value: PropTypes.number,
  initialValue: PropTypes.number,
  endValue: PropTypes.number,
  step: PropTypes.number,
  predefinedValues: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func.isRequired,
};

SelectCardComponent.defaultProps = {
  rangeLabel: 'rangeLabel',
  rangeName: 'rangeName',
  value: 0,
  initialValue: 0,
  endValue: 2,
  step: 1,
  predefinedValues: [],
};
