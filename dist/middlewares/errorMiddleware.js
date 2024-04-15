"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
}
exports.default = errorMiddleware;
