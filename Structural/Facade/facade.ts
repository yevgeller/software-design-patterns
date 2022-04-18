class Refrigerator {
  items = [] as any;
  open = () => console.log("refrigerator is open");
  close = () => console.log("refrigerator is closed");
  get = (item: string) => {
    if (this.items.indexOf(item) >= 0) return `retrieved ${item}`;
    else return `no ${item} in the fridge`;
  };

  constructor() {
    this.items = ["eggs", "bacon", "sausage", "orange juice", "milk", "cream"];
  }
}

class Chef {
  comeInToWork = () => console.log("grumble grumble, I have arrived");
  leave = () => console.log("see you tomorrow");
  washHands = () =>
    console.log("I am going to go wash my hands, back in a minute");
}

class Stove {
  mediumHeat = () => console.log("stove is on medium heat");
  highHeat = () => console.log("stove is on high heat");
  lowHeat = () => console.log("stove is on low heat");
}

//maybe redo this as a movie projection or a play start
