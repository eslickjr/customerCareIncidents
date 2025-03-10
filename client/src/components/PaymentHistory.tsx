

import { useEffect } from "react";

import '../styles/PaymentHistory.css';

const PaymentHistory = () => {
    const adjustSpanSize = () => {
        const cellsInRow = document.getElementsByClassName("historyData");
        const spansInRow = document.getElementsByClassName("historySpan");

        for (let span of spansInRow) {
            (span as HTMLElement).style.height = `auto`;
            (span as HTMLElement).style.width = `auto`;
        }
        
        for (let cell of cellsInRow) {
            const span = cell.getElementsByClassName("historySpan")[0];
            (span as HTMLElement).style.height = `${cell.getBoundingClientRect().height}px`;
            (span as HTMLElement).style.width = `${cell.getBoundingClientRect().width - 32}px`;
        }
    };

    useEffect(() => {
        adjustSpanSize();
        window.addEventListener('resize', adjustSpanSize);

        return () => {
            window.removeEventListener('resize', adjustSpanSize);
        };
    }, []);

    const TableData = () => {
        const dataArray = [];
        const data = {
            date: "12/12/2021",
            code: "1234",
            ref: "123456",
            amount: 1000,
            principal: 1000,
            paidThru: "01/12/2021",
            charge: 100,
        };
        dataArray.push({...data});
        dataArray.push({...data});
        dataArray.push({...data});
        
        return (
            <>
                {dataArray.map((data, index) => {
                    return (
                        <tr key={index} className="pmtHistoryRow pmtHistoryBodyRow">
                            <td className="pmtHistoryDate pmtHistoryData"><span className="pmtHistorySpan pmtHistoryDateSpan">{data.date}</span></td>
                            <td className="pmtHistoryBr pmtHistoryData"><span className="pmtHistorySpan pmtHistoryCodeSpan">{data.code}</span></td>
                            <td className="pmtHistoryAcc pmtHistoryData"><span className="pmtHistorySpan pmtHistoryRefSpan">{data.ref}</span></td>
                            <td className="pmtHistoryName pmtHistoryData"><span className="pmtHistorySpan pmtHistoryAmountSpan">{data.amount}</span></td>
                            <td className="pmtHistoryAmount pmtHistoryData"><span className="pmtHistorySpan pmtHistoryPrincipalSpan">{data.principal}</span></td>
                            <td className="pmtHistoryProceeds pmtHistoryData"><span className="pmtHistorySpan pmtHistoryPaidThruSpan">{data.paidThru}</span></td>
                            <td className="pmtHistoryPmtAmount pmtHistoryData"><span className="pmtHistorySpan pmtHistoryChargeSpan">{data.charge}</span></td>
                        </tr>
                    );
                })}
                </>
            );
        };

    return (
        <div>
            <div id="pmtHistoryTableContainer">
                <table id="pmtHistoryTable">
                    <thead id="pmtHistoryHeader">
                        <tr id="pmtHistoryHeaderRow" className="pmtHistoryHeaderRow pmtHistoryRow">
                            <th id="pmtDateHeader" className="pmtHistoryColHeader pmtHistoryDate"><span className="pmtHistorySpan">Date</span></th>
                            <th id="codeHeader" className="pmtHistoryColHeader pmtHistoryCode"><span className="pmtHistorySpan">Code</span></th>
                            <th id="refHeader" className="pmtHistoryColHeader pmtHistoryRef"><span className="pmtHistorySpan">Reference</span></th>
                            <th id="pmtAmountHeader" className="pmtHistoryColHeader pmtHistoryAmount"><span className="pmtHistorySpan">Amount</span></th>
                            <th id="principalHeader" className="pmtHistoryColHeader pmtHistoryPrincipal"><span className="pmtHistorySpan">Principal</span></th>
                            <th id="paidThruHeader" className="pmtHistoryColHeader pmtHistoryPaidThru"><span className="pmtHistorySpan">Paid Through</span></th>
                            <th id="chargeHeader" className="pmtHistoryColHeader pmtHistoryCharge"><span className="pmtHistorySpan">Interest/Late Charge</span></th>
                        </tr>
                    </thead>
                    <tbody id="pmtHistoryBody">
                        {TableData()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PaymentHistory;