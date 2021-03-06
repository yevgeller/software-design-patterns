var FibonacciSequence = /** @class */ (function () {
    function FibonacciSequence(numberOfDigits) {
        this.numberOfDigits = numberOfDigits;
    }
    FibonacciSequence.prototype.getIterator = function () {
        return new FibonacciEnumerator(this.numberOfDigits);
    };
    return FibonacciSequence;
}());
var FibonacciEnumerator = /** @class */ (function () {
    function FibonacciEnumerator(numberOfDigits) {
        this.numberOfDigits = numberOfDigits;
        this.reset();
    }
    FibonacciEnumerator.prototype.current = function () {
        return this.currentTotal;
    };
    FibonacciEnumerator.prototype.moveNext = function () {
        var newTotal = this.previousTotal + this.currentTotal;
        this.previousTotal = this.currentTotal;
        this.currentTotal = newTotal;
        this.currentPosition++;
        return this.currentPosition <= this.numberOfDigits;
    };
    FibonacciEnumerator.prototype.reset = function () {
        this.currentPosition = 0;
        this.previousTotal = 0;
        this.currentTotal = 1;
    };
    return FibonacciEnumerator;
}());
var f = new FibonacciSequence(10);
var e = f.getIterator();
var output = "Result: ";
while (e.moveNext()) {
    output += e.current() + " ";
}
console.log(output);
//https://app.pluralsight.com/library/courses/design-patterns-on-ramp/table-of-contents
