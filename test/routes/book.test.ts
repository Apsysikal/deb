import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as dotenv from "dotenv";
import { app } from "../../src/app";
import * as database from "../../src/database";
import { Mongoose } from "mongoose";

dotenv.config({ path: "../../.env" });

chai.use(chaiHttp);

let db: Mongoose;

const request = chai.request.agent(app);

describe("Endpoint /book", async () => {
    before(async () => {
        db = await database.connect("testing");
    });

    beforeEach(async () => {
        try { await db.connection.dropCollection("books"); } catch{ };
    });

    after(async () => {
        try { await db.connection.dropCollection("books"); } catch{ };
        await db.disconnect();
    });

    describe("POST /book with a valid body", async () => {
        const requestBody = {
            name: "My checking book"
        };

        it("Returns a 201 response code", async () => {
            try {
                const response = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.have.status(201);
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object in json format", async () => {
            try {
                const response = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.be.json;
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object matching the provided data", async () => {
            try {
                const response = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response.body._id).to.exist;
                expect(response.body.name).to.deep.equal(requestBody.name);
                expect(response.body.balance).to.deep.equal(0.0);
            } catch (error) {
                throw error;
            }
        });
    });

    describe("POST /book with an invalild body", async () => {
        const requestBody = {};

        it("Returns a 400 status code", async () => {
            try {
                const response = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.have.status(400);
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object in json format", async () => {
            try {
                const response = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.be.json;
            } catch (error) {
                throw error;
            }
        });

        it("Returns an error object containing the error", async () => {
            try {
                const response = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.contain(/error?s/);
            } catch (error) {
                throw error;
            }
        });
    });

    describe("GET /book", async () => {
        it("Returns a 200 status code", async () => {
            try {
                const response = await request
                    .get("/book");

                expect(response).to.have.status(200);
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object in JSON format", async () => {
            try {
                const response = await request
                    .get("/book");

                expect(response).to.be.json;
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object containing all books", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                for (let i = 0; i < 3; i++) {
                    await request
                        .post("/book")
                        .set("Content-Type", "application/json")
                        .send(requestBody);
                };

                const response = await request
                    .get("/book");

                expect(response.body.length).to.be.greaterThan(2);
            } catch (error) {
                throw error;
            }
        });
    });

    describe("GET /book/:id", async () => {
        it("Returns a 200 status code", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                const book = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                const response = await request
                    .get("/book?id=" + book.body["_id"]);

                expect(response).to.have.status(200);
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object in JSON format", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                const book = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                const response = await request
                    .get("/book/" + book.body["_id"]);

                expect(response).to.be.json;
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object containing the book", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                const book = await request
                    .post("/book")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                const response = await request
                    .get("/book/" + book.body["_id"]);

                expect(response.body["_id"]).to.deep.equal(book.body["_id"]);
                expect(response.body["name"]).to.deep.equal(book.body["name"]);
            } catch (error) {
                throw error;
            }
        });
    });

    describe("GET /book/:id with an invalid id", async () => {
        it("Returns a 400 status code", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                const response = await request
                    .get("/book/" + "INVALID ID")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.have.status(400);
            } catch (error) {
                throw error;
            }
        });

        it("Returns an object in json format", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                const response = await request
                    .get("/book/" + "INVALID ID")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.be.json;
            } catch (error) {
                throw error;
            }
        });

        it("Returns an error object containing the error", async () => {
            const requestBody = {
                name: "My checking book"
            };

            try {
                const response = await request
                    .get("/book/" + "INVALID ID")
                    .set("Content-Type", "application/json")
                    .send(requestBody);

                expect(response).to.contain(/error?s/);
            } catch (error) {
                throw error;
            }
        });
    });
});