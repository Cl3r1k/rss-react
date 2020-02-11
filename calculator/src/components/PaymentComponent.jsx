import React from 'react';
import PropTypes from 'prop-types';

// TODO: Consider to change `Component` to `PureComponent`
export default class PaymentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { infoLabel, infoValue } = this.props;

    return (
      <div>
        <p>
          {infoLabel}
          <span>{infoValue}</span>
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
