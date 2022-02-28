//This is a specific implementation of a product
//that requires certain steps
var CheesePizzaBuilderThinCrust16Inches = /** @class */ (function () {
    function CheesePizzaBuilderThinCrust16Inches() {
        this.reset();
    }
    CheesePizzaBuilderThinCrust16Inches.prototype.reset = function () {
        this.pizza = new Pizza();
    };
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
    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     */
    CheesePizzaBuilderThinCrust16Inches.prototype.getProduct = function () {
        var result = this.pizza;
        this.reset();
        return result;
    };
    return CheesePizzaBuilderThinCrust16Inches;
}());
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
}
var director = new Director();
clientCode(director);
//}
