"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.createResponse = exports.successResponse = void 0;
const successResponse = (res, message = "Success", data, statusCode = 200) => {
    return res.status(statusCode).send({ success: true, message, data });
};
exports.successResponse = successResponse;
const createResponse = (res, message = "Success", data, statusCode = 201) => {
    return res.status(statusCode).send({ success: true, message, data });
};
exports.createResponse = createResponse;
const errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).send({ success: false, message });
};
exports.errorResponse = errorResponse;
