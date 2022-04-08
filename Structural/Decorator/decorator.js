"use strict";
exports.__esModule = true;
var es6_promise_1 = require("es6-promise");
var SimulatedApi = /** @class */ (function () {
    function SimulatedApi() {
        var _this = this;
        this.makeRequest = function () {
            setTimeout(function () {
                console.log(_this.getData());
            }, _this.getTimeout() * 1000);
        };
        this.getData = function () { return [
            { name: "John Johnson", age: 32 },
            { name: "Jane Johnson", age: 32 },
            { name: "Jim Johnson", age: 10 },
        ]; };
        this.getTimeout = function () { return Math.random() * (5 - 1) + 1; };
    }
    return SimulatedApi;
}());
var a = new SimulatedApi();
//generating a class for logging: Single Responsibility Principle.
//This class logs, SimulatedApi "makes" API calls
var SimulatedApiWithLogging = /** @class */ (function () {
    function SimulatedApiWithLogging(simulatedApi) {
        var _this = this;
        this.recordEndDate = function () {
            _this.endDate = Date.now();
            console.log("in recordEndDate");
            console.log("endDate: ", _this.endDate);
            return _this;
        };
        // reject = () => new Error("makeRequest did not work!");
        this.requestPromise = new es6_promise_1.Promise(function (resolve, reject) {
            this.simulatedApi.makeRequest();
        });
        this.simulatedApi = simulatedApi;
    }
    SimulatedApiWithLogging.prototype.makePromise = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (a, b) {
            _this.simulatedApi.makeRequest();
        });
    };
    SimulatedApiWithLogging.prototype.makeRequest = function () {
        console.log("before pro");
        var pro = this.makePromise();
        pro.then(this.recordEndDate).then(function () { return console.log("after pro"); });
    };
    SimulatedApiWithLogging.prototype.makeRequest2 = function () {
        var _this = this;
        this.startDate = Date.now();
        console.log("startDate: ", this.startDate);
        var promise = new es6_promise_1.Promise(function (resolve, reject) {
            _this.simulatedApi.makeRequest();
        })
            //.then(this.resolve)
            .then(function () { return console.log("endDate finished: ", _this.endDate); });
        promise.then(function () { return (_this.endDate = Date.now()); });
        console.log("endDate: ", this.endDate);
    };
    return SimulatedApiWithLogging;
}());
var b = new SimulatedApiWithLogging(a);
b.makeRequest();
