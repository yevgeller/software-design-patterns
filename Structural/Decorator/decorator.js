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
        this.simulatedApi = simulatedApi;
    }
    // reject = () => new Error("makeRequest did not work!");
    // requestPromise = new Promise(function (resolve, reject) {
    //   this.simulatedApi.makeRequest();
    // });
    SimulatedApiWithLogging.prototype.makePromise = function () {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            resolve(_this.simulatedApi.makeRequest());
        });
    };
    SimulatedApiWithLogging.prototype.makeRequest = function () {
        console.log("before pro");
        this.startDate = Date.now();
        console.log("startDate: ", this.startDate);
        var pro = this.makePromise();
        pro.then(this.recordEndDate).then(function () { return console.log("after pro"); }); //why is this not being called?
    };
    return SimulatedApiWithLogging;
}());
var b = new SimulatedApiWithLogging(a);
b.makeRequest();
//--need to add logging, what am I doing wrong?
