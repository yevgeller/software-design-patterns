class Resource {
  getResource(): void {
    console.log("Here you go!");
  }
}

class ResourceControllerByWhim {
  resource: Resource;
  constructor() {
    this.resource = new Resource();
  }

  getResource(): void {
    let whim = Math.floor(Math.random() * 10);
    console.log("whim: ", whim);
    if (whim < 3) {
      console.log("contacting remote resource...");
      setTimeout(() => this.resource.getResource(), 1000);
    } else console.log("I don't feel like it, so no.");
  }
}

class ResourceControllerByPermissions {
  resource: Resource;
  permission: string;
  constructor(permission: string) {
    this.resource = new Resource();
    this.permission = permission;
  }

  getResource(): void {
    if (this.permission === "access") return this.resource.getResource();
    else console.log("Access denied");
  }
}

let whimmed = new ResourceControllerByWhim();
whimmed.getResource();