import * as chai from "chai";

import { Account } from "../src/account";
import { Transaction } from "../src/transaction";

const expect = chai.expect;

describe("Account", () => {
    describe("debit", () => {
        it("Adds a debit transaction to the account", () => {
            const accountDebited = new Account("DebitAccount");
            const accountCredited = new Account("CreditAccount");

            const transaction = new Transaction({
                accountDebited: accountDebited,
                accountCredited: accountCredited,
                amount: 50.00,
            });

            accountDebited.debit(transaction);

            const latestTransaction = accountDebited.getLatestTransaction();

            expect(latestTransaction).to.exist;
        });
    });

    describe("credit", () => {
        it("Adds a debit transaction to the account", () => {
            const accountDebited = new Account("DebitAccount");
            const accountCredited = new Account("CreditAccount");

            const transaction = new Transaction({
                accountDebited: accountDebited,
                accountCredited: accountCredited,
                amount: 50.00,
            });

            accountCredited.credit(transaction);

            const latestTransaction = accountCredited.getLatestTransaction();

            expect(latestTransaction).to.exist;
        });
    });

    describe("getLatestTransaction", () => {
        it("Returns the latest transaction", () => {
            const accountDebited = new Account("DebitAccount");
            const accountCredited = new Account("CreditAccount");

            const transaction = new Transaction({
                accountDebited: accountDebited,
                accountCredited: accountCredited,
                amount: 13.37,
            });

            accountDebited.debit(transaction);
            accountCredited.credit(transaction);

            const latestDebitTransaction = accountDebited.getLatestTransaction();
            const latestCreditTransaction = accountCredited.getLatestTransaction();

            expect(latestDebitTransaction).to.exist;
            expect(latestDebitTransaction?.getDebitAccount()).to.deep.equal(accountDebited);
            expect(latestDebitTransaction?.getCreditAccount()).to.deep.equal(accountCredited);
            expect(latestDebitTransaction?.getAmount()).to.deep.equal(transaction.getAmount());

            expect(latestCreditTransaction).to.exist;
            expect(latestCreditTransaction?.getDebitAccount()).to.deep.equal(accountDebited);
            expect(latestCreditTransaction?.getCreditAccount()).to.deep.equal(accountCredited);
            expect(latestCreditTransaction?.getAmount()).to.deep.equal(transaction.getAmount());
        });
    });

    describe("getName", () => {
        it("Returns the name of the account", () => {
            const account = new Account("TestAccount");

            expect(account.getName()).to.deep.equal("TestAccount");
        });
    });

    describe("getBalance", () => {
        it("Returns the current balance of the account", () => {
            const accountDebited = new Account("DebitAccount");
            const accountCredited = new Account("CreditAccount");

            const transaction = new Transaction({
                accountDebited: accountDebited,
                accountCredited: accountCredited,
                amount: 13.37
            });

            accountDebited.debit(transaction);
            accountCredited.credit(transaction);

            expect(accountDebited.getBalance()).to.deep.equal(transaction.getAmount());
            expect(accountCredited.getBalance()).to.deep.equal(-transaction.getAmount())
        });
    });
});