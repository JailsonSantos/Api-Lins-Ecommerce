"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoute = void 0;
const express_1 = require("express");
const apiRoute = (0, express_1.Router)();
exports.apiRoute = apiRoute;
// Home API
apiRoute.get('/', (request, response) => {
    return response.status(200).json({ "Status": "200", "Message": "Success!" });
});
//# sourceMappingURL=api.js.map