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
var ServerStorage_1 = require("./ServerStorage");
var ss;
beforeAll(function () {
    ss = new ServerStorage_1.ServerStorage("ServerStorage", "1234");
});
afterEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ss.clear()];
            case 1:
                _a.sent(); // caution
                return [2 /*return*/];
        }
    });
}); });
test('getHttpTest1 expect value inserted', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ss.addItem("tester1", 'tester1Val')];
            case 1:
                _b.sent();
                _a = expect;
                return [4 /*yield*/, ss.getItem("tester1")];
            case 2:
                _a.apply(void 0, [_b.sent()]).toEqual("tester1Val");
                return [2 /*return*/];
        }
    });
}); });
test('error on get testNUM', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        expect.assertions(1);
        return [2 /*return*/, ss.getItem("testNUM")
                .catch(function (e) {
                return expect(e.message).toMatch("No such key found");
            })];
    });
}); });
test('add hey as testStr get hey back', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ss.addItem("testStr", 'hey')];
            case 1:
                _b.sent();
                _a = expect;
                return [4 /*yield*/, ss.getItem("testStr")];
            case 2:
                _a.apply(void 0, [_b.sent()]).toEqual('hey');
                return [2 /*return*/];
        }
    });
}); });
test('removeItem removes testNum', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(1);
                return [4 /*yield*/, ss.addItem("testNum", '5')];
            case 1:
                _a.sent();
                return [4 /*yield*/, ss.removeItem("testNum")];
            case 2:
                _a.sent();
                return [4 /*yield*/, ss.getItem("testNum")
                        .catch(function (e) {
                        return expect(e.message).toMatch("No such key found");
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('clear removes allItems', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expect.assertions(2);
                return [4 /*yield*/, ss.addItem("testNum", '5')];
            case 1:
                _a.sent();
                return [4 /*yield*/, ss.addItem("testStr", 'John')];
            case 2:
                _a.sent();
                return [4 /*yield*/, ss.clear()];
            case 3:
                _a.sent();
                return [4 /*yield*/, ss.getItem("testNum")
                        .catch(function (e) {
                        return expect(e.message).toMatch("No such key found");
                    })];
            case 4:
                _a.sent();
                return [4 /*yield*/, ss.getItem("testStr")
                        .catch(function (e) {
                        return expect(e.message).toMatch("No such key found");
                    })];
            case 5:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('adds 1 + 2 to equal 3', function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = expect;
                return [4 /*yield*/, (0, ServerStorage_1.sum)(1, 2)];
            case 1:
                _a.apply(void 0, [_b.sent()]).toBe(3);
                return [2 /*return*/];
        }
    });
}); });
