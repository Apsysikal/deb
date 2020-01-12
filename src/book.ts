import { Account } from "./account";
import { Transaction } from "./transaction";

export class Book {

    /**
     * Stores the name of the book.
     * The name is stored as a plain string.
     */
    private bookName: string;

    /**
     * Stores the current balance of the book.
     * The balance is normally zero. If the amount is not zero there is
     * likely an error in the book.
     * Upon creation of the book the balance is initially set to zero.
     */
    private balance: number;

    /**
     * Stores the accounts within this book. The accounts are
     * stored in an array of Account objects.
     * Upon creation the array is initialized as an empty array.
     */
    private accounts: Account[];

    /**
     * Stores the transactions made in this book. The transactions are
     * stored in an array of Transaction objects. Upon creation the
     * array is initialized as an empty array.
     */
    private transactions: Transaction[];

    constructor(bookName: string) {
        this.bookName = bookName;
        this.balance = 0;
        this.accounts = new Array<Account>();
        this.transactions = new Array<Transaction>();
    }

    /**
     * Adds an account to the array of accounts in this book.
     * This method does not check for duplicates.
     * @param account The account to be added to the book.
     */
    addAccount(account: Account): void {
        this.accounts.push(account);
    }

    /**
     * Tries to get the account debited and credited from the accounts stored
     * in the book. If either one cannot be found an error will be thrown.
     * Creates a transaction on the current date over the amount provided and
     * referencing the accounts provided.
     * @param accountDebitedName The name of the account to be debited.
     * @param accountCreditedName The name of the account to be credited.
     * @param amount The amount of the transaction.
     */
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

    /**
     * Searches the name of the accounts in the book for a match with 
     * the provided name.
     * Throws an error when multiple accounts with the same name are found.
     * Returns undefined if no account is found with the name provided.
     * @param accountName The name of the account to be looking for.
     */
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

    /**
     * Returns the latest transaction made in the book. If no transaction
     * exists the method returns undefined.
     */
    public getLatestTransaction(): Transaction | undefined {
        return this.transactions.pop();
    }

    /**
     * Recalculates the balance of the book by look at the balances of the
     * acocunts stored in the book.
     * Throws an error when the balance is not zero after looking at all the acounts.
     */
    validateBook(): void {
        let currentBalance = 0.0;

        this.accounts.forEach(account => {
            currentBalance += account.getBalance();
        });

        if (currentBalance != 0) {
            throw new Error(`Book doesn't balance out to zero. The current balance ist ${currentBalance}`);
        }
    }

    /**
     * Returns the balance of the book.
     * This should normally return zero. If it does not return zero
     * there is likely an error in the book.
     */
    getBalance(): number {
        return this.balance;
    }

    /**
     * Returns the name of the book.
     */
    getName(): string {
        return this.bookName;
    }
}