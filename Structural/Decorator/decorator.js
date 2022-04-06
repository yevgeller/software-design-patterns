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
//console.log(a.makeRequest());
console.log(Date.now());
a.makeRequest();
console.log(Date.now());
