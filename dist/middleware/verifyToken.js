"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenAndAuthorization = exports.verifyTokenAndAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const verifyTokenE = async (req: Request, res: Response, next: NextFunction): Promise<Response> => { }
const verifyToken = (request, response, next) => {
    const authHeader = request.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), (err, user) => {
            if (err) {
                return response.status(403).json("Token is not valid!");
            }
            request.user = user;
            next();
        });
    }
    else {
        return response.status(401).json("You are not authenticated!");
    }
};
exports.verifyToken = verifyToken;
const verifyTokenAndAuthorization = (request, response, next) => {
    verifyToken(request, response, () => {
        if (request.user.id === request.params.id || request.user.isAdmin) {
            next();
        }
        else {
            return response.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAuthorization = verifyTokenAndAuthorization;
const verifyTokenAndAdmin = (request, response, next) => {
    verifyToken(request, response, () => {
        if (request.user.isAdmin) {
            next();
        }
        else {
            return response.status(403).json("You are not allowed to do that!");
        }
    });
};
exports.verifyTokenAndAdmin = verifyTokenAndAdmin;
//# sourceMappingURL=verifyToken.js.map