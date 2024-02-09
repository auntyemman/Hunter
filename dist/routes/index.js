"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
/*---------------this maps all the routes together before relaying them to the app.ts file for app level routing-----------*/
const express_1 = require("express");
const userAuth_1 = require("./userAuth");
exports.router = (0, express_1.Router)();
// each route
exports.router.use('/auth', userAuth_1.auth);
//# sourceMappingURL=index.js.map