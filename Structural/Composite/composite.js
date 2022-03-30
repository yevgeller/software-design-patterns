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
    return Leaf;
}(Component));
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite(name) {
        var _this = _super.call(this, name) || this;
        _this.add = function (component) { return _this.components.push(component); };
        _this.remove = function (component) {
            return (_this.components = _this.components.filter(function (x) { return x.name !== component.name; }));
        };
        _this.name = name;
        _this.components = [];
        return _this;
    }
    Composite.prototype.primaryOperation = function (depth) {
        console.log(Array(depth).join("-") + this.name);
        this.components.forEach(function (x) { return x.primaryOperation(depth + 2); });
    };
    return Composite;
}(Component));
var root = new Composite("root");
root.add(new Leaf("Leaf 1"));
root.add(new Leaf("Leaf 2"));
var comp1 = new Composite("Subtree 1");
comp1.add(new Leaf("Subtree 1 Leaf 1"));
comp1.add(new Leaf("Subtree 1 Leaf 2"));
var comp2 = new Composite("Sub-Subtree 1");
comp2.add(new Leaf("Sub-Subtree 1 Leaf 1"));
comp1.add(comp2);
root.add(comp1);
root.add(new Leaf("Leaf 3"));
// let leaf = new Leaf("Leaf 4");
// root.add(leaf);
// root.remove(leaf);
root.primaryOperation(1);
var FileSystemBuilder = /** @class */ (function () {
    function FileSystemBuilder(rootCompositeName) {
        this.rootComposite = new Composite(rootCompositeName);
        this.currentDirectory = this.rootComposite;
    }
    return FileSystemBuilder;
}());
