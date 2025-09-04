export const successResponse = (res, message = "Success", data, statusCode = 200) => {
    return res.status(statusCode).send({ success: true, message, data });
};
export const createResponse = (res, message = "Success", data, statusCode = 201) => {
    return res.status(statusCode).send({ success: true, message, data });
};
export const errorResponse = (res, message, statusCode = 500) => {
    return res.status(statusCode).send({ success: false, message });
};
