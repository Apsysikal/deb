import { Request, Response } from "express";
import { Types } from "mongoose";

import { Book } from "../models/book";

async function create(req: Request, res: Response): Promise<void> {
    //TODO: Validate
    const data = req.body;

    data["_id"] = new Types.ObjectId();

    try {
        const book = await Book.create(data);


        console.log(book);

        res
            .status(201)
            .contentType("application/json")
            .json(book)
            .end();

    } catch (error) {
        res
            .status(500)
            .contentType("application/json")
            .json(error)
            .end();
    }
};

async function getAllBooks(req: Request, res: Response): Promise<void> {
    try {
        const books = await Book.find();

        res
            .status(200)
            .contentType("application/json")
            .json(books)
            .end();

    } catch (error) {
        res
            .status(500)
            .contentType("application/json")
            .json(error)
            .end();
    }
};

async function getBookById(req: Request, res: Response): Promise<void> {
    const id = req.body._id;

    try {
        const book = await Book.findById(id);

        res
            .status(200)
            .contentType("application/json")
            .json(book)
            .end();

    } catch (error) {
        res
            .status(500)
            .contentType("application/json")
            .json(error)
            .end();
    }
};

async function updateBook(req: Request, res: Response): Promise<void> {
    const book = req.body;

    try {
        const newBook = await Book.findByIdAndUpdate(book._id, book, { new: true });

        res
            .status(200)
            .contentType("application/json")
            .json(newBook)
            .end();

    } catch (error) {
        res
            .status(500)
            .contentType("application/json")
            .json(error)
            .end();
    }
};

async function deleteBook(req: Request, res: Response): Promise<void> {
    const id = req.body.id;

    try {
        const success = await Book.deleteOne({ _id: id });

        res
            .status(200)
            .contentType("application/json")
            .json(success)
            .end();

    } catch (error) {
        res
            .status(500)
            .contentType("application/json")
            .json(error)
            .end();
    }
};

export {
    create as createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};