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
root.add(new Leaf("Leaf 1"));
root.add(new Leaf("Leaf 2"));

const comp1 = new Composite("Subtree 1");
comp1.add(new Leaf("Subtree 1 Leaf 1"));
comp1.add(new Leaf("Subtree 1 Leaf 2"));

const comp2 = new Composite("Sub-Subtree 1");
comp2.add(new Leaf("Sub-Subtree 1 Leaf 1"));
comp1.add(comp2);

root.add(comp1);
root.add(new Leaf("Leaf 3"));

// let leaf = new Leaf("Leaf 4");
// root.add(leaf);
// root.remove(leaf);

root.primaryOperation(1);