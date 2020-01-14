import { Router, Request, Response } from "express";

import { bookController } from "../controllers/book";

export const router = Router();

// Create
router.post("/", async (req: Request, res: Response) => {
    // TODO: Add validation
    res.end("Returns the created user");
});

// Returns all books
router.get("/", async (req: Request, res: Response) => {
    res.end("Returns all books");
});

// Returns book by id
router.get("/:id", async (req: Request, res: Response) => {
    res.end("Returns book by id");
});

// Update  book
router.put("/:id", async (req: Request, res: Response) => {
    res.end("Returns updated book");
});

// Delete book
router.delete("/:id", async (req: Request, res: Response) => {
    res.end("Deleted book");
});

export {
    router as bookRouter
};