import mongoose, { Schema, Document, Types } from "mongoose";
import { ITransaction } from "./transaction";

export interface IAccount extends Document {
    _id: Types.ObjectId;
    name: string;
    balance: number;
    transactions: [ITransaction["_id"]];
};

const schema = new Schema({
    _id: { type: Types.ObjectId, unique: true },
    name: String,
    balance: Number,
    transactions: [{ type: Types.ObjectId, ref: "Transaction" }]
});

export const Account = mongoose.model<IAccount>("Account", schema);