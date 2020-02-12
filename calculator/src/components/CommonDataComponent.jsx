import React from 'react';
import PropTypes from 'prop-types';

// Components
import MaskedInputCardComponent from './MaskedInputCardComponent';

export default class CommonDataComponent extends React.PureComponent {
  render() {
    const { zipCode, tradeIn, downPayment, valueLimit, onChange } = this.props;

    return (
      <div className="common-data-container">
        <MaskedInputCardComponent inputLabel="Home ZIP Code:" value={zipCode} inputName="zipCode" onChange={onChange} />
        <MaskedInputCardComponent
          inputLabel="Trade-in Value:"
          value={tradeIn}
          inputName="tradeIn"
          valueLimit={valueLimit}
          onChange={onChange}
        />
        <MaskedInputCardComponent
          inputLabel="Down Payment:"
          value={downPayment}
          inputName="downPayment"
          valueLimit={valueLimit}
          onChange={onChange}
        />
      </div>
    );
  }
}

CommonDataComponent.propTypes = {
  zipCode: PropTypes.number,
  tradeIn: PropTypes.number,
  downPayment: PropTypes.number,
  valueLimit: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

CommonDataComponent.defaultProps = {
  zipCode: 0,
  tradeIn: 0,
  valueLimit: -1,
  downPayment: 0,
};
