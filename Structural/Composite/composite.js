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
        _this.primaryOperation = function (depth) {
            return console.log(Array(depth).join("-") + _this.name);
        };
        _this.name = name;
        return _this;
    }
    return Leaf;
}(Component));
var Branch = /** @class */ (function (_super) {
    __extends(Branch, _super);
    function Branch(name) {
        var _this = _super.call(this, name) || this;
        _this.add = function (component) { return _this.components.push(component); };
        _this.remove = function (component) {
            return (_this.components = _this.components.filter(function (x) { return x.name !== component.name; }));
        };
        _this.name = name;
        _this.components = [];
        return _this;
    }
    Branch.prototype.primaryOperation = function (depth) {
        console.log(Array(depth).join("-") + this.name);
        this.components.forEach(function (x) { return x.primaryOperation(depth + 2); });
    };
    return Branch;
}(Component));
var root = new Branch("root");
root.add(new Leaf("Leaf 1"));
root.add(new Leaf("Leaf 2"));
var comp1 = new Branch("Subtree 1");
comp1.add(new Leaf("Subtree 1 Leaf 1"));
comp1.add(new Leaf("Subtree 1 Leaf 2"));
var comp2 = new Branch("Sub-Subtree 1");
comp2.add(new Leaf("Sub-Subtree 1 Leaf 1"));
comp1.add(comp2);
root.add(comp1);
root.add(new Leaf("Leaf 3"));
root.primaryOperation(1);
var ComponentTreeBuilder = /** @class */ (function () {
    function ComponentTreeBuilder(rootComponentName) {
        this.rootComponent = new Branch(rootComponentName);
        this.currentComponent = this.rootComponent;
    }
    ComponentTreeBuilder.prototype.addComponentItem = function (name) {
        var comp = new Branch(name);
        this.currentComponent.add(comp);
        this.currentComponent = comp;
        return comp;
    };
    ComponentTreeBuilder.prototype.addLeaf = function (name) {
        var leaf = new Leaf(name);
        this.currentComponent.add(leaf);
        return leaf;
    };
    ComponentTreeBuilder.prototype.setCurrentComponent = function (branchName) {
        var stack = [];
        stack.push(this.rootComponent);
        while (stack.length > 0) {
            var current = stack.pop();
            if (current.name === branchName) {
                this.currentComponent = current;
                return current;
            }
            var branchesOfCurrent = current.components.filter(function (x) { return typeof x.add === "function"; });
            stack.push.apply(stack, branchesOfCurrent);
        }
        throw new Error("Component name '".concat(branchName, "' does not exist in the current hierarchy"));
    };
    return ComponentTreeBuilder;
}());
var builder = new ComponentTreeBuilder("top");
builder.addComponentItem("left");
builder.addLeaf("left 1");
builder.addLeaf("left 2");
builder.setCurrentComponent("top");
builder.addComponentItem("center");
builder.addLeaf("center 1");
builder.addLeaf("center 2");
builder.setCurrentComponent("top");
builder.addComponentItem("right");
builder.addLeaf("right 1");
builder.addLeaf("right 2");
builder.setCurrentComponent("center");
builder.addComponentItem("sub-center");
builder.addLeaf("sub-center leaf");
builder.rootComponent.primaryOperation(1);
