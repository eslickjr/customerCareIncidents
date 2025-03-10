

import { useState } from 'react';

import ChartIncPer from '../components/ChartIncPer';
import ChartIncType from '../components/ChartIncType';
import ChartSolByInc from '../components/ChartSolByInc';

import '../styles/UserStats.css';


const UserStats = () => {
    const [dayTime, setDayTime] = useState("");
    const [weekTime, setWeekTime] = useState("");
    const [monthTime, setMonthTime] = useState("statsTimeSelected");
    const [timeFrame, setTimeFrame] = useState("Month");

    const [incidents, setIncidents] = useState(3000);
    const [totalTime, setTotalTime] = useState(648000);

    const calculateTime = (time: number) => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    const dayClick = () => {
        setDayTime("statsTimeSelected");
        setWeekTime("");
        setMonthTime("");
        setTimeFrame("24 hours");
        setIncidents(100);
        setTotalTime(21600)
    }

    const weekClick = () => {
        setDayTime("");
        setWeekTime("statsTimeSelected");
        setMonthTime("");
        setTimeFrame("Week");
        setIncidents(700)
        setTotalTime(151200)
    }

    const monthClick = () => {
        setDayTime("");
        setWeekTime("");
        setMonthTime("statsTimeSelected");
        setTimeFrame("Month");
        setIncidents(3000);
        setTotalTime(648000);
    }

    return (
        <div>
            <h1 id="statsTitle">Stats</h1>
            <div id="outerStatsContainer">
                <div id="statsContainer">
                    <div id="statsTimeContainer">
                        <input type="button" id="day" className={`statsTimeButton ${dayTime}`} value="Day" onClick={dayClick}/>
                        <input type="button" id="week" className={`statsTimeButton ${weekTime}`} value="Week" onClick={weekClick}/>
                        <input type="button" id="month" className={`statsTimeButton ${monthTime}`} value="Month" onClick={monthClick}/>
                    </div>
                    <div id="statsTableOuterContainer">
                        <div id="statsTableContainer">
                            <table id="statsTable">
                                <tbody id="statsBody">
                                    <tr id="statsTotalIncRow" className="statsBodyRow statsRow">
                                        <th id="totalIncHeader" className="statsRowHeader statsTotalInc"><span className="statsSpan">Total Incidents</span></th>
                                        <td className="statsTotalInc statsData"><span className="statsSpan statsTotalIncSpan">{incidents}</span></td>
                                    </tr>
                                    <tr id="statsTotalTimeRow" className="statsRow statsBodyRow">
                                        <th id="totalTimeHeader" className="statsRowHeader statsTotalTime"><span className="statsSpan">Total Time</span></th>
                                        <td className="statsTotalTime statsData"><span className="statsSpan statsTotalTimeSpan">{calculateTime(totalTime)}</span></td>
                                    </tr>
                                    <tr id="statsAvgResRow" className="statsRow statsBodyRow">
                                        <th id="avgResHeader" className="statsRowHeader statsavgRes"><span className="statsSpan">Average Resolution Time</span></th>
                                        <td className="statsAvgRes statsData"><span className="statsSpan statsAvgResSpan">{calculateTime(totalTime/incidents)}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="incPerContainer">
                        <ChartIncPer chartTitle={timeFrame} incidents={incidents} />
                    </div>
                    <div id = "incTypeContainer">
                        <ChartIncType />
                        <div id="solByIncContainer">
                            <ChartSolByInc />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserStats;