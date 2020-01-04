import * as chai from "chai";

import { Book } from "../src/book";

const expect = chai.expect;

describe("Book", () => {
    const book = new Book("Test");

    describe("addAccount", () => {
        it("Should add an account to the account list", () => {
            expect(book.addAccount("DebitAccount"));
            expect(book.addAccount("CreditAccount"));
        })
    });

    describe("addTransaction", () => {
        it("Should add a transaction to the array of transactions", () => {
            expect(book.addTransaction("DebitAccount", "CreditAccount", 100.00));
        });
    });

    describe("validateBook", () => {
        it("Should not throw an error", () => {
            expect(book.validateBook());
        });
    });

    describe("getBalance", () => {
        it("Should return 0", () => {
            expect(book.getBalance()).to.be.equal(0);
        });
    });

    describe("getName", () => {
        it("Should return the name of the book", () => {
            expect(book.getName()).to.be.equal("Test");
        });
    });
});