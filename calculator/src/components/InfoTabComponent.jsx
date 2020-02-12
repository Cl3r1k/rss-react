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
      <div className="info-tab-container">
        <div className="info-card">
          <p className="info-card-text">MSRP:</p>
          <span className="info-card-value extra-large-text">{`$${msrp}`}</span>
        </div>
        <div className="info-card">
          <p className="info-card-text">Vehicle name:</p>
          <span className="info-card-value">{vehicleName}</span>
        </div>
        <div className="info-card">
          <p className="info-card-text">Dealer name:</p>
          <span className="info-card-value">{dealerName}</span>
        </div>
        <div className="info-card">
          <p className="info-card-text">Dealer phone number:</p>
          <span className="info-card-value">{dealerPhone}</span>
        </div>
        <div className="info-card">
          <p className="info-card-text">Dealer rating:</p>
          <span className="info-card-value">{dealerRating}</span>
        </div>
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
