



import Incident from "../components/Incident";
import IncidentHistory from "../components/IncidentHistory";

import Loan from "../components/Loan";
import LoanHistory from "../components/LoanHistory";

import { useState, useRef } from "react";

import '../styles/CustomerAccount.css';

const CustomerAccount = () => {
    const [incidentTab, setIncidentTab] = useState<boolean>(true);
    const incidentTabRef = useRef<boolean>(true);
    const [incTabClass, setIncTabClass] = useState<string>("selected");
    const [incHistoryTabClass, setIncHistoryTabClass] = useState<string>("deselected");
    const [loanTab, setLoanTab] = useState<boolean>(true);
    const loanTabRef = useRef<boolean>(true);
    const [loanTabClass, setLoanTabClass] = useState<string>("tab selected");
    const [loanHistoryTabClass, setLoanHistoryTabClass] = useState<string>("deselected");

    const handleIncidentTab = (e: React.MouseEvent<HTMLInputElement>): void => {
        if ((e.target as HTMLInputElement).id === "incTab") {
            incidentTabRef.current = true;
            setIncidentTab(true);
            setIncTabClass("selected");
            setIncHistoryTabClass("deselected");
        } else {
            incidentTabRef.current = false;
            setIncidentTab(false);
            setIncTabClass("deselected");
            setIncHistoryTabClass("selected");
        }
    }

    const handleLoanTab = (e: React.MouseEvent<HTMLInputElement>): void => {
        if ((e.target as HTMLInputElement).id === "loanTab") {
            loanTabRef.current = true;
            setLoanTab(true);
            setLoanTabClass("selected");
            setLoanHistoryTabClass("deselected");
        } else {
            loanTabRef.current = false;
            setLoanTab(false);
            setLoanTabClass("deselected");
            setLoanHistoryTabClass("selected");
        }
    }

    return (
        <div id="customerAccount">
            <div id="incTitleContainer">
                {incidentTab ?
                    <h1 id="incTitle">Incident</h1>
                :
                    <h1 id="historyTitle">Incident History</h1>
                }
            </div>
            <div id="incTabsContainer">
                <div id="incTab" className={`tab ${incTabClass}`} onClick={handleIncidentTab}>Incident</div>
                <div id="incHistoryTab" className={`tab ${incHistoryTabClass}`} onClick={handleIncidentTab}>Incident History</div>
            </div>
            {incidentTab ? 
                <Incident />
            :
                <IncidentHistory />
            }
            <div id="loanTitleContainer">
                {loanTab ?
                    <h1 id="loanTitle">Loan</h1>
                :
                    <h1 id="loanHistoryTitle">Loan History</h1>
                }
            </div>
            <div id="loanTabsContainer">
                <div id="loanTab" className={`tab ${loanTabClass}`} onClick={handleLoanTab}>Loan</div>
                <div id="loanHistoryTab" className={`tab ${loanHistoryTabClass}`} onClick={handleLoanTab}>Loan History</div>
            </div>
            {loanTab ?
                <Loan />
            :
                <LoanHistory />
            }
        </div>
    );
}

export default CustomerAccount;