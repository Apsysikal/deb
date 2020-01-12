import { Transaction } from "./transaction";

export class Account {

    /**
     * Stores the name of the account.
     * The name is stored as a plain string.
     */
    private accountName: string;

    /**
     * Stores the balance of the account.
     * If the balance is negative the account has been credited more
     * than it has been debited.
     * If the balance is positive the account has been debited more
     * than it has been credited.
     * Upon creation the balalnce is initialized to zero.
     */
    private balance: number;

    /**
     * Stores the transactions made to this account.
     * The transactions are stored in an array of Transaction objects.
     * Upon creation the array is initialized as an empty array.
     */
    private transactions: Transaction[];

    constructor(accountName: string) {
        this.accountName = accountName;
        this.balance = 0;
        this.transactions = new Array<Transaction>();
    }

    /**
     * Adds the provided transaction to the transactions stored in the account.
     * Adds the amount of the transaction to the balance of the account.
     * @param transaction Transaction to be debited to the account.
     */
    debit(transaction: Transaction): void {
        this.transactions.push(transaction);
        this.balance += transaction.getAmount();
    }

    /**
     * Adds the provided transaction to the transactions stored in the account.
     * Subtracts the amount of the transaction off the balance of the account.
     * @param transaction Transaction to be credited to the account.
     */
    credit(transaction: Transaction): void {
        this.transactions.push(transaction);
        this.balance -= transaction.getAmount();
    }

    /**
     * Returns the latest transaction of the account.
     * If no transaction has been made to the account undefined is returned.
     */
    getLatestTransaction(): Transaction | undefined {
        return this.transactions.pop();
    }

    /**
     * Returns the name of the account.
     */
    getName(): string {
        return this.accountName;
    }

    /**
     * Returns the balance of the account.
     * If the balance is negative the account has been credited more
     * than it has been debited.
     * If the balance is positive the account has been debited more
     * than it has been credited.
     */
    getBalance(): number {
        return this.balance;
    }
}