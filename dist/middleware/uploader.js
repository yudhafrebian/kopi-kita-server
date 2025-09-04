"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploaderMemory = void 0;
const multer_1 = __importDefault(require("multer"));
const uploaderMemory = () => {
    return (0, multer_1.default)({
        storage: multer_1.default.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter(req, file, callback) {
            if (file.mimetype === "image/webp" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpeg") {
                callback(null, true);
            }
            else {
                callback(new Error("Only JPG, PNG and WEBP format allowed"), false);
            }
        },
    });
};
exports.uploaderMemory = uploaderMemory;
