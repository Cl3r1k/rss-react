import React from 'react';
import PropTypes from 'prop-types';

export default class InfoTabComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { msrp, vehicleName, dealerName, dealerPhone, dealerRating } = this.props;

    return (
      <div>
        <p>MSRP:</p>
        <span>{`$${msrp}`}</span>
        <p>Vehicle name:</p>
        <span>{vehicleName}</span>
        <p>Dealer name:</p>
        <span>{dealerName}</span>
        <p>Dealer phone number:</p>
        <span>{dealerPhone}</span>
        <p>Dealer rating:</p>
        <span>{dealerRating}</span>
        {/* <p>Taxes (array of numbers, generates during calculations):</p> */}
      </div>
    );
  }
}

InfoTabComponent.propTypes = {
  msrp: PropTypes.number,
  vehicleName: PropTypes.string,
  dealerName: PropTypes.string,
  dealerPhone: PropTypes.string,
  dealerRating: PropTypes.string,
};

InfoTabComponent.defaultProps = {
  msrp: 50000,
  vehicleName: 'vehicleName',
  dealerName: 'dealerName',
  dealerPhone: 'dealerPhone',
  dealerRating: 'dealerRating',
};
