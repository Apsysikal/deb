import mongoose, { Schema, Document, Types } from "mongoose";
import { IAccount } from "./account";
import { ITransaction } from "./transaction";


export interface IBook extends Document {
    _id: Types.ObjectId;
    name: string;
    balance: number;
    accounts: [IAccount["_id"]];
    transactions: [ITransaction["_id"]];
};

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    accounts: { type: Schema.Types.ObjectId, ref: "Account" },
    transactions: { type: Schema.Types.ObjectId, ref: "Transaction" }
});

export const Book = mongoose.model<IBook>("Book", schema);