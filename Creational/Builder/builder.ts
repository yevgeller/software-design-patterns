namespace SoMuchBetterUsingABuilderPattern {
  //Builder interface specifies methods for
  //creating the different parts of the Product objects
  interface PizzaBuilder {
    prepareDough(): void;
    addSauce(): void;
    addIngredients(): void;
    addCheese(): void;
    bake(): void;
  }

  class PizzaBase {
    protected pizza: Pizza;

    constructor() {
      this.reset();
    }

    public reset(): void {
      this.pizza = new Pizza();
    }

    public getProduct(): Pizza {
      const result = this.pizza;
      this.reset();
      return result;
    }
  }

  //This is a specific implementation of a product
  //that requires certain steps

  class CheesePizzaBuilderThinCrust16Inches
    extends PizzaBase
    implements PizzaBuilder
  {
    //private pizza: Pizza;

    constructor() {
      super();
    }

    //   public reset(): void {
    //     this.pizza = new Pizza();
    //   }

    prepareDough(): void {
      this.pizza.parts.push("thin crust, 16 inches");
    }
    addSauce(): void {
      this.pizza.parts.push("marinara sauce");
    }
    addIngredients(): void {} //no extra ingredients

    addCheese(): void {
      this.pizza.parts.push("mozzarella, 1x");
    }
    bake(): void {
      this.pizza.parts.push("bake now");
    }

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
  }

  class ChicagoDeepDish16InchSupreme extends PizzaBase implements PizzaBuilder {
    constructor() {
      super();
    }

    prepareDough(): void {
      this.pizza.parts.push("deep dish crust, 16 inches");
    }
    addSauce(): void {
      this.pizza.parts.push("marinara sauce");
    }
    addIngredients(): void {
      this.pizza.parts.push("black olives");
      this.pizza.parts.push("bell peppers");
      this.pizza.parts.push("green olives");
      this.pizza.parts.push("red onions");
      this.pizza.parts.push("italian sausage");
      this.pizza.parts.push("kitchen sink");
    }

    addCheese(): void {
      this.pizza.parts.push("mozzarella, 1x");
    }
    bake(): void {
      this.pizza.parts.push("bake now");
    }
  }
  /**
   * It makes sense to use the Builder pattern only when your products are quite
   * complex and require extensive configuration.
   *
   * Unlike in other creational patterns, different concrete builders can produce
   * unrelated products. In other words, results of various builders may not
   * always follow the same interface.
   */
  class Pizza {
    public parts: string[] = [];

    public listParts(): void {
      console.log(`Product parts: ${this.parts.join(", ")}\n`);
    }
  }

  /**
   * The Director is only responsible for executing the building steps in a
   * particular sequence. It is helpful when producing products according to a
   * specific order or configuration. Strictly speaking, the Director class is
   * optional, since the client can control builders directly.
   */
  class Director {
    private builder: PizzaBuilder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    public setBuilder(builder: PizzaBuilder): void {
      this.builder = builder;
    }

    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    public prepForTakeOutAndBakeAtHome(): void {
      this.builder.prepareDough();
      this.builder.addSauce();
      this.builder.addIngredients();
      this.builder.addCheese();
    }

    public prepAndBake(): void {
      this.builder.prepareDough();
      this.builder.addSauce();
      this.builder.addIngredients();
      this.builder.addCheese();
      this.builder.bake();
    }
  }

  /**
   * The client code creates a builder object, passes it to the director and then
   * initiates the construction process. The end result is retrieved from the
   * builder object.
   */
  function clientCode(director: Director) {
    const builder = new CheesePizzaBuilderThinCrust16Inches();
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

    const builder2 = new ChicagoDeepDish16InchSupreme();
    director.setBuilder(builder2);
    console.log("Chicago deep dish to go");
    director.prepForTakeOutAndBakeAtHome();
    builder2.getProduct().listParts();

    console.log("Chicago deep dish for here");
    director.prepAndBake();
    builder2.getProduct().listParts();
  }

  const director = new Director();
  clientCode(director);
}
