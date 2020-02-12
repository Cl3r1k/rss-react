/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';

// Components
import ButtonComponent from './ButtonComponent';
import MaskedInputCardComponent from './MaskedInputCardComponent';

export default class LoanComponent extends React.PureComponent {
  generateButtonsRows({ initialValue, endValue, step, predefinedValues, buttonName, onClick, selectedItem }) {
    const buttonsRow = [];

    if (predefinedValues && predefinedValues.length) {
      predefinedValues.forEach(item =>
        buttonsRow.push(
          <ButtonComponent
            isSelected={selectedItem === item}
            buttonName={buttonName}
            value={item}
            key={`button-${item}`}
            onClick={onClick}
          />
        )
      );
    } else {
      for (let i = initialValue; i <= endValue; i += step) {
        buttonsRow.push(
          <ButtonComponent
            isSelected={selectedItem === i}
            buttonName={buttonName}
            value={i}
            key={`button-${i}`}
            onClick={onClick}
          />
        );
      }
    }

    return buttonsRow;
  }

  render() {
    const { loanApr, loanTerm, loanCreditScore, onClick } = this.props;
    const [initialValue, endValue, step] = [600, 900, 50];
    const predefinedValues = [12, 24, 36, 48, 72, 84];

    return (
      <div className="loan-container">
        <MaskedInputCardComponent
          inputLabel="APR:"
          value={loanApr}
          inputName="loanApr"
          valueLimit={100}
          onChange={onClick}
        />
        <p className="loan-text">Terms:</p>
        <div className="buttons-row-container">
          {this.generateButtonsRows({ predefinedValues, buttonName: 'loanTerm', selectedItem: loanTerm, onClick })}
        </div>
        <p className="loan-text">Credit Score:</p>
        <div className="buttons-row-container">
          {this.generateButtonsRows({
            initialValue,
            endValue,
            step,
            buttonName: 'loanCreditScore',
            selectedItem: loanCreditScore,
            onClick,
          })}
        </div>
      </div>
    );
  }
}

LoanComponent.propTypes = {
  loanApr: PropTypes.number,
  loanTerm: PropTypes.number,
  loanCreditScore: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

LoanComponent.defaultProps = {
  loanApr: 0,
  loanTerm: 24,
  loanCreditScore: 750,
};
