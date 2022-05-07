var IngredientIterator;
(function (IngredientIterator) {
    var Ingredient = /** @class */ (function () {
        function Ingredient(name, isDry, unitOfMeasure, units) {
            this.name = name;
            this.isDry = isDry;
            this.unitOfMeasure = unitOfMeasure;
            this.units = units;
        }
        return Ingredient;
    }());
    var Recipe = /** @class */ (function () {
        function Recipe(ingredients, directions) {
            this.ingredients = new IngredientsCollection(ingredients);
            //this.ingredients = ingredients;
            this.directions = directions;
        }
        Recipe.prototype.printRecipe = function () {
            console.log('here');
            var ingrenum = this.ingredients.getEnumerator();
            while (ingrenum.hasNext()) {
                console.log(ingrenum.next().name);
            }
        };
        return Recipe;
    }());
    var IngredientsCollection = /** @class */ (function () {
        function IngredientsCollection(ingre) {
            if (ingre === undefined || ingre.length === 0)
                throw new Error("Cannot iterate over empty ingredient collection");
            this.ingre = ingre;
        }
        IngredientsCollection.prototype.getEnumerator = function () {
            return new Ingrenumerator(this.ingre);
        };
        IngredientsCollection.prototype.getLength = function () {
            return this.ingre.length;
        };
        return IngredientsCollection;
    }());
    var Ingrenumerator = /** @class */ (function () {
        function Ingrenumerator(ingre) {
            this.ingre = ingre;
            this.currentIndex = 0;
            this.currentItem = ingre[0];
        }
        Ingrenumerator.prototype.next = function () {
            if (!this.hasNext())
                return null;
            this.currentIndex++;
            this.currentItem = this.ingre[this.currentIndex];
            return this.currentItem;
        };
        Ingrenumerator.prototype.hasNext = function () { return this.currentIndex < this.ingre.length - 1; };
        Ingrenumerator.prototype.sortIncomingIngredients = function (incoming) {
        };
        return Ingrenumerator;
    }());
    var ingrFlour = new Ingredient('flour', true, 'cup', '1.5');
    var ingrSugar = new Ingredient('sugar', true, 'cup', '0.5');
    var ingrBakingPowder = new Ingredient('baking powder', true, 'tsp', '1.5');
    var ingrSalt = new Ingredient('salt', true, 'tsp', '0.5');
    var ingrOil = new Ingredient('oil', false, 'cup', '1/3');
    var ingrVanilla = new Ingredient('vanilla extract', false, 'tbsp', '2');
    var ingrRicotta = new Ingredient('ricotta cheese', false, 'cup', '1.5');
    var ingrMilk = new Ingredient('milk', false, 'tbsp', '5');
    var ingrEgg = new Ingredient('egg', false, 'unit', '1');
    var ingrBlueberries = new Ingredient('blueberries', false, 'cup', '1/3');
    var arrayOfIngre = [ingrBakingPowder, ingrBlueberries, ingrEgg, ingrFlour, ingrMilk, ingrOil, ingrRicotta, ingrSalt, ingrSugar, ingrVanilla];
    var muffins = new Recipe(arrayOfIngre, ['mix dry ingredients', 'mix wet ingredients', 'mix together', 'bake at 375 for 35 minutes']);
    muffins.printRecipe();
})(IngredientIterator || (IngredientIterator = {}));
