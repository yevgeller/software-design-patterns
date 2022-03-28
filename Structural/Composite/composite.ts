class Component {
  name: string;
  primaryOperation(depth: number): void {}
  add(component: Component): void {}
  remove(component: Component): void {}

  constructor(name: string) {
    this.name = name;
  }
}

class Leaf extends Component {
  name: string;
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  primaryOperation(depth: number): void {
    console.log(Array(depth).join("-") + this.name);
  }
  add(component: Component): void {
    throw new Error("Method not implemented.");
  }
  remove(component: Component): void {
    throw new Error("Method not implemented.");
  }
}

class Composite extends Component {
  name: string;
  components: Component[];
  constructor(name: string) {
    super(name);
    this.name = name;
    this.components = [];
  }
  primaryOperation(depth: number): void {
    console.log(Array(depth).join("-") + this.name);
    this.components.forEach((x) => x.primaryOperation(depth + 2));
  }
  add(component: Component): void {
    this.components.push(component);
  }
  remove(component: Component): void {
    this.components = this.components.filter((x) => x.name !== component.name);
  }
}

const root = new Composite("root");
root.add(new Leaf("Leaf A"));
root.add(new Leaf("Leaf B"));

const comp1 = new Composite("Composite C1");
comp1.add(new Leaf("Leaf C1-A"));
comp1.add(new Leaf("Leaf C1-B"));

const comp2 = new Composite("Composite C2");
comp2.add(new Leaf("Leaf C2-A"));
comp1.add(comp2);

root.add(comp1);
root.add(new Leaf("Leaf C"));

let leaf = new Leaf("Leaf D");
root.add(leaf);
root.remove(leaf);

root.primaryOperation(1);
