import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.end(200);
});

export {
    router as indexRouter
};