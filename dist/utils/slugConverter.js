"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugConverter = void 0;
const slugConverter = (text) => text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
exports.slugConverter = slugConverter;
