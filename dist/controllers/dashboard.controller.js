"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_service_1 = require("../services/dashboard.service");
const response_1 = require("../utils/response");
class DashboardController {
    async summary(req, res, next) {
        try {
            const getSummary = await (0, dashboard_service_1.summaryServices)();
            (0, response_1.successResponse)(res, "Success", { summary: getSummary });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = DashboardController;
