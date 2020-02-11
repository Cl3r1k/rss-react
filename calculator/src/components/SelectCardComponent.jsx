/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

// TODO: Consider to change `Component` to `PureComponent`
export default class SelectCardComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // selectedValue: 0,
    };
  }

  generateOptions({ initialValue, endValue, step, predefinedValues }) {
    const optionsList = [];

    if (predefinedValues && predefinedValues.length) {
      predefinedValues.forEach(item => optionsList.push(<option key={item}>{item}</option>));
    } else {
      for (let i = initialValue; i <= endValue; i += step) {
        optionsList.push(<option key={i}>{i}</option>);
      }
    }

    return optionsList;
  }

  render() {
    const { rangeLabel, rangeName, value, initialValue, endValue, step, predefinedValues, onChange } = this.props;
    return (
      <div>
        <label htmlFor={rangeName}>{rangeLabel}</label>
        <select name={rangeName} onChange={evt => onChange(evt, rangeName)} value={value}>
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
