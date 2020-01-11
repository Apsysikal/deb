import { Account } from "./account";
import { Transaction } from "./transaction";

export class Book {

    private bookName: string;
    private balance: number;
    private accounts: Account[];
    private transactions: Transaction[];

    constructor(bookName: string, balance = 0) {
        this.bookName = bookName;
        this.balance = balance;
        this.accounts = new Array<Account>();
        this.transactions = new Array<Transaction>();
    }

    addAccount(account: Account): void {
        this.accounts.push(account);
    }

    addTransaction(accountDebitedName: string, accountCreditedName: string, amount: number): void {
        const accountDebited = this.getAccountByName(accountDebitedName);
        const accountCredited = this.getAccountByName(accountCreditedName);

        if (!accountDebited) { throw new Error("The account to be debited does not exist"); }
        if (!accountCredited) { throw new Error("The account to be credited does not exist"); }

        const transaction = new Transaction({
            transactionDate: Date.now(),
            accountDebited: accountDebited,
            accountCredited: accountCredited,
            amount: amount
        });

        this.transactions.push(transaction);

        accountDebited.debit(transaction);
        accountCredited.credit(transaction);

        this.balance += accountDebited.getBalance();
        this.balance += accountCredited.getBalance();

        this.validateBook();
    }

    public getAccountByName(accountName: string): Account | undefined {
        const filteredAccounts = this.accounts.filter((account) => {
            if (account.getName() === accountName) {
                return true;
            } else {
                return false;
            }
        });

        if (filteredAccounts.length > 1) {
            throw new Error("Multiple accounts with the same name found");
        }

        if (filteredAccounts.length < 1) {
            return undefined;
        }

        return filteredAccounts[0];
    }

    public getLatestTransaction(): Transaction | undefined {
        return this.transactions.pop();
    }

    validateBook(): void {
        let currentBalance = 0.0;

        this.accounts.forEach(account => {
            currentBalance += account.getBalance();
        });

        if (currentBalance != 0) {
            throw new Error(`Book doesn't balance out to zero. The current balance ist ${currentBalance}`);
        }
    }

    getBalance(): number {
        return this.balance;
    }

    getName(): string {
        return this.bookName;
    }
}