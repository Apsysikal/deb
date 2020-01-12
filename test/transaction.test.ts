import * as chai from "chai";

import { Account } from "../src/account";
import { Transaction } from "../src/transaction";

const expect = chai.expect;

describe("Transaction", () => {
    let transaction: Transaction;

    describe("constructorWithDate", () => {
        const date = Date.now();

        it("Creates a Transaction with a specified date", () => {
            transaction = new Transaction({
                transactionDate: date,
                accountDebited: new Account("DebitedAccount"),
                accountCredited: new Account("CreditedAccount"),
                amount: 50.12
            });

            expect(transaction.getTransactionDate()).to.deep.equal(date);
        });
    });

    describe("constructorWithoutDate", () => {
        it("Creates a Transaction without a specified date", () => {
            transaction = new Transaction({
                accountDebited: new Account("DebitedAccount"),
                accountCredited: new Account("CreditedAccount"),
                amount: 50.12
            });

            expect(transaction.getTransactionDate()).to.exist;
        });
    });

    describe("updateDebitAccount", () => {
        it("Should update the debit account of the transaction", () => {
            const newAccount = new Account("NewDebitAccount");

            transaction.updateDebitAccount(newAccount);

            expect(transaction.getDebitAccount()).to.deep.equal(newAccount);
        });
    });

    describe("updateCreditAccount", () => {
        it("Should update the credit account of the transaction", () => {
            const newAccount = new Account("NewCreditAccount");

            transaction.updateCreditAccount(newAccount);

            expect(transaction.getCreditAccount()).to.deep.equal(newAccount);
        });
    });

    describe("updateTransactionDate", () => {
        it("Should update the date of the transaction", () => {
            const newDate = Date.now();

            transaction.updateTransactionDate(newDate);

            expect(transaction.getTransactionDate()).to.deep.equal(newDate);
        });
    });

    describe("updateAmount", () => {
        it("Should update the amount of the transaction", () => {
            const newAmount = 500.13;

            transaction.updateAmount(newAmount);

            expect(transaction.getAmount()).to.be.deep.equal(newAmount);
        });
    });
});