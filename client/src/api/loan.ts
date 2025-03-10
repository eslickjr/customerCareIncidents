export const getCustomerLoans = async (customerInfo: any) => {
    try {
        const response = await fetch('/api/loan',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(customerInfo),
            }
        );

        if (response.status === 200) {
            const loans = await response.json();
            return loans;
        } else {
            return { error: 'Unable to get loans' };
        }
    } catch (error) {
        console.error(error);
    }
}

export const getLoanInfo = async (loanInfo: any) => {
    try {
        const response = await fetch(`/api/loan/info`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(loanInfo),
            },
        );

        if (response.status === 200) {
            const loan = await response.json();
            return loan;
        } else {
            return { error: 'Unable to get loan' };
        }
    } catch (error) {
        console.error(error);
    }
}