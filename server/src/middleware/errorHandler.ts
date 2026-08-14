import type {
    ErrorRequestHandler,
} from "express";

const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next
) => {
    console.error("Unhandled application error:", error);

    res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again.",
    });
};

export default errorHandler;
