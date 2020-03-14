import { Request, Response } from "express";
import { Types } from "mongoose";
import { body, sanitizeBody, validationResult, param } from "express-validator";

import { Book } from "../models/book";

async function create(req: Request, res: Response): Promise<void> {

    await body("_id", "Property '_id' mustn't be set upon creation").not().exists().run(req);
    await body("name", "Property 'name' must exist").exists().notEmpty({ ignore_whitespace: true }).run(req); // eslint-disable-line @typescript-eslint/camelcase
    await body("balance", "Property 'balance' mustn't be set upon creation").not().exists().run(req);
    await body("accounts", "Property 'accounts' mustn't be set upon creation").not().exists().run(req);
    await body("transactions", "Property 'transactions' musn't be set upon creation").not().exists().run(req);

    sanitizeBody("name").trim().toString();

    const validationErros = validationResult(req);

    if (!validationErros.isEmpty()) {
        return res
            .status(400)
            .contentType("application/json")
            .json(validationErros)
            .end();
    }

    const data = req.body;

    data["_id"] = new Types.ObjectId();

    try {
        const book = await Book.create(data);

        return res
            .status(201)
            .contentType("application/json")
            .json(book)
            .end();

    } catch (error) {
        return res
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
    await param("id", "Parameter 'id' must exist ").exists().run(req);

    // This should probably be in sanitization
    await param("id").custom(value => {
        try {
            return Types.ObjectId(value);
        } catch (error) {
            throw "Parameter 'id' must be a valid id";
        }
    }).run(req);

    const validationErros = validationResult(req);

    if (!validationErros.isEmpty()) {
        return res
            .status(400)
            .contentType("application/json")
            .json(validationErros)
            .end();
    }

    const id = req.params.id;

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