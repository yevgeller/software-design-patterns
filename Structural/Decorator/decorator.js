//define interface
//change class to implement
//create new class
//add logging
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
console.log(Date.now());
a.makeRequest();
console.log(Date.now());
//generating a class for logging: Single Responsibility Principle.
//This class logs, SimulatedApi "makes" API calls
var SimulatedApiWithLogging = /** @class */ (function () {
    function SimulatedApiWithLogging(simulatedApi) {
        this.simulatedApi = simulatedApi;
    }
    SimulatedApiWithLogging.prototype.makeRequest = function () {
        this.simulatedApi.makeRequest();
    };
    return SimulatedApiWithLogging;
}());
