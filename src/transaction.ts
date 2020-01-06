import { Account } from "./account";

export interface ITransaction {
    transactionDate?: number;
    accountDebited: Account;
    accountCredited: Account;
    amount: number;
    description?: string;
}

interface ITransactionModification {
    modificationDate: number;
    modificationMessage: string;
    oldProperty: Account | number;
}

// TODO: Generate truly unique numbers
function generateUid(): number {
    return 0;
}

export class Transaction {

    /**
     * Stores the date when the last modification was made to the transaction.
     * The date is stored in the number format received from Date.now()
     * Upon creation of a new transaction the variable is set to the current date.
     */
    private lastModifiedDate: number;

    /**
     * Stores the date when the transaction happend.
     * The date is stored in the number format received from Date.now()
     * Upon creation, if no other date is provided, the variable is set to the current date.
     */
    private transactionDate: number;

    /**
     * Stores the modifications made to the transaction.
     * The modifications are stored in the format of the ITransactionModification interface.
     */
    private history: ITransactionModification[];

    /**
     * Stores the account, which is debited by the transaction.
     * The account ist stored as an account object.
     */
    private accountDebited: Account;

    /**
     * Stores the account, which is credited by the transaction.
     * The account ist stored as an account object.
     */
    private accountCredited: Account;

    /**
     * Stores the amount, which is debited/credited to the accounts by this transaction.
     * The amount ist stored as a normal number.
     * 
     * TODO: Maybe errors will occur when rounding isn't done correctly by the engine. At
     * this point the type or format in which the amount is stored should be changed.
     */
    private amount: number;

    /**
     * Stores the unique ID of the transaction.
     * Upon creation a unique ID is generated. This ID is unique to the system and 
     * cannot be changed at any point.
     */
    public readonly uid: number;

    /**
     * Stores the date when the transaction was created.
     * The date is stored in the number format received from Date.now()
     * Upon creation the variable is set to the current date.
     */
    public readonly createdDate: number;

    /**
     * Stores a description of the transaction as a string.
     * Upon creation the variable is set to an empty string if no
     * description is provided.
     */
    public description: string;

    constructor(transaction: ITransaction) {

        const currentDate = Date.now();

        this.uid = generateUid();
        this.createdDate = currentDate;
        this.transactionDate = transaction.transactionDate || currentDate;
        this.lastModifiedDate = currentDate;
        this.accountDebited = transaction.accountDebited;
        this.accountCredited = transaction.accountCredited;
        this.amount = transaction.amount;
        this.description = transaction.description || "";
        this.history = new Array<ITransactionModification>();
    }

    /**
     * Takes a modification object and pushes it to the transaction modification history.
     * @param modification The modification object, which is pushed to the transaction
     * history.
     */
    private transactionUpdate(modification: ITransactionModification): void {
        this.history.push(modification);
    }

    /**
     * Updates the debit account of the transaction with the new account.
     * The currently active debit account gets pushed to the transaction modification history.
     * @param newAccount The new account object.
     */
    public updateDebitAccount(newAccount: Account): void {
        const currentDate = Date.now();
        const oldProperty = this.accountDebited;
        const updateMessage = "Debit Account Update";

        const modification = {
            modificationDate: currentDate,
            modificationMessage: updateMessage,
            oldProperty: oldProperty
        }

        this.lastModifiedDate = currentDate;
        this.accountDebited = newAccount;

        this.transactionUpdate(modification);
    }

    /**
     * Updates the credit account of the transaction with the new account.
     * The currently active credit account gets pushed to the transaction modification history.
     * @param newAccount The new account object.
     */
    public updateCreditAccount(newAccount: Account): void {
        const currentDate = Date.now();
        const oldProperty = this.accountCredited;
        const updateMessage = "Credit Account Update";

        const modification = {
            modificationDate: currentDate,
            modificationMessage: updateMessage,
            oldProperty: oldProperty
        }

        this.lastModifiedDate = currentDate;
        this.accountCredited = newAccount;

        this.transactionUpdate(modification);
    }

    /**
     * Updates the date of the transaction.
     * The currently active date gets pushed to the transaction modification history.
     * @param newDate The new date for the transaction.
     */
    public updateTransactionDate(newDate: number): void {
        const currentDate = Date.now();
        const oldProperty = this.transactionDate;
        const updateMessage = "Transaction Date Update";

        const modification = {
            modificationDate: currentDate,
            modificationMessage: updateMessage,
            oldProperty: oldProperty
        }

        this.lastModifiedDate = currentDate;
        this.transactionDate = newDate;

        this.transactionUpdate(modification);
    }

    /**
     * Updates the amount of the transaction.
     * The old amount gets pushed to the transaction modification history.
     * @param newAmount The new amount for the transaction.
     */
    public updateAmount(newAmount: Account): void {
        const currentDate = Date.now();
        const oldProperty = this.amount;
        const updateMessage = "Amount Update";

        const modification = {
            modificationDate: currentDate,
            modificationMessage: updateMessage,
            oldProperty: oldProperty
        }

        this.lastModifiedDate = currentDate;
        this.accountDebited = newAmount;

        this.transactionUpdate(modification);
    }
}