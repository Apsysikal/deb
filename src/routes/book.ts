import { Router, Request, Response } from "express";

import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/book";

export const router = Router();

// Create
router.post("/", async (req: Request, res: Response) => {
    createBook(req, res);
});

// Returns book by id
router.get("/:id", async (req: Request, res: Response) => {
    getBookById(req, res);
});

// Returns all books
router.get("/", async (req: Request, res: Response) => {
    getAllBooks(req, res);
});

// Update  book
router.put("/:id", async (req: Request, res: Response) => {
    updateBook(req, res);
});

// Delete book
router.delete("/:id", async (req: Request, res: Response) => {
    deleteBook(req, res);
});

export {
    router as bookRouter
};