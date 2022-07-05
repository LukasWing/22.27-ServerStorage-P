"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerStorage = exports.sum = void 0;
var fetch = require("node-fetch");
function sum(a, b) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, a + b];
        });
    });
}
exports.sum = sum;
/**
 * class mimicking localStorage functionality and essentially exposes a keyValueStore.
 */
var ServerStorage = /** @class */ (function () {
    /**
     * @param subPage an identifier for your page.
     * @param authToken the authentication token that is needed to get access to keyv value store.
     * Ask Lukas for this.
     */
    function ServerStorage(subPage, authToken) {
        this.apiRoot = "https://matquiz.dk/ServerStorage/storageAPI.php";
        this.subPage = subPage;
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": authToken
        };
    }
    /**
     * Removes an item corresponding to page.
     * @param key of item to be removed
     */
    ServerStorage.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            page: this.subPage,
                            key: key
                        };
                        return [4 /*yield*/, fetch(this.apiRoot, {
                                method: "DELETE",
                                headers: this.headers,
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 204)
                            return [2 /*return*/];
                        else if (response.status === 404)
                            console.log("No key to be deleted matched " + key);
                        else
                            throw new Error("Unknown error: " + response.status);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrives item
     * @param key key of value to be retrieved
     * @returns value
     * @throws No such key found.
     */
    ServerStorage.prototype.getItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var qs, response, res, errorResponse, resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        qs = "key=".concat(key, "&page=").concat(this.subPage);
                        return [4 /*yield*/, fetch("".concat(this.apiRoot, "?").concat(qs), {
                                method: "GET",
                                headers: this.headers,
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        res = _a.sent();
                        errorResponse = res === "Error getting value" || response.status === 404;
                        if (errorResponse) {
                            throw new Error("No such key found");
                        }
                        resource = JSON.parse(res);
                        return [2 /*return*/, resource.value];
                }
            });
        });
    };
    /**
     * Adds item to key value store with given page.
     * @param key
     * @param value
     */
    ServerStorage.prototype.addItem = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = {
                            page: this.subPage,
                            key: key,
                            value: value
                        };
                        return [4 /*yield*/, fetch(this.apiRoot, {
                                method: "POST",
                                headers: this.headers,
                                body: JSON.stringify(body)
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Uknown error on upload: " + response.status);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clears entire key value store on this page
     */
    ServerStorage.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.apiRoot, {
                            method: "DELETE",
                            headers: this.headers,
                            body: JSON.stringify({ page: this.subPage })
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.status === 204)
                            return [2 /*return*/];
                        else
                            throw new Error("Unknown error: " + response.status);
                        return [2 /*return*/];
                }
            });
        });
    };
    return ServerStorage;
}());
exports.ServerStorage = ServerStorage;
