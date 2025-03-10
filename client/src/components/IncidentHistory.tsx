// import { useRef } from 'react';
import '../styles/IncidentHistory.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IncidentHistory = () => {
    //const historyRef = useRef<HTMLTableSectionElement>();
    const navigate = useNavigate();

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

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
        const row = e.currentTarget;
        const cells = row.getElementsByClassName("historyData");

        const span = (cells[2].getElementsByClassName("historySpan")[0] as HTMLElement).innerText;

        navigate(`/CustomerAccount/${span}`);
    }

    const TableData = () => {
        const dataArray = [];
        const data = {
            date: "12/12/2021 12:00",
            br: "1234",
            acc: "123456",
            name: "John Doe",
            phone: "(123) 456-7890",
            issue: "Login Issue",
            action: "Password Reset",
            ad: "Email: JohnDoe@gmail.com\nAddress: 1234 Elm St. Dallas, TX 75201"
        };
        dataArray.push({...data});
        data.ad = "Email: JDoe@gmail.com\nAddress: 1234 Elm St. Dallas, TX 75201";
        dataArray.push({...data});
        data.ad = "Email: JohnD@gmail.com\nAddress: 1234 Elm St. Dallas, TX 75201";
        data.name = "John Doejfkldjaflkjifejiafjlekjkjfdsal"
        data.issue = "Login Issuejfkldjaflkjifejiafjlekjkjfdsal"
        data.action = "Password Resetjfkldjaflkjifejiafjlekjkjfdsal"
        dataArray.push({...data});
        
        return (
            <>
            {dataArray.map((data, index) => {
                return (
                <tr key={index} className="incHistoryRow incHistoryBodyRow" onClick={handleRowClick}>
                    <td className="incHistoryDate incHistoryData"><span className="incHistorySpan incHistoryDateSpan">{data.date}</span></td>
                    <td className="incHistoryBr incHistoryData"><span className="incHistorySpan incHistoryBrSpan">{data.br}</span></td>
                    <td className="incHistoryAcc incHistoryData"><span className="incHistorySpan incHistoryAccSpan">{data.acc}</span></td>
                    <td className="incHistoryName incHistoryData"><span className="incHistorySpan incHistoryNameSpan">{data.name}</span></td>
                    <td className="incHistoryPhone incHistoryData"><span className="incHistorySpan incHistoryPhoneSpan">{data.phone}</span></td>
                    <td className="incHistoryIssue incHistoryData"><span className="incHistorySpan incHistoryIssueSpan">{data.issue}</span></td>
                    <td className="incHistoryAct incHistoryData"><span className="incHistorySpan incHistoryActSpan">{data.action}</span></td>
                    <td className="incHistoryAD incHistoryData"><span className="incHistorySpan incHistoryADSpan">{data.ad}</span></td>
                </tr>
                );
            })}
            </>
            );
        };

        return (
        <div id="incComponent">
            <div id="incHistoryTableContainer">
            <table id="incHistoryTable">
                <thead id="incHistoryHeader">
                <tr id="incHistoryHeaderRow" className="incHistoryHeaderRow incHistoryRow">
                    <th id="incDateHeader" className="incHistoryColHeader incHistoryDate"><span className="incHistorySpan">Date &<br />Time</span></th>
                    <th id="brHeader" className="incHistoryColHeader incHistoryBr"><span className="incHistorySpan">Br</span></th>
                    <th id="accHeader" className="incHistoryColHeader incHistoryAcc"><span className="incHistorySpan">Acc</span></th>
                    <th id="nameHeader" className="incHistoryColHeader incHistoryName"><span className="incHistorySpan">Name</span></th>
                    <th id="phoneHeader" className="incHistoryColHeader incHistoryPhone"><span className="incHistorySpan">Phone</span></th>
                    <th id="issueHeader" className="incHistoryColHeader incHistoryIssue"><span className="incHistorySpan">Issue</span></th>
                    <th id="actHeader" className="incHistoryColHeader incHistoryAct"><span className="incHistorySpan">Action</span></th>
                    <th id="adHeader" className="incHistoryColHeader incHistoryAD"><span className="incHistorySpan">Additional Details</span></th>
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

export default IncidentHistory;