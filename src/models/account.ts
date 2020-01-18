import mongoose, { Schema, Document, Types } from "mongoose";
import { ITransaction } from "./transaction";

export interface IAccount extends Document {
    _id: Types.ObjectId;
    name: string;
    balance: number;
    transactions: [ITransaction["_id"]];
};

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    balance: Number,
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }]
});

export const Account = mongoose.model<IAccount>("Account", schema);