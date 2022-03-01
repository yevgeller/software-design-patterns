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
var PizzaBase = /** @class */ (function () {
    function PizzaBase() {
        this.reset();
    }
    PizzaBase.prototype.reset = function () {
        this.pizza = new Pizza();
    };
    PizzaBase.prototype.getProduct = function () {
        var result = this.pizza;
        this.reset();
        return result;
    };
    return PizzaBase;
}());
//This is a specific implementation of a product
//that requires certain steps
var CheesePizzaBuilderThinCrust16Inches = /** @class */ (function (_super) {
    __extends(CheesePizzaBuilderThinCrust16Inches, _super);
    //private pizza: Pizza;
    function CheesePizzaBuilderThinCrust16Inches() {
        return _super.call(this) || this;
    }
    //   public reset(): void {
    //     this.pizza = new Pizza();
    //   }
    CheesePizzaBuilderThinCrust16Inches.prototype.prepareDough = function () {
        this.pizza.parts.push("thin crust, 16 inches");
    };
    CheesePizzaBuilderThinCrust16Inches.prototype.addSauce = function () {
        this.pizza.parts.push("marinara sauce");
    };
    CheesePizzaBuilderThinCrust16Inches.prototype.addIngredients = function () { }; //no extra ingredients
    CheesePizzaBuilderThinCrust16Inches.prototype.addCheese = function () {
        this.pizza.parts.push("mozzarella, 1x");
    };
    CheesePizzaBuilderThinCrust16Inches.prototype.bake = function () {
        this.pizza.parts.push("bake now");
    };
    return CheesePizzaBuilderThinCrust16Inches;
}(PizzaBase));
var ChicagoDeepDish16InchSupreme = /** @class */ (function (_super) {
    __extends(ChicagoDeepDish16InchSupreme, _super);
    function ChicagoDeepDish16InchSupreme() {
        return _super.call(this) || this;
    }
    ChicagoDeepDish16InchSupreme.prototype.prepareDough = function () {
        this.pizza.parts.push("deep dish crust, 16 inches");
    };
    ChicagoDeepDish16InchSupreme.prototype.addSauce = function () {
        this.pizza.parts.push("marinara sauce");
    };
    ChicagoDeepDish16InchSupreme.prototype.addIngredients = function () {
        this.pizza.parts.push("black olives");
        this.pizza.parts.push("bell peppers");
        this.pizza.parts.push("green olives");
        this.pizza.parts.push("red onions");
        this.pizza.parts.push("italian sausage");
        this.pizza.parts.push("kitchen sink");
    };
    ChicagoDeepDish16InchSupreme.prototype.addCheese = function () {
        this.pizza.parts.push("mozzarella, 1x");
    };
    ChicagoDeepDish16InchSupreme.prototype.bake = function () {
        this.pizza.parts.push("bake now");
    };
    return ChicagoDeepDish16InchSupreme;
}(PizzaBase));
/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
var Pizza = /** @class */ (function () {
    function Pizza() {
        this.parts = [];
    }
    Pizza.prototype.listParts = function () {
        console.log("Product parts: ".concat(this.parts.join(", "), "\n"));
    };
    return Pizza;
}());
/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
var Director = /** @class */ (function () {
    function Director() {
    }
    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    Director.prototype.setBuilder = function (builder) {
        this.builder = builder;
    };
    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    Director.prototype.prepForTakeOutAndBakeAtHome = function () {
        this.builder.prepareDough();
        this.builder.addSauce();
        this.builder.addIngredients();
        this.builder.addCheese();
    };
    Director.prototype.prepAndBake = function () {
        this.builder.prepareDough();
        this.builder.addSauce();
        this.builder.addIngredients();
        this.builder.addCheese();
        this.builder.bake();
    };
    return Director;
}());
/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director) {
    var builder = new CheesePizzaBuilderThinCrust16Inches();
    director.setBuilder(builder);
    console.log("Kind of like Papa Murphy's:");
    director.prepForTakeOutAndBakeAtHome();
    builder.getProduct().listParts();
    console.log("For here:");
    director.prepAndBake();
    builder.getProduct().listParts();
    // Remember, the Builder pattern can be used without a Director class.
    console.log("Extra cheesy");
    builder.prepareDough();
    builder.addSauce();
    builder.addIngredients();
    builder.addCheese();
    builder.addCheese();
    builder.addCheese();
    builder.bake();
    builder.getProduct().listParts();
    var builder2 = new ChicagoDeepDish16InchSupreme();
    director.setBuilder(builder2);
    console.log("Chicago deep dish to go");
    director.prepForTakeOutAndBakeAtHome();
    builder2.getProduct().listParts();
    console.log("Chicago deep dish for here");
    director.prepAndBake();
    builder2.getProduct().listParts();
}
var director = new Director();
clientCode(director);
//}
