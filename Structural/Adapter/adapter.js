var CSVProvider = /** @class */ (function () {
    function CSVProvider() {
    }
    CSVProvider.prototype.getData = function () {
        var header = "FirstName,LastName,Age";
        var line1 = "John,Smith,25";
        var line2 = "Mary,Smith,25";
        var line3 = "Jacob,Smith,3";
        var CRLF = "\n";
        var interimResult = [header, line1, line2, line3];
        return interimResult.join(CRLF);
    };
    return CSVProvider;
}());
var JSONProcessor = /** @class */ (function () {
    function JSONProcessor() {
    }
    JSONProcessor.prototype.doSomethingWithJSON = function (json) {
        console.log(JSON.stringify(json, null, 2));
    };
    return JSONProcessor;
}());
var obj1 = {
    firstName: "Alex",
    lastName: "Jones",
    age: 23
};
var obj2 = {
    firstName: "Alex",
    lastName: "Jones",
    age: 23
};
var obj3 = {
    firstName: "Alex",
    lastName: "Jones",
    age: 23
};
var arr = [obj1, obj2, obj3];
console.table(arr);
