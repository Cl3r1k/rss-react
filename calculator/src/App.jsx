import { hot } from 'react-hot-loader/root';
import React from 'react';

// Components
import TabComponent from './components/TabComponent';
import CommonDataComponent from './components/CommonDataComponent';
import LeaseComponent from './components/LeaseComponent';
import PaymentComponent from './components/PaymentComponent';
import LoanComponent from './components/LoanComponent';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoanTab: true,
      zipCode: 0,
      tradeIn: 0,
      downPayment: 0,
      terms: 36,
      mileages: 12000,
      creditScore: 750,
      loanTerm: 24,
      loanCreditScore: 750,
    };
  }

  changeInputHandler = (evt, idName) => {
    const { value } = evt.target;
    // console.log('changeInputHandler() evt: ', evt);
    // console.log(`changeInputHandler() idName: ${idName}`);
    // console.log(`changeInputHandler() value: ${value}`);
    this.setState({ [idName]: +value });
  };

  changeRangeHandler = (evt, idName) => {
    const { value } = evt.target;
    // console.log('changeRangeHandler() evt: ', evt);
    // console.log(`changeRangeHandler() idName: ${idName}`);
    // console.log(`changeRangeHandler() value: ${value}`);
    this.setState({ [idName]: +value });
  };

  clickButtonHandler = (evt, idName) => {
    const { value } = evt.target;
    // console.log('changeRangeHandler() evt: ', evt);
    // console.log(`changeRangeHandler() idName: ${idName}`);
    // console.log(`changeRangeHandler() value: ${value}`);
    this.setState({ [idName]: +value });
    this.calculatePayment();
  };

  switchTabHandler = idName => {
    // const { value } = evt.target;
    // console.log('changeRangeHandler() evt: ', evt);
    // console.log(`changeRangeHandler() idName: ${idName}`);
    // console.log(`changeRangeHandler() value: ${value}`);
    this.setState({ isLoanTab: idName === 'Loan' });
    // this.calculatePayment();
  };

  // calculatePayment() {
  //   console.log('state: ', this.state);
  // }

  // changeTradeInHandler = evt => {
  //   const { value } = evt.target;
  //   console.log(`changeTradeInHandler() evt: ${evt}`);
  //   console.log(`changeTradeInHandler() value: ${value}`);
  //   this.setState({ tradeIn: +value });
  // };

  // changeDownPaymentHandler = evt => {
  //   const { value } = evt.target;
  //   console.log(`changeDownPaymentHandler() evt: ${evt}`);
  //   console.log(`changeDownPaymentHandler() value: ${value}`);
  //   this.setState({ downPayment: +value });
  // };

  render() {
    const {
      isLoanTab,
      zipCode,
      tradeIn,
      downPayment,
      terms,
      mileages,
      creditScore,
      loanTerm,
      loanCreditScore,
    } = this.state;

    return (
      <div>
        <TabComponent tabName="Lease" isLoanTab={!isLoanTab} onClick={this.switchTabHandler} />
        <TabComponent tabName="Loan" isLoanTab={isLoanTab} onClick={this.switchTabHandler} />
        <CommonDataComponent
          zipCode={zipCode}
          tradeIn={tradeIn}
          downPayment={downPayment}
          onChange={this.changeInputHandler}
        />
        <LoanComponent loanTerm={loanTerm} loanCreditScore={loanCreditScore} onClick={this.clickButtonHandler} />
        <LeaseComponent
          terms={terms}
          mileages={mileages}
          creditScore={creditScore}
          onChange={this.changeRangeHandler}
        />
        <PaymentComponent infoLabel="Monthly Payment:" infoValue="$111222333" />
        {/* {isLoanTab && <p>loan selected???</p>} */}
        {/* {isLoanTab ? (
          <p>
            Loan Selected
            {` -isLoanTab: ${isLoanTab.toString()}`}
          </p>
        ) : (
          <p>
            Lease Selected
            {` -isLoanTab: ${isLoanTab.toString()}`}
          </p>
        )} */}
      </div>
    );
  }
}

// export default App;
export default hot(App);
