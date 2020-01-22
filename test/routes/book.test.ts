import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import * as dotenv from "dotenv";
import { Mongoose } from "mongoose";
import { app } from "../../src/app";
import * as database from "../../src/database";

dotenv.config({ path: "../../.env" });

chai.use(chaiHttp);

let db: Mongoose;

const request = chai.request.agent(app);

describe("Endpoint /book", () => {
    before(async () => {
        db = await database.connect("testing");
    });

    after(async () => {
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
});