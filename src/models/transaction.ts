import mongoose, { Schema, Document, Types } from "mongoose";
import { IAccount } from "./account";

export interface ITransaction extends Document {
    _id: Types.ObjectId;
    created: number;
    modified: number;
    date: number;
    accountDebited: [IAccount["_id"]];
    accountCredited: [IAccount["_id"]];
    amount: number;
};

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    created: Number,
    modified: Number,
    date: Number,
    accountDebited: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    accountCredited: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    amount: Number
});

export const Transaction = mongoose.model<ITransaction>("Transaction", schema);