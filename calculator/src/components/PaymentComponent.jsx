import React from 'react';
import PropTypes from 'prop-types';

// TODO: Consider to change `Component` to `PureComponent`
export default class PaymentComponent extends React.PureComponent {
  render() {
    const { infoLabel, infoValue } = this.props;

    return (
      <div className="payment-container">
        <p className="payment-info">
          {infoLabel}
          <span className="payment-value">{infoValue}</span>
        </p>
      </div>
    );
  }
}

PaymentComponent.propTypes = {
  infoLabel: PropTypes.string,
  infoValue: PropTypes.string,
};

PaymentComponent.defaultProps = {
  infoLabel: 'Payment info',
  infoValue: '$123',
};
