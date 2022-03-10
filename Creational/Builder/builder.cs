namespace NoBuilderPattern
{
    using System;

    public class Pizza {
        private int size = 16;
        private bool cheese = true;
        private bool pepperoni = false;
        private bool blackOlives = false;
        private bool greenOlives = false;
        private bool bellPeppers = false;
        private bool pineapple = false;
        private bool onions = false;
        private bool steak = false;
        private bool chicken = false;
        private bool bacon = false;
        private bool ranch = false;
        public Pizza()
        {
            this.size = 16;
        }

        public Pizza(int size)
        {
            this.size = size;
        }

        public Pizza(bool pepperoni)
        {
            this.pepperoni = pepperoni;
        }

        public Pizza(int size = 16, bool cheese = true, bool pepperoni = false, 
        bool blackOlives = false, bool greenOlives = false, bool bellPeppers = false,
        bool pineapple = false, bool onions = false, bool steak = false,
        bool chicken = false, bool bacon = false, bool ranch = false)
        {
            this.size = size;
            this.cheese = cheese;
            this.pepperoni = pepperoni;
            this.blackOlives = blackOlives;
            this.greenOlives = greenOlives;
            this.bellPeppers = bellPeppers;
            this.pineapple = pineapple;
            this.onions = onions;
            this.steak = steak;
            this.chicken = chicken;
            this.bacon = bacon;
            this.ranch = ranch;
        }
    }
}