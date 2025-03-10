

import Incident from "../components/Incident";
import IncidentHistory from "../components/IncidentHistory";

const NoAccount = () => {
    return (
        <div id="noAccount">
            <h1 id="incTitle">Incident</h1>
            <Incident />
            <h1 id="historyTitle">Incident History</h1>
            <IncidentHistory />
        </div>
    );
}

export default NoAccount;