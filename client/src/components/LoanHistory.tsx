

import { useEffect } from "react";
import '../styles/LoanHistory.css';

const LoanHistory = () => {
    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        const row = e.currentTarget;
        const cells = row.getElementsByClassName("historyData");

        const span = (cells[2].getElementsByClassName("historySpan")[0] as HTMLElement).innerText;

        console.log(span);
    }

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
            date: "12/12/2021 12:00",
            br: "1234",
            acc: "123456",
            name: "John Doe",
            amount: 1000,
            proceeds: 1000,
            pmtAmount: 100,
            offType: "PO",
            offDate: "12/12/2021",
        };
        dataArray.push({...data});
        data.offType = "CO";
        dataArray.push({...data});
        data.name = "John Doejfkldjaflkjifejiafjlekjkjfdsal";
        data.offType = "SE";
        dataArray.push({...data});
        
        return (
            <>
                {dataArray.map((data, index) => {
                    return (
                        <tr key={index} className="historyRow historyBodyRow" onClick={handleRowClick}>
                            <td className="historyDate historyData"><span className="historySpan historyDateSpan">{data.date}</span></td>
                            <td className="historyBr historyData"><span className="historySpan historyBrSpan">{data.br}</span></td>
                            <td className="historyAcc historyData"><span className="historySpan historyAccSpan">{data.acc}</span></td>
                            <td className="historyName historyData"><span className="historySpan historyNameSpan">{data.name}</span></td>
                            <td className="historyAmount historyData"><span className="historySpan historyAmountSpan">{data.amount}</span></td>
                            <td className="historyProceeds historyData"><span className="historySpan historyProceedsSpan">{data.proceeds}</span></td>
                            <td className="historyPmtAmount historyData"><span className="historySpan historyPmtAmountSpan">{data.pmtAmount}</span></td>
                            <td className="historyOff historyData"><span className="historySpan historyOffSpan">{data.offType === "PO" ? "Paidoff" : data.offType === "CO" ? "ChargedOff" : "Settled"}: {data.offDate}</span></td>
                        </tr>
                    );
                })}
                </>
            );
        };

    return (
        <div>
            <div id="loanHistoryTableContainer">
                <table id="loanHistoryTable">
                    <thead id="historyHeader">
                        <tr id="historyHeaderRow" className="historyHeaderRow historyRow">
                            <th id="dateHeader" className="historyColHeader historyDate"><span className="historySpan">Date &<br />Time</span></th>
                            <th id="brHeader" className="historyColHeader historyBr"><span className="historySpan">Branch</span></th>
                            <th id="accHeader" className="historyColHeader historyAcc"><span className="historySpan">Account</span></th>
                            <th id="nameHeader" className="historyColHeader historyName"><span className="historySpan">Name</span></th>
                            <th id="amountHeader" className="historyColHeader historyAmount"><span className="historySpan">Loan Amount</span></th>
                            <th id="proceedsHeader" className="historyColHeader historyProceeds"><span className="historySpan">Proceeds</span></th>
                            <th id="pmtAmountHeader" className="historyColHeader historyPmtAmount"><span className="historySpan">Payment Amount</span></th>
                            <th id="offHeader" className="historyColHeader historyOff"><span className="historySpan">Closed Date</span></th>
                        </tr>
                    </thead>
                    <tbody id="historyBody">
                        {TableData()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LoanHistory;