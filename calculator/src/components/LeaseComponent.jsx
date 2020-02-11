import React from 'react';
import PropTypes from 'prop-types';

// Components
import SelectCardComponent from './SelectCardComponent';

// TODO: Consider to change `Component` to `PureComponent`
export default class LeaseComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { terms, mileages, creditScore, onChange } = this.props;
    // console.log(`LeaseComponent render()::: terms: ${terms}, mileages: ${mileages}`);

    return (
      <div>
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
          predefinedValues={[10000, 12000, 15000]}
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
