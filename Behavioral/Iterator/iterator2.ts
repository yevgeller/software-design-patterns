namespace IngredientIterator {
    interface IngrEnumerable {
        getEnumerator(): IIngredientIterator;
    }

    class Ingredient {
        name: string;
        isDry: boolean;
        unitOfMeasure: string;
        units: string;
        constructor(
            name: string,
            isDry: boolean,
            unitOfMeasure: string,
            units: string
        ) {
            this.name = name;
            this.isDry = isDry;
            this.unitOfMeasure = unitOfMeasure;
            this.units = units;
        }
    }

    class Recipe {
        ingredients: IngredientsCollection; //Array<Ingredient>;
        directions: Array<string>;

        constructor(ingredients: Array<Ingredient>, directions: Array<string>) {
            this.ingredients = new IngredientsCollection(ingredients);
            //this.ingredients = ingredients;
            this.directions = directions;
        }
        printRecipe(): void {
            console.log('here')
            let ingrenum = this.ingredients.getEnumerator();
            while (ingrenum.hasNext()) {
                console.log(ingrenum.next().name);
            }

        }
    }

    interface IIngredientIterator {
        next(): Ingredient;
        hasNext(): boolean;
        currentItem: Ingredient;
    }

    class IngredientsCollection implements IngrEnumerable {
        private ingre: Array<Ingredient>;
        constructor(ingre: Array<Ingredient>) {
            if (ingre === undefined || ingre.length === 0)
                throw new Error("Cannot iterate over empty ingredient collection")
            this.ingre = ingre;
        }
        getEnumerator(): IIngredientIterator {
            return new Ingrenumerator(this.ingre);
        }
        getLength(): number {
            return this.ingre.length;
        }
    }

    class Ingrenumerator implements IIngredientIterator {
        private ingre: Array<Ingredient>;
        private currentIndex: number;
        currentItem: Ingredient;
        constructor(ingre: Array<Ingredient>) {
            this.ingre = ingre;
            this.currentIndex = 0;
            this.currentItem = ingre[0]
        }
        next(): Ingredient {
            if (!this.hasNext()) return null;
            this.currentIndex++;
            this.currentItem = this.ingre[this.currentIndex];
            return this.currentItem;
        }
        hasNext(): boolean { return this.currentIndex < this.ingre.length - 1 }
        private sortIncomingIngredients(incoming: Array<Ingredient>) {

        }
    }
    let ingrFlour = new Ingredient('flour', true, 'cup', '1.5');
    let ingrSugar = new Ingredient('sugar', true, 'cup', '0.5')
    let ingrBakingPowder = new Ingredient('baking powder', true, 'tsp', '1.5')
    let ingrSalt = new Ingredient('salt', true, 'tsp', '0.5')
    let ingrOil = new Ingredient('oil', false, 'cup', '1/3')
    let ingrVanilla = new Ingredient('vanilla extract', false, 'tbsp', '2')
    let ingrRicotta = new Ingredient('ricotta cheese', false, 'cup', '1.5')
    let ingrMilk = new Ingredient('milk', false, 'tbsp', '5')
    let ingrEgg = new Ingredient('egg', false, 'unit', '1')
    let ingrBlueberries = new Ingredient('blueberries', false, 'cup', '1/3')
    let arrayOfIngre = [ingrBakingPowder, ingrBlueberries, ingrEgg, ingrFlour, ingrMilk, ingrOil, ingrRicotta, ingrSalt, ingrSugar, ingrVanilla] as Array<Ingredient>

    let muffins = new Recipe(arrayOfIngre, ['mix dry ingredients', 'mix wet ingredients', 'mix together', 'bake at 375 for 35 minutes'])
    muffins.printRecipe();
}