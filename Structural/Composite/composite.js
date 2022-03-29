var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Component = /** @class */ (function () {
    function Component(name) {
        this.name = name;
    }
    Component.prototype.primaryOperation = function (depth) { };
    Component.prototype.add = function (component) { };
    Component.prototype.remove = function (component) { };
    return Component;
}());
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        return _this;
    }
    Leaf.prototype.primaryOperation = function (depth) {
        console.log(Array(depth).join("-") + this.name);
    };
    Leaf.prototype.add = function (component) {
        throw new Error("Method not implemented.");
    };
    Leaf.prototype.remove = function (component) {
        throw new Error("Method not implemented.");
    };
    return Leaf;
}(Component));
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite(name) {
        var _this = _super.call(this, name) || this;
        _this.name = name;
        _this.components = [];
        return _this;
    }
    Composite.prototype.primaryOperation = function (depth) {
        console.log(Array(depth).join("-") + this.name);
        this.components.forEach(function (x) { return x.primaryOperation(depth + 2); });
    };
    Composite.prototype.add = function (component) {
        this.components.push(component);
    };
    Composite.prototype.remove = function (component) {
        this.components = this.components.filter(function (x) { return x.name !== component.name; });
    };
    return Composite;
}(Component));
var root = new Composite("root");
root.add(new Leaf("Leaf A"));
root.add(new Leaf("Leaf B"));
var comp1 = new Composite("Composite C1");
comp1.add(new Leaf("Leaf C1-A"));
comp1.add(new Leaf("Leaf C1-B"));
var comp2 = new Composite("Composite C2");
comp2.add(new Leaf("Leaf C2-A"));
comp1.add(comp2);
root.add(comp1);
root.add(new Leaf("Leaf C"));
var leaf = new Leaf("Leaf D");
root.add(leaf);
root.remove(leaf);
root.primaryOperation(1);
