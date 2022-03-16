var CSVProvider = /** @class */ (function () {
    function CSVProvider() {
    }
    CSVProvider.prototype.getColumnHeaders = function () {
        return "FirstName,LastName,Age";
    };
    CSVProvider.prototype.getData = function () {
        var line1 = "John,Smith,25";
        var line2 = "Mary,Smith,25";
        var line3 = "Jacob,Smith,3";
        var CRLF = "\n";
        var interimResult = [line1, line2, line3];
        var res = interimResult.join(CRLF);
        return res;
    };
    return CSVProvider;
}());
var JSONProcessor = /** @class */ (function () {
    function JSONProcessor() {
    }
    JSONProcessor.prototype.doSomethingWithJSON = function (json) {
        console.log(JSON.stringify(json, null, 2));
    };
    JSONProcessor.prototype.showJSON = function (json) {
        console.table(json);
    };
    return JSONProcessor;
}());
var jsnp = new JSONProcessor();
var csvp = new CSVProvider();
jsnp.showJSON(csvp.getData());
console.log("-----");
var Adapter = /** @class */ (function () {
    function Adapter() {
        this.csvProvider = new CSVProvider();
    }
    Adapter.prototype.ConvertCsvToJson = function () {
        var incoming = this.csvProvider.getData().split("\n");
        var columnHeaders = this.csvProvider.getColumnHeaders().split(",");
        var arr = [];
        for (var i = 0; i < incoming.length; i++) {
            var vals = incoming[i].split(",");
            var person = new Object();
            for (var j = 0; j < columnHeaders.length; j++) {
                person[columnHeaders[j]] = vals[j];
            }
            arr.push(person);
        }
        return arr;
    };
    return Adapter;
}());
var adapter1 = new Adapter();
var jp = new JSONProcessor();
jp.doSomethingWithJSON(adapter1.ConvertCsvToJson());
jp.showJSON(adapter1.ConvertCsvToJson());
