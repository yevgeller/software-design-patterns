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

class Branch extends Component {
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

const root = new Branch("root");
root.add(new Leaf("Leaf 1"));
root.add(new Leaf("Leaf 2"));

const comp1 = new Branch("Subtree 1");
comp1.add(new Leaf("Subtree 1 Leaf 1"));
comp1.add(new Leaf("Subtree 1 Leaf 2"));

const comp2 = new Branch("Sub-Subtree 1");
comp2.add(new Leaf("Sub-Subtree 1 Leaf 1"));
comp1.add(comp2);

root.add(comp1);
root.add(new Leaf("Leaf 3"));

root.primaryOperation(1);

class ComponentTreeBuilder {
  rootComponent: Branch;
  currentComponent: Branch;
  constructor(rootComponentName: string) {
    this.rootComponent = new Branch(rootComponentName);
    this.currentComponent = this.rootComponent;
  }

  addComponentItem(name: string): Branch {
    let comp = new Branch(name);
    this.currentComponent.add(comp);
    this.currentComponent = comp;
    return comp;
  }

  addLeaf(name: string): Leaf {
    let leaf = new Leaf(name);
    this.currentComponent.add(leaf);
    return leaf;
  }

  setCurrentComponent(branchName: string): Branch {
    let stack = [];
    stack.push(this.rootComponent);
    while (stack.length > 0) {
      let current = stack.pop();
      if (current.name === branchName) {
        this.currentComponent = current;
        return current;
      }
      let branchesOfCurrent = current.components.filter(
        (x) => typeof x.add === "function"
      );
      stack.push(...branchesOfCurrent);
    }
    throw new Error(
      `Component name '${branchName}' does not exist in the current hierarchy`
    );
  }
}

const builder = new ComponentTreeBuilder("root");
builder.addComponentItem("left branch");
builder.addLeaf("left branch leaf 1");
builder.addLeaf("left branch leaf 2");
builder.setCurrentComponent("root");
builder.addComponentItem("center");
builder.addLeaf("center branch leaf 1");
builder.addLeaf("center branch leaf 2");
builder.setCurrentComponent("root");
builder.addComponentItem("right");
builder.addLeaf("right branch leaf 1");
builder.addLeaf("right branch leaf 2");
builder.setCurrentComponent("center");
builder.addComponentItem("sub-center");
builder.addLeaf("sub-center leaf");
builder.rootComponent.primaryOperation(1);
