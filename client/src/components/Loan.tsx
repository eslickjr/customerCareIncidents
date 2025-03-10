

import { useState, useEffect } from "react";
import PaymentHistory from "./PaymentHistory";

import '../styles/Loan.css';

interface LoanCustInfoI {
    class: string;
    branch: string;
    account: number;
    codes: string;
    firstName: string;
    lastName: string;
    ssn: string;
    address: string;
    cell: string;
}

interface LoanInfoI {
    loanDate: string;
    loanAmount: number;
    proceeds: number;
    balance: number;
    payoff: number;
    delinquency: number;
    chargeOff: string;
}

interface LoanPmtInfoI {
    firstPay: string;
    pmtAmount: number;
    due: number;
    nextDue: string;
    lastDue: string;
}

interface LoanI {
    custInfo: LoanCustInfoI;
    loanInfo: LoanInfoI;
    pmtInfo: LoanPmtInfoI;
}

const Loan = () => {
    const [loan, setLoan] = useState<LoanI | null>(null);

    useEffect(() => {
        // fetch loan data
        setLoan({
            custInfo: {
                class: "02",
                branch: "423",
                account: 123456,
                codes: "A1",
                firstName: "John",
                lastName: "Doe",
                ssn: "123-45-6789",
                address: "123 Main St",
                cell: "(123) 456-7890"
            },
            loanInfo: {
                loanDate: "01/01/2021",
                loanAmount: 1000,
                proceeds: 900,
                balance: 800,
                payoff: 700,
                delinquency: 30,
                chargeOff: "01/01/2022"
            },
            pmtInfo: {
                firstPay: "01/01/2021",
                pmtAmount: 100,
                due: 10,
                nextDue: "02/01/2021",
                lastDue: "01/01/2022"
            }
        });
    }, []);

    return (
        <div>
            <div id="outerLoanContainer">
                <div id="loanContainer">
                    <div id="loanInformationContainer">
                        {loan && (<>
                            <div id="generalCustInfo" className="broadInfoContainer">
                                <div className = "loanInfoTitleContainer">
                                    <h3 className="loanInfoTitle">General Information</h3>
                                </div>
                                <div id="generalInfoContainer" className = "infoContainer">
                                    <p>Branch: <span className="infoSpan">{loan.custInfo.branch}</span></p>
                                    <div id="accInfo" className="info">
                                        <p>Class: <span className="infoSpan">{loan.custInfo.class}</span></p>
                                        <p>Account: <span className="infoSpan">{loan.custInfo.account}</span></p>
                                        <p>Codes: <span className="infoSpan">{loan.custInfo.codes}</span></p>
                                    </div>
                                    <div id="nameInfo" className="info">
                                        <p>First Name: <span className="infoSpan">{loan.custInfo.firstName}</span></p>
                                        <p>Last Name: <span className="infoSpan">{loan.custInfo.lastName}</span></p>
                                    </div>
                                    <p>SSN: <span className="infoSpan">{loan.custInfo.ssn}</span></p>
                                    <p>Address: <span className="infoSpan">{loan.custInfo.address}</span></p>
                                    <p>Cell: <span className="infoSpan">{loan.custInfo.cell}</span></p>
                                </div>
                            </div>
                            <div id="loanInfo" className="broadInfoContainer">
                                <div className = "loanInfoTitleContainer">
                                    <h3 className="loanInfoTitle">Loan Information</h3>
                                </div>
                                <div id="loanInfoContainer" className="infoContainer">
                                    <p>Loan Date: <span className="infoSpan">{loan.loanInfo.loanDate}</span></p>
                                    <div id="loanAmtInfo" className="info">
                                        <p>Loan Amount: <span className="infoSpan">{loan.loanInfo.loanAmount}</span></p>
                                        <p>Proceeds: <span className="infoSpan">{loan.loanInfo.proceeds}</span></p>
                                    </div>
                                    <div id="balanceInfo" className="info">
                                        <p>Balance: <span className="infoSpan">{loan.loanInfo.balance}</span></p>
                                        <p>Payoff: <span className="infoSpan">{loan.loanInfo.payoff}</span></p>
                                    </div>
                                    <p>Delinquency: <span className="infoSpan">{loan.loanInfo.delinquency}</span></p>
                                    <p>Charge-Off Date: <span className="infoSpan">{loan.loanInfo.chargeOff}</span></p>
                                </div>
                            </div>
                            <div id="pmtInfo" className="broadInfoContainer">
                                <div className = "loanInfoTitleContainer">
                                    <h3 className="loanInfoTitle">Payment Information</h3>
                                </div>
                                <div id="pmtInfoContainer" className="infoContainer">
                                    <p>First Pay: <span className="infoSpan">{loan.pmtInfo.firstPay}</span></p>
                                    <p>Payment Amount: <span className="infoSpan">{loan.pmtInfo.pmtAmount}</span></p>
                                    <p>Amount Due: <span className="infoSpan">{loan.pmtInfo.due}</span></p>
                                    <p>Next Due: <span className="infoSpan">{loan.pmtInfo.nextDue}</span></p>
                                    <p>Last Due: <span className="infoSpan">{loan.pmtInfo.lastDue}</span></p>
                                </div>
                            </div>    
                        </>)}
                    </div>
                    <div id="paymentHistory">
                        <div id="pmtHistoryTitleContainer">
                            <h3 id="pmtHistoryTitle">Payment History</h3>
                        </div>
                        <PaymentHistory />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loan;