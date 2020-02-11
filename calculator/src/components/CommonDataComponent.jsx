import React from 'react';
import PropTypes from 'prop-types';

// Components
import MaskedInputCardComponent from './MaskedInputCardComponent';

// TODO: Consider to change `Component` to `PureComponent`
export default class CommonDataComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { zipCode, tradeIn, downPayment, onChange } = this.props;

    return (
      <div>
        <MaskedInputCardComponent inputLabel="Home ZIP Code:" value={zipCode} inputName="zipCode" onChange={onChange} />
        <MaskedInputCardComponent
          inputLabel="Trade-in Value:"
          value={tradeIn}
          inputName="tradeIn"
          onChange={onChange}
        />
        <MaskedInputCardComponent
          inputLabel="Down Payment:"
          value={downPayment}
          inputName="downPayment"
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
  onChange: PropTypes.func.isRequired,
};

CommonDataComponent.defaultProps = {
  zipCode: 0,
  tradeIn: 0,
  downPayment: 0,
};
