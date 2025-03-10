export const createCustomer = async (customer: any) => {
    try {
      const response = await fetch(`/api/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(customer),
      });
  
      if (response.status === 201) {
          const customerData = await response.json();
          return customerData;
      } else {
        return { error: 'Unable to create customer' };
      }
    } catch (error) {
      console.error(error);
    }
  };

  export const getCustomers = async (customerInfo: any) => {
    try {
        const response = await fetch(`/api/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(customerInfo),
        });

        if (response.status === 200) {
            const customers = await response.json();
            return customers;
        } else {
            return { error: 'Unable to get customers' };
        }
    } catch (error) {
        console.error(error);
    }
};
  
  export const getCustomer = async (loan: any) => {
    try {
      const response = await fetch(`/api/customer/loan`,
          {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(loan),
          }
      );
  
      if (response.status === 200) {
        const customerData = await response.json();
        return customerData;
      } else {
        return { error: 'Unable to get tickets' };
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateCustomer = async (customer: any) => {
    try {
        const response = await fetch(`/api/customer`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(customer),
        });

        if (response.status === 200) {
            const customerData = await response.json();
            return customerData;
        } else {
            return { error: 'Unable to update customer' };
        }
    } catch (error) {
        console.error(error);
    }
};