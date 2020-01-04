export interface ITransaction {
    uid: number;
    date: number;
    accountDebited: Account;
    accountCredited: Account;
    amount: number;
    description: string | null;
}

export class Account {
    private accountName: string;
    private balance: number;
    private transactions: ITransaction[];

    constructor(accountName: string, balance = 0) {
        this.accountName = accountName;
        this.balance = balance;
        this.transactions = new Array<ITransaction>();
    }

    debit(transaction: ITransaction) {
        this.transactions.push(transaction);
        this.balance += transaction.amount;
    }

    credit(transaction: ITransaction) {
        this.transactions.push(transaction);
        this.balance -= transaction.amount;
    }

    getName() {
        return this.accountName;
    }

    getBalance() {
        return this.balance;
    }
}

module.exports = {
    Account
}