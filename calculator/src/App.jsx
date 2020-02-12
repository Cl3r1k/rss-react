/* eslint-disable class-methods-use-this */
import { hot } from 'react-hot-loader/root';
import React from 'react';

// Modules
import mockData from './modules/mockData';
import geoData from './modules/geoData';

// Components
import TabComponent from './components/TabComponent';
import CommonDataComponent from './components/CommonDataComponent';
import LeaseComponent from './components/LeaseComponent';
import PaymentComponent from './components/PaymentComponent';
import LoanComponent from './components/LoanComponent';
import InfoTabComponent from './components/InfoTabComponent';

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
      loanApr: 0,
      loanTerm: 24,
      loanCreditScore: 750,
      msrp: 1,
      vehicleName: 'vehicleName',
      monthlyPayment: 0,
      dealerName: 'dealerName',
      dealerPhone: 'dealerPhone',
      dealerRating: 'dealerRating',
      valueLimit: -1,
    };
  }

  async componentDidMount() {
    const VALUE_LIMIT_RATE = 0.25;
    const responseDataValues = await Promise.resolve(mockData);
    const valueLimit = responseDataValues.msrp * VALUE_LIMIT_RATE;
    // console.log('%c componentDidMount() resolved responseDataValues', 'color: green;', responseDataValues);

    const responseDataZip = await geoData.getGeoDataAsync();
    // console.log('%c componentDidMount() resolved responseDataZip', 'color: green;', responseDataZip);

    this.setState({ ...responseDataValues, ...responseDataZip, valueLimit });
  }

  // async getInitialData() {
  //   // const data = await Promise.resolve('areasdf');
  //   // console.log('resolved data', data);
  // }

  changeInputHandler = (evt, idName) => {
    const { value } = evt.target;
    // console.log('changeInputHandler() evt: ', evt);
    // console.log(`changeInputHandler() idName: ${idName}`);
    // console.log(`changeInputHandler() value: ${value}`);
    this.setState({ [idName]: +value }, this.calculatePayment);
  };

  changeRangeHandler = (evt, idName) => {
    const { value } = evt.target;
    // console.log('changeRangeHandler() evt: ', evt);
    // console.log(`changeRangeHandler() idName: ${idName}`);
    // console.log(`changeRangeHandler() value: ${value}`);
    this.setState({ [idName]: +value }, this.calculatePayment);
  };

  clickButtonHandler = (evt, idName) => {
    const { value } = evt.target;
    // console.log('changeRangeHandler() evt: ', evt);
    // console.log(`changeRangeHandler() idName: ${idName}`);
    // console.log(`changeRangeHandler() value: ${value}`);
    this.setState({ [idName]: +value }, this.calculatePayment);
    // this.calculatePayment();
  };

  switchTabHandler = idName => {
    // const { value } = evt.target;
    // console.log('changeRangeHandler() evt: ', evt);
    // console.log(`changeRangeHandler() idName: ${idName}`);
    // console.log(`changeRangeHandler() value: ${value}`);
    this.setState({ isLoanTab: idName === 'Loan' }, this.calculatePayment);
    // this.calculatePayment();
  };

  async calculatePayment() {
    // console.log('state: ', this.state);
    const monthlyPayment = await new Promise(resolve => {
      const {
        isLoanTab,
        msrp,
        tradeIn,
        downPayment,
        terms,
        mileages,
        creditScore,
        loanCreditScore,
        loanApr,
        loanTerm,
      } = this.state;
      // const { isLoanTab, creditScore, loanCreditScore } = this.state;
      const creditScoreBase = isLoanTab ? loanCreditScore : creditScore;
      // console.log('creditScoreBase: ', creditScoreBase);
      // console.log('msrp: ', msrp);
      let creditScoreValue = 0.95;

      if (creditScoreBase < 640) {
        creditScoreValue = 1.2;
      }

      if (creditScoreBase >= 640 && creditScoreBase < 700) {
        creditScoreValue = 1.05;
      }

      if (creditScoreBase >= 700 && creditScoreBase < 750) {
        creditScoreValue = 1;
      }
      // console.log('creditScoreValue: ', creditScoreValue);

      if (isLoanTab) {
        const paymentLoanResult = ((msrp - tradeIn - downPayment) / loanTerm) * (creditScoreValue * (loanApr / 100));
        resolve(Math.floor(paymentLoanResult));
        // console.log('paymentLoanResult: ', paymentLoanResult);
      } else {
        const paymentLeaseResult = (((msrp - tradeIn - downPayment) * mileages) / 10000 / terms) * creditScoreValue;
        // console.log('paymentLeaseResult: ', paymentLeaseResult);
        resolve(Math.floor(paymentLeaseResult));
      }
    });

    // console.log('monthlyPayment: ', monthlyPayment);
    this.setState({ monthlyPayment });
  }

  initApp() {
    // await this.getInitialData();
    // console.log('initApp() called');
  }

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
    this.initApp();

    const {
      isLoanTab,
      zipCode,
      tradeIn,
      downPayment,
      terms,
      mileages,
      creditScore,
      loanApr,
      loanTerm,
      loanCreditScore,
      msrp,
      vehicleName,
      dealerName,
      dealerPhone,
      dealerRating,
      valueLimit,
      monthlyPayment,
    } = this.state;

    // console.log(`render() msrp: ${msrp}, vehicleName: ${vehicleName}, dealerName: ${dealerName}, zipCode: ${zipCode}`);

    return (
      <div>
        <TabComponent tabName="Loan" isLoanTab={isLoanTab} onClick={this.switchTabHandler} />
        <TabComponent tabName="Lease" isLoanTab={!isLoanTab} onClick={this.switchTabHandler} />
        <CommonDataComponent
          zipCode={zipCode}
          tradeIn={tradeIn}
          downPayment={downPayment}
          valueLimit={valueLimit}
          onChange={this.changeInputHandler}
        />
        <LoanComponent
          loanApr={loanApr}
          loanTerm={loanTerm}
          loanCreditScore={loanCreditScore}
          onClick={this.clickButtonHandler}
        />
        <LeaseComponent
          terms={terms}
          mileages={mileages}
          creditScore={creditScore}
          onChange={this.changeRangeHandler}
        />
        <PaymentComponent infoLabel="Monthly Payment:" infoValue={`$${monthlyPayment}`} />
        <PaymentComponent
          infoLabel="Taxes:"
          infoValue={`${zipCode}`
            .split('')
            .map(num => num * 11)
            .join('')}
        />
        <InfoTabComponent
          msrp={msrp}
          vehicleName={vehicleName}
          dealerName={dealerName}
          dealerPhone={dealerPhone}
          dealerRating={dealerRating}
        />
      </div>
    );
  }
}

// export default App;
export default hot(App);
