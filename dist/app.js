"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = require("dotenv");
const mongoDB_1 = require("./configs/mongoDB");
const routes_1 = require("./routes");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3232;
(0, mongoDB_1.mongoDBConnection)();
/*----------------------------app level middlewares-----------------------------------------------------*/
app.use((0, cors_1.default)({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials to be sent with the request.
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Helmet middleware for setting security headers
app.use((0, helmet_1.default)());
/*----------------------------app routes-----------------------------------------------------------------*/
app.use('/v1', routes_1.router);
/*----------------------------app server url-------------------------------------------------------------*/
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Hunter API',
    });
});
app.get('*', (req, res) => {
    res.status(404).json({ message: 'route not found in this domain' });
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
//# sourceMappingURL=app.js.map