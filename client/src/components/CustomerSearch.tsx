import NewCustomer from "./NewCustomer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import '../styles/CustomerSearch.css';

interface SearchResultsI {
    branch: string;
    firstName: string;
    lastName: string;
    customerId?: number;
    loanId?: number;
}

const customerSearch = () => {
    const [searchResults, setSearchResults] = useState<SearchResultsI[][]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    
    const navigate = useNavigate();

    useEffect(() => {
        const searchEl = document.getElementById('searchResults');
        const searchInputEl = document.getElementById('searchInput');
        const searchBarEl = document.getElementById('searchBar');

        const handleFocusOut = () => {
            setTimeout(() => {
                if (document.activeElement !== searchEl && document.activeElement !== searchInputEl) {
                    if ((searchInputEl as HTMLInputElement)?.value.length > 2) {
                        searchEl?.style.setProperty('visibility', 'hidden');
                        searchBarEl?.style.setProperty('border-radius', '4px');
                    }
                }
            }, 0);
        };

        const handleFocus = () => {
            if ((searchInputEl as HTMLInputElement)?.value.length > 2) {
                searchEl?.style.setProperty('visibility', 'visible');
                searchBarEl?.style.setProperty('border-radius', '4px 4px 0 0');
            }
        };

        const handleScroll = () => {
            const rect = searchBarEl?.getBoundingClientRect();
            if (searchEl && rect) {
                searchEl.style.top = `${rect.bottom + window.scrollY}px`;
                searchEl.style.left = `${rect.left + window.scrollX}px`;
            }
        };

        searchInputEl?.addEventListener('blur', handleFocusOut);
        searchInputEl?.addEventListener('focus', handleFocus);
        document.body.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            searchInputEl?.removeEventListener('blur', handleFocusOut);
            searchInputEl?.removeEventListener('focus', handleFocus);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const searchEl = document.getElementById('searchResults');
        const searchBarEl = document.getElementById('searchBar');
        e.target.value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');

        if (e.target.value.length > 0) {
            if (e.target.value.charAt(0) === ' ') {
                e.target.value = e.target.value.slice(1);
                e.target.setSelectionRange(0, 0);
            } else if (isNaN(Number(e.target.value.charAt(0)))) {
                // Handle case where the first character is a number
                e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
            } else {
                e.target.value = e.target.value.replace(/[^0-9\s]/g, '');
                let formattedSearch = e.target.value.slice(0, 3);

                if (e.target.value.length > 3) {
                    formattedSearch += '-' + e.target.value.slice(3, 5);
                }

                if (e.target.value.length > 5) {
                    formattedSearch += '-' + e.target.value.slice(5, 9);
                }

                e.target.value = formattedSearch;
            }
        }
        
        if (e.target.value.length > 2) {
            /*const customers: CustomerI[] = await getCustomers({ name: e.target.value })
            const customerLoans: LoanI[] = await getCustomerLoans({ name: e.target.value })*/

            if (searchEl && searchBarEl) {
                searchEl.style.visibility = 'visible';
                searchEl.style.width = searchBarEl.clientWidth + 'px';
                searchBarEl.style.borderRadius = '4px 4px 0 0';
            }

            setSearchResults([[
                {
                    branch: '1234',
                    firstName: 'John',
                    lastName: 'Doe',
                    customerId: 1,
                    loanId: 123456

                },
            ], [
                {
                    branch: '5678',
                    firstName: 'James',
                    lastName: 'Austin',
                    customerId: 2,
                },
            ], [
                {
                    branch: '8765',
                    firstName: 'Emily',
                    lastName: 'Stratter',
                    loanId: 654321,
                }]]);
        } else {
            setSearchResults([]);

            if (searchEl) {
                searchEl.style.visibility = 'hidden';
            }

            if (searchBarEl) {
                searchBarEl.style.borderRadius = '4px';
            }
        }
    };

    const handleSearchClick = (index: number, customer: any): void => {
        if (index === 0) {
            //Check if customer has account
            //customer.loanid = getloans(customer.customerid)
            //
            if (customer.loanId) {
                // This navigates to the loan pulled from the customer.loanId
                navigate(`/customerAccount/${customer.loanId}`);
            } 
        } else if (index === 1) {
            // This navigates to the loan pulled from the loan.loanId
            navigate(`/noAccount/${customer.customerId}`);
        } else {
            // Create a customer object with the customer data
            // customer.id = createCustomer(customer)
            //

            // This navigates to the loan pulled from the customer.loanId
            navigate(`/customerAccount/${customer.loanId}`);
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <div>
            <div id="outerContainer">
                <div id="searchContainer">
                    <div id="searchBarContainer">
                        <div id="searchBar">
                            <input type="text" id="searchInput" onChange={handleSearchChange} placeholder="Search for customer..." />
                        </div>
                        <div id="searchResults" tabIndex={0}>
                            <ul id="searchResultsList">
                                {searchResults.map((customers, arrayIndex) => (
                                    customers.map((customer, index) => (
                                        <li key={`${arrayIndex}-${index}`} className="searchResult" onClick={() => handleSearchClick(arrayIndex, customer)}>
                                            <div className="branchContainer searchResultContainer">
                                                <p className="branchSearch">{customer.branch}</p>
                                            </div>
                                            <div className="nameContainer searchResultContainer">
                                                <p className="nameSearch">{customer.firstName} {customer.lastName}</p>
                                            </div>
                                            <div className="typeContainer searchResultContainer">
                                                {arrayIndex === 0 ? <p className="clSearch typeSearch">CL</p> : arrayIndex === 1 ? <p className="cxSearch typeSearch">CX</p> : <p className="lnSearch typeSearch">LN</p>}
                                            </div>
                                        </li>
                                    ))
                                ))}
                            </ul>
                        </div>
                    </div>
                    <input type="button" id="newCustomer" value="New Customer" onClick={openModal} />
                    <NewCustomer isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
        </div>
    );
}

export default customerSearch;