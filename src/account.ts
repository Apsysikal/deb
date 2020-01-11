import { Transaction } from "./transaction";

export class Account {
    private accountName: string;
    private balance: number;
    private transactions: Transaction[];

    constructor(accountName: string, balance = 0) {
        this.accountName = accountName;
        this.balance = balance;
        this.transactions = new Array<Transaction>();
    }

    debit(transaction: Transaction): void {
        this.transactions.push(transaction);
        this.balance += transaction.getAmount();
    }

    credit(transaction: Transaction): void {
        this.transactions.push(transaction);
        this.balance -= transaction.getAmount();
    }

    getName(): string {
        return this.accountName;
    }

    getBalance(): number {
        return this.balance;
    }
}