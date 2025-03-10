export const createTicket = async (ticket: any) => {
  try {
    const response = await fetch(`/api/ticket`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(ticket),
    });

    if (response.status === 201) {
        const ticketData = await response.json();
        return ticketData;
    } else {
      return { error: 'Unable to create ticket' };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserTickets = async (userId: any) => {
  try {
    const response = await fetch(`/api/ticket/${userId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );

    if (response.status === 200) {
      const tickets = await response.json();
      return tickets;
    } else {
      return { error: 'Unable to get tickets' };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCustomerTickets = async (cusomterId: any) => {
  try {
    const response = await fetch(`/api/ticket/customer/${cusomterId}`,
        {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );

    if (response.status === 200) {
      const tickets = await response.json();
      return tickets;
    } else {
      return { error: 'Unable to get tickets' };
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateTicket = async (ticket: any) => {
  try {
    const response = await fetch(`/api/ticket`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(ticket),
    });

    if (response.status === 200) {
      const ticketData = await response.json();
      return ticketData;
    } else {
      return { error: 'Unable to update ticket' };
    }
  } catch (error) {
    console.error(error);
  }
};