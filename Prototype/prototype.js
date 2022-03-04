var AllIsBetterWithAMethodToCloneStuff;
(function (AllIsBetterWithAMethodToCloneStuff) {
    var Marble = /** @class */ (function () {
        function Marble(size, color) {
            this.size = size;
            this.color = color;
        }
        Marble.prototype.clone = function () {
            return new Marble(this.size, this.color);
        };
        Marble.prototype.displayProperties = function () {
            return "size: ".concat(this.size, "; color: ").concat(this.color);
        };
        return Marble;
    }());
    var greenMarble = new Marble(1, "green");
    var redMarble = greenMarble.clone();
    redMarble.color = "red";
    console.log(greenMarble.displayProperties());
    console.log(redMarble.displayProperties());
})(AllIsBetterWithAMethodToCloneStuff || (AllIsBetterWithAMethodToCloneStuff = {}));
