"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const main = async () => {
    const server = new app_1.default();
    await server.start();
};
main().catch((err) => {
    console.error("Failed to start server:", err);
});
