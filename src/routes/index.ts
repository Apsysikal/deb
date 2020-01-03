import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res
        .status(200)
        .contentType("text/html")
        .render("index", {
            "title": "Home"
        });
});

export {
    router as indexRouter
};