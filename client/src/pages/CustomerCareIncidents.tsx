/*import { getCustomerLoans } from "../api/loan";
import { getCustomers, createCustomer } from "../api/customer";*/

import IncidentHistory from "../components/IncidentHistory";
import CustomerSearch from "../components/CustomerSearch"

import '../styles/CustomerCareIncidents.css';

const CustomerCareIncidents = () => {
    return (
        <div id="CustomerCareIncidents">
            <h1 id="searchTitle">Customer Search</h1>
            <CustomerSearch />
            <h1 id="historyTitle">Incident History</h1>
            <IncidentHistory />
        </div>
    );
}

export default CustomerCareIncidents;
