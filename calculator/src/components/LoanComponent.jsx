/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

// Components
import ButtonComponent from './ButtonComponent';

// TODO: Consider to change `Component` to `PureComponent`
export default class LoanComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  generateButtonsRows({ initialValue, endValue, step, predefinedValues, buttonName, onClick, selectedItem }) {
    const buttonsRow = [];
    // console.log(
    //   `initialValue: ${initialValue}, endValue: ${endValue}, step: ${step}, predefinedValues: ${predefinedValues}, buttonName: ${buttonName}`
    // );

    // buttonsRow.push(<ButtonComponent buttonName={buttonName} value={111} onClick={onClick} />);
    // buttonsRow.push(<ButtonComponent buttonName={buttonName} value={222} onClick={onClick} />);

    if (predefinedValues && predefinedValues.length) {
      // console.log('generateButtonsRows() predefinedValues');

      predefinedValues.forEach(item =>
        buttonsRow.push(
          <ButtonComponent
            isSelected={selectedItem === item}
            buttonName={buttonName}
            value={item}
            key={item}
            onClick={onClick}
          />
        )
      );
    } else {
      // console.log('generateButtonsRows() initialValue, endValue, step');
      for (let i = initialValue; i <= endValue; i += step) {
        buttonsRow.push(
          <ButtonComponent
            isSelected={selectedItem === i}
            buttonName={buttonName}
            value={i}
            key={i}
            onClick={onClick}
          />
        );
      }
    }

    // return <ButtonComponent buttonName={buttonName} value={1121} onClick={onClick} />;

    return <div>{buttonsRow}</div>;
  }

  render() {
    const { loanTerm, loanCreditScore, onClick } = this.props;
    const [initialValue, endValue, step] = [600, 900, 50];
    const predefinedValues = [12, 24, 36, 48, 72, 84];
    // console.log(`loanTerm: ${loanTerm}, loanCreditScore: ${loanCreditScore}`);

    return (
      <div>
        <p>Terms:</p>
        {this.generateButtonsRows({ predefinedValues, buttonName: 'loanTerm', selectedItem: loanTerm, onClick })}
        <p>Credit Score:</p>
        {this.generateButtonsRows({
          initialValue,
          endValue,
          step,
          buttonName: 'loanCreditScore',
          selectedItem: loanCreditScore,
          onClick,
        })}
      </div>
    );
  }
}

LoanComponent.propTypes = {
  loanTerm: PropTypes.number,
  loanCreditScore: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

LoanComponent.defaultProps = {
  loanTerm: 24,
  loanCreditScore: 750,
};
