import React from 'react';
import PropTypes from 'prop-types';

// Components
import SelectCardComponent from './SelectCardComponent';

// Constants
const MILEAGES = [10000, 12000, 15000];

export default class LeaseComponent extends React.PureComponent {
  render() {
    const { terms, mileages, creditScore, onChange } = this.props;

    return (
      <div className="lease-container">
        <SelectCardComponent
          rangeLabel="Terms:"
          rangeName="terms"
          value={terms}
          initialValue={24}
          endValue={48}
          step={12}
          onChange={onChange}
        />
        <SelectCardComponent
          rangeLabel="Mileages:"
          rangeName="mileages"
          value={mileages}
          predefinedValues={MILEAGES}
          onChange={onChange}
        />
        <SelectCardComponent
          rangeLabel="Approx. Credit Score:"
          rangeName="creditScore"
          value={creditScore}
          initialValue={600}
          endValue={900}
          step={50}
          onChange={onChange}
        />
      </div>
    );
  }
}

LeaseComponent.propTypes = {
  terms: PropTypes.number,
  mileages: PropTypes.number,
  creditScore: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

LeaseComponent.defaultProps = {
  terms: 36,
  mileages: 12000,
  creditScore: 750,
};
