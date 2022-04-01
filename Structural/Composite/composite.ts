class Component {
  name: string;
  primaryOperation(depth: number): void {}

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
  primaryOperation = (depth: number): void =>
    console.log(Array(depth).join("-") + this.name);
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

  add = (component: Component): number => this.components.push(component);

  remove = (component: Component): Component[] =>
    (this.components = this.components.filter(
      (x) => x.name !== component.name
    ));
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

root.primaryOperation(1);

class FileSystemBuilder {
  rootComposite: Composite;
  currentDirectory: Composite;
  constructor(rootCompositeName: string) {
    this.rootComposite = new Composite(rootCompositeName);
    this.currentDirectory = this.rootComposite;
  }

  addCompositeItem(name: string): Composite {
    let comp = new Composite(name);
    this.currentDirectory.add(comp);
    this.currentDirectory = comp;
    return comp;
  }

  addLeaf(name: string): Leaf {
    let leaf = new Leaf(name);
    this.currentDirectory.add(leaf);
    return leaf;
  }

  setCurrentComposite(compositeName: string): Composite {
    let stack = [];
    stack.push(this.rootComposite);
    while (stack.length > 0) {
      let current = stack.pop();
      if (current.name === compositeName) {
        this.currentDirectory = current;
        return current;
      }
      let compositesOfCurrent = current.components.filter(
        (x) => typeof x.add === "function"
      );
      stack.push(...compositesOfCurrent);
    }
    throw new Error(
      `Composite name '${compositeName}' does not exist in the current hierarchy`
    );
  }
}

const builder = new FileSystemBuilder("top");
builder.addCompositeItem("left");
builder.addLeaf("left 1");
builder.addLeaf("left 2");
builder.setCurrentComposite("top");
builder.addCompositeItem("center");
builder.addLeaf("center 1");
builder.addLeaf("center 2");
builder.setCurrentComposite("top");
builder.addCompositeItem("right");
builder.addLeaf("right 1");
builder.addLeaf("right 2");
builder.setCurrentComposite("center");
builder.addCompositeItem("sub-center");
builder.addLeaf("sub-center leaf");
builder.setCurrentComposite("satoheu");
builder.rootComposite.primaryOperation(1);
