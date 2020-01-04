import { Account, ITransaction } from "./account";

export class Book {

    private bookName: string;
    private balance: number;
    private accounts: Account[];

    constructor(bookName: string, balance = 0) {
        this.bookName = bookName;
        this.balance = balance;
        this.accounts = new Array<Account>();
    }

    addAccount(accountName: string, balance = 0) {
        const account = new Account(accountName, balance);
        this.accounts.push(account);
    }

    addTransaction(accountDebitedName: string, accountCreditedName: string, amount: number) {
        const accountDebited = this.getAccountByName(accountDebitedName);
        const accountCredited = this.getAccountByName(accountCreditedName);

        const transaction: ITransaction = {
            uid: 1,
            date: Date.now(),
            accountDebited: accountDebited,
            accountCredited: accountCredited,
            amount: amount,
            description: null
        }

        accountDebited.debit(transaction);
        accountCredited.credit(transaction);

        this.balance += accountDebited.getBalance();
        this.balance += accountCredited.getBalance();

        this.validateBook();
    }

    private getAccountByName(accountName: string): Account {
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
            throw new Error(`No account found with name: ${accountName}`);
        }

        return filteredAccounts[0];
    }

    validateBook() {
        let currentBalance = 0.0;

        this.accounts.forEach(account => {
            currentBalance += account.getBalance();
        });

        if (currentBalance != 0) {
            throw new Error(`Book doesn't balance out to zero. The current balance ist ${currentBalance}`);
        }
    }

    getBalance() {
        return this.balance;
    }

    getName() {
        return this.bookName;
    }
}