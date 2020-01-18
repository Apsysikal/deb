import * as chai from "chai";

import { Book } from "../src/book";
import { Account } from "../src/account";

const expect = chai.expect;

describe("Book", () => {
    describe("addAccount", () => {
        const book = new Book("Test");

        it("Should add debit and a credit account to the account list", () => {
            const debitAccount = new Account("DebitAccount");
            const creditAccount = new Account("CreditAccount");

            book.addAccount(debitAccount);
            book.addAccount(creditAccount);

            expect(book.getAccountByName(debitAccount.getName())).to.exist;
            expect(book.getAccountByName(creditAccount.getName())).to.exist;
        });
    });

    describe("addTransaction", () => {
        it("Should add a transaction to the array of transactions", () => {
            const book = new Book("Test");

            const debitAccount = new Account("DebitAccount");
            const creditAccount = new Account("CreditAccount");

            book.addAccount(debitAccount);
            book.addAccount(creditAccount);

            book.addTransaction("DebitAccount", "CreditAccount", 100.00);


            const latestTransaction = book.getLatestTransaction();

            expect(latestTransaction?.getDebitAccount().getName()).to.deep.equal("DebitAccount");
            expect(latestTransaction?.getCreditAccount().getName()).to.deep.equal("CreditAccount");
            expect(latestTransaction?.getAmount()).to.deep.equal(100.00);
        });

        it("Should throw an error when the account to be debited does not exist", () => {
            const book = new Book("Test");

            const creditAccount = new Account("CreditAccount");

            book.addAccount(creditAccount);

            expect(() => { book.addTransaction("DebitAccount", "CreditAccount", 100.00); }).to.throw("The account to be debited does not exist");
        });

        it("Should throw an error when the account to be credited does not exist", () => {
            const book = new Book("Test");

            const creditAccount = new Account("DebitAccount");

            book.addAccount(creditAccount);

            expect(() => { book.addTransaction("DebitAccount", "CreditAccount", 100.00); }).to.throw("The account to be credited does not exist");
        });
    });

    describe("getAccountByName", () => {
        it("Should return an account with the name provided", () => {
            const book = new Book("Test");
            const account = new Account("TestAccount");

            book.addAccount(account);

            expect(book.getAccountByName("TestAccount")).to.deep.equal(account);
        });

        it("Should throw an error when there are multiple accounts with the same name", () => {
            const book = new Book("Test");
            const account = new Account("TestAccount");

            book.addAccount(account);
            book.addAccount(account);

            expect(() => { book.getAccountByName("TestAccount"); }).to.throw("Multiple accounts with the same name found");
        });

        it("Should return undefined when no account exists with this name", () => {
            const book = new Book("Test");

            expect(book.getAccountByName("TestAccount")).to.not.exist;
        });
    });

    describe("validateBook", () => {
        const book = new Book("Test");

        const debitAccount = new Account("DebitAccount");
        const creditAccount = new Account("CreditAccount");

        book.addAccount(debitAccount);
        book.addAccount(creditAccount);

        book.addTransaction("DebitAccount", "CreditAccount", 100.00);

        it("Should not throw an error", () => {
            expect(book.validateBook());
        });
    });

    describe("getLatestTransaction", () => {
        it("Should return the latest transaction", () => {
            const book = new Book("Test");

            const debitAccount = new Account("DebitAccount");
            const creditAccount = new Account("CreditAccount");

            book.addAccount(debitAccount);
            book.addAccount(creditAccount);

            book.addTransaction("DebitAccount", "CreditAccount", 100.00);


            const latestTransaction = book.getLatestTransaction();

            expect(latestTransaction).to.exist;
        });

        it("Should return undefined when no transaction exists", () => {
            const book = new Book("Test");

            expect(book.getLatestTransaction()).to.not.exist;
        });
    });

    describe("getBalance", () => {
        const book = new Book("Test");

        const debitAccount = new Account("DebitAccount");
        const creditAccount = new Account("CreditAccount");

        book.addAccount(debitAccount);
        book.addAccount(creditAccount);

        book.addTransaction("DebitAccount", "CreditAccount", 100.00);

        it("Should return 0", () => {
            expect(book.getBalance()).to.be.equal(0);
        });
    });

    describe("getName", () => {
        const book = new Book("Test");

        const debitAccount = new Account("DebitAccount");
        const creditAccount = new Account("CreditAccount");

        book.addAccount(debitAccount);
        book.addAccount(creditAccount);

        book.addTransaction("DebitAccount", "CreditAccount", 100.00);

        it("Should return the name of the book", () => {
            expect(book.getName()).to.be.equal("Test");
        });
    });
});