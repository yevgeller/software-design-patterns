var IngredientIterator;
(function (IngredientIterator) {
    var Ingredient = /** @class */ (function () {
        function Ingredient(name, isDry, unitOfMeasure, units) {
            var _this = this;
            this.displayIngredient = function () { return "".concat(_this.name, " (").concat(_this.isDry ? 'dry' : 'wet', "), ").concat(_this.units, " ").concat(_this.unitOfMeasure.toLocaleLowerCase() === 'unit' ? '' : _this.unitOfMeasure); };
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
            //this.ingredients = ingredients;
            this.directions = directions;
        }
        Recipe.prototype.printRecipe = function () {
            console.log(this.dishName.toUpperCase());
            var ingrenum = this.ingredients.getEnumerator();
            console.log('\n\n\n');
            while (ingrenum.hasNext()) {
                console.log(ingrenum.next().displayIngredient());
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
            this.sortIngredientsByTypeThenName();
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
        Ingrenumerator.prototype.sortIngredientsByTypeThenName = function () {
            var sorted = this.ingre.filter(function (x) { return x.isDry == true; });
            sorted.sort(function (a, b) { return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
            console.log('dry:');
            sorted.forEach(function (i) { return console.log(i.displayIngredient()); });
            console.log('\nwet:');
            var wetIngredients = this.ingre.filter(function (x) { return x.isDry === false; });
            wetIngredients.sort(function (a, b) { return (a.name > b.name) ? 1 : ((a.name < b.name) ? -1 : 0); });
            wetIngredients.forEach(function (i) { return console.log(i.displayIngredient()); });
            // sorted.push(wetIngredients)
            // this.ingre.length = 0;
            // this.ingre.push(sorted);
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
    var muffins = new Recipe('Ricotta blueberry muffins', arrayOfIngre, ['mix dry ingredients', 'mix wet ingredients', 'mix together', 'bake at 375 for 35 minutes']);
    muffins.printRecipe();
})(IngredientIterator || (IngredientIterator = {}));
