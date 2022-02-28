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
}