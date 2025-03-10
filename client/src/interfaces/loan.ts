

export default interface LoanI {
    loanId: number,
    firstName: string,
    lastName: string,
    ssn: string,
    branch: number,
    amount: number,
    class: string,
    loanDate: string,
    proceeds: number,
    balance: number,
    pmtAmt: number,
    pmtDue: string,
    pmtDate: string,
    payoff?: number,
    payoffDate?: string,
    payoffAmount?: number,
    payoffCode?: string,
    delinquency: number,
    chargeoffDate?: string
}