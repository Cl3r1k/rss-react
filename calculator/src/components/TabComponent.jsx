import React from 'react';
import PropTypes from 'prop-types';

export default class TabComponent extends React.PureComponent {
  render() {
    const { tabName, isLoanTab, onClick } = this.props;
    return (
      <button
        className={`tab-button ${isLoanTab ? 'selected-tab' : ''}`}
        type="button"
        onClick={() => onClick(tabName)}
      >
        {tabName}
      </button>
    );
  }
}

TabComponent.propTypes = {
  tabName: PropTypes.string,
  isLoanTab: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

TabComponent.defaultProps = {
  tabName: 'tabName',
  isLoanTab: true,
};
