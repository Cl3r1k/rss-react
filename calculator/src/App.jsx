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

const APP_SAVE_NAME = 'ReactCalculator';

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
    const savedState = this.loadAppSettings();

    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.setState({ ...parsedState });
    } else {
      await this.loadDefaults();
    }
  }

  changeValueHandler = (evt, idName) => {
    const { value } = evt.target;
    this.setState({ [idName]: +value }, this.calculatePayment);
  };

  loadAppSettings = () => {
    return localStorage.getItem(APP_SAVE_NAME);
  };

  saveAppSettings = () => {
    localStorage.setItem(APP_SAVE_NAME, JSON.stringify(this.state));
  };

  switchTabHandler = idName => {
    this.setState({ isLoanTab: idName === 'Loan' }, this.calculatePayment);
  };

  async loadDefaults() {
    const VALUE_LIMIT_RATE = 0.25;
    const responseDataValues = await Promise.resolve(mockData);
    const valueLimit = responseDataValues.msrp * VALUE_LIMIT_RATE;

    const responseDataZip = await geoData.getGeoDataAsync();

    this.setState({ ...responseDataValues, ...responseDataZip, valueLimit });
  }

  async calculatePayment() {
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

      const creditScoreBase = isLoanTab ? loanCreditScore : creditScore;
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

      if (isLoanTab) {
        const paymentLoanResult = ((msrp - tradeIn - downPayment) / loanTerm) * (creditScoreValue * (loanApr / 100));
        resolve(Math.floor(paymentLoanResult));
      } else {
        const paymentLeaseResult = (((msrp - tradeIn - downPayment) * mileages) / 10000 / terms) * creditScoreValue;
        resolve(Math.floor(paymentLeaseResult));
      }

      this.saveAppSettings();
    });

    this.setState({ monthlyPayment });
  }

  // initApp() {
  //   // await this.getInitialData();
  //   // console.log('initApp() called');
  // }

  render() {
    // this.initApp();

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

    return (
      <div className="wrapper">
        <div className="calculator-container">
          <div className="tab-container">
            <TabComponent tabName="Loan" isLoanTab={isLoanTab} onClick={this.switchTabHandler} />
            <TabComponent tabName="Lease" isLoanTab={!isLoanTab} onClick={this.switchTabHandler} />
          </div>
          <CommonDataComponent
            zipCode={zipCode}
            tradeIn={tradeIn}
            downPayment={downPayment}
            valueLimit={valueLimit}
            onChange={this.changeValueHandler}
          />
          {isLoanTab ? (
            <LoanComponent
              loanApr={loanApr}
              loanTerm={loanTerm}
              loanCreditScore={loanCreditScore}
              onClick={this.changeValueHandler}
            />
          ) : (
            <LeaseComponent
              terms={terms}
              mileages={mileages}
              creditScore={creditScore}
              onChange={this.changeValueHandler}
            />
          )}

          <PaymentComponent infoLabel="Monthly Payment:" infoValue={`$${monthlyPayment}`} />
          <PaymentComponent
            infoLabel="Taxes:"
            infoValue={`${zipCode}`
              .split('')
              .map(num => num * 11)
              .join('')}
          />
        </div>
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

export default hot(App);
