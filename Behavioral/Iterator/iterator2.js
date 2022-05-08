var IngredientIterator;
(function (IngredientIterator) {
    var Ingredient = /** @class */ (function () {
        function Ingredient(name, isDry, unitOfMeasure, units) {
            var _this = this;
            this.displayIngredient = function () {
                return "".concat(_this.name, " (").concat(_this.isDry ? "dry" : "wet", "), ").concat(_this.units, " ").concat(_this.unitOfMeasure.toLocaleLowerCase() === "unit"
                    ? ""
                    : _this.unitOfMeasure);
            };
            this.name = name;
            this.isDry = isDry;
            this.unitOfMeasure = unitOfMeasure;
            this.units = units;
        }
        return Ingredient;
    }());
    var Recipe = /** @class */ (function () {
        function Recipe(dishName, ingredients, directions) {
            this.dishName = dishName;
            this.ingredients = new IngredientsCollection(ingredients);
            this.directions = directions;
        }
        Recipe.prototype.printRecipe = function () {
            console.log(this.dishName.toUpperCase());
            var ingrenum = this.ingredients.getEnumerator();
            console.log("\nINGREDIENTS:");
            while (ingrenum.hasNext()) {
                console.log(ingrenum.next().displayIngredient());
            }
            console.log("\nDIRECTIONS: ");
            this.directions.forEach(function (d) { return console.log(d); });
        };
        Recipe.prototype.cookRecipe = function () {
            //lol not this time
        };
        return Recipe;
    }());
    var IngredientsCollection = /** @class */ (function () {
        function IngredientsCollection(allIngredients) {
            if (allIngredients === undefined || allIngredients.length === 0)
                throw new Error("Cannot iterate over empty ingredient collection");
            this.allIngredients = allIngredients;
        }
        IngredientsCollection.prototype.getEnumerator = function () {
            return new IngredientEnumerator(this.allIngredients);
        };
        return IngredientsCollection;
    }());
    var IngredientEnumerator = /** @class */ (function () {
        function IngredientEnumerator(allIngredients) {
            this.allIngredients = allIngredients;
            this.sortIngredientsByTypeThenName();
            this.currentIndex = 0;
            this.currentItem = allIngredients[0];
        }
        IngredientEnumerator.prototype.next = function () {
            if (!this.hasNext())
                return null;
            this.currentIndex++;
            this.currentItem = this.allIngredients[this.currentIndex];
            return this.currentItem;
        };
        IngredientEnumerator.prototype.hasNext = function () {
            return this.currentIndex < this.allIngredients.length - 1;
        };
        IngredientEnumerator.prototype.sortIngredientsByTypeThenName = function () {
            var _a;
            var sorted = this.allIngredients.filter(function (x) { return x.isDry == true; });
            sorted.sort(function (a, b) { return (a.name > b.name ? 1 : a.name < b.name ? -1 : 0); });
            var wetIngredients = this.allIngredients.filter(function (x) { return x.isDry === false; });
            wetIngredients.sort(function (a, b) {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            });
            sorted.push.apply(sorted, wetIngredients);
            this.allIngredients.length = 0;
            (_a = this.allIngredients).push.apply(_a, sorted);
        };
        return IngredientEnumerator;
    }());
    var ingrFlour = new Ingredient("flour", true, "cup", "1.5");
    var ingrSugar = new Ingredient("sugar", true, "cup", "0.5");
    var ingrBakingPowder = new Ingredient("baking powder", true, "tsp", "1.5");
    var ingrSalt = new Ingredient("salt", true, "tsp", "0.5");
    var ingrOil = new Ingredient("oil", false, "cup", "1/3");
    var ingrVanilla = new Ingredient("vanilla extract", false, "tbsp", "2");
    var ingrRicotta = new Ingredient("ricotta cheese", false, "cup", "1.5");
    var ingrMilk = new Ingredient("milk", false, "tbsp", "5");
    var ingrEgg = new Ingredient("egg", false, "unit", "1");
    var ingrBlueberries = new Ingredient("blueberries", false, "cup", "1/3");
    var arrayOfIngre = [
        ingrBakingPowder,
        ingrBlueberries,
        ingrEgg,
        ingrFlour,
        ingrMilk,
        ingrOil,
        ingrRicotta,
        ingrSalt,
        ingrSugar,
        ingrVanilla,
    ];
    var muffins = new Recipe("Ricotta blueberry muffins", arrayOfIngre, [
        "mix dry ingredients",
        "mix wet ingredients",
        "mix together",
        "put in muffin pan",
        "bake at 375 for 32 minutes or until ready",
    ]);
    muffins.printRecipe();
})(IngredientIterator || (IngredientIterator = {}));
