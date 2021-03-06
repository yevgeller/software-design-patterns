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
var SimulatedApi = /** @class */ (function () {
    function SimulatedApi() {
        var _this = this;
        this.makeRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(_this.getData()); }, _this.getTimeout() * 1000);
                    })];
            });
        }); };
        this.getData = function () { return [
            { name: "John Johnson", age: 32 },
            { name: "Jane Johnson", age: 32 },
            { name: "Jim Johnson", age: 10 },
        ]; };
        this.getTimeout = function () {
            var delay = Math.random() * (5 - 1) + 1;
            //console.log("delay (ms): ", Math.round(delay * 1000));
            return delay;
        };
    }
    return SimulatedApi;
}());
var SimulatedApiWithLogging = /** @class */ (function () {
    function SimulatedApiWithLogging(simulatedApi) {
        this.simulatedApi = simulatedApi;
    }
    SimulatedApiWithLogging.prototype.makeRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var responseData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.startDate = Date.now();
                        return [4 /*yield*/, this.simulatedApi.makeRequest()];
                    case 1:
                        responseData = _a.sent();
                        this.endDate = Date.now();
                        console.log("time taken (ms): ", this.endDate - this.startDate);
                        return [2 /*return*/, new Promise(function (resolve) { return resolve(responseData); })];
                }
            });
        });
    };
    return SimulatedApiWithLogging;
}());
var SimpleCacheAccessor = /** @class */ (function () {
    function SimpleCacheAccessor() {
        var _this = this;
        this.getCache = function () { return _this.data; };
        this.data = [];
        this.showData = function () { return _this.data; };
    }
    SimpleCacheAccessor.prototype.setCache = function (incomingData) {
        this.data = incomingData;
    };
    SimpleCacheAccessor.prototype.hasData = function () {
        return this.data.length > 0;
    };
    return SimpleCacheAccessor;
}());
var SimulatedApiWithCaching = /** @class */ (function () {
    function SimulatedApiWithCaching(api, cacheAccessor) {
        this.api = api;
        this.cacheAccessor = cacheAccessor;
    }
    SimulatedApiWithCaching.prototype.makeRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.cacheAccessor.hasData()) return [3 /*break*/, 2];
                        console.log("reaching out to API");
                        return [4 /*yield*/, this.api.makeRequest()];
                    case 1:
                        result = _a.sent();
                        this.cacheAccessor.setCache(result);
                        console.log("data:", this.cacheAccessor.showData());
                        return [3 /*break*/, 3];
                    case 2:
                        console.log("data (from cache):", this.cacheAccessor.showData());
                        return [2 /*return*/, this.cacheAccessor.showData()];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SimulatedApiWithCaching;
}());
var simpleApiAccessor = new SimulatedApi();
var apiAccessorWithLogging = new SimulatedApiWithLogging(simpleApiAccessor);
var cacheAccessor = new SimpleCacheAccessor();
var apiAccessorWithLoggingWithCaching = new SimulatedApiWithCaching(apiAccessorWithLogging, cacheAccessor);
console.log("---  request 1 ---");
apiAccessorWithLoggingWithCaching.makeRequest();
setTimeout(function () {
    console.log("---  request 2 ---");
    apiAccessorWithLoggingWithCaching.makeRequest();
}, 5000);
