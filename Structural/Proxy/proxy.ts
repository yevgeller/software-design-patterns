interface IResourceProvider {
  getResource(): boolean;
}

class Resource implements IResourceProvider {
  getResource(): boolean {
    console.log("Here you go!");
    return true;
  }
}

class ResourceControllerByWhim implements IResourceProvider {
  resource: Resource;
  constructor() {
    this.resource = new Resource();
  }

  getResource(): boolean {
    let whim = Math.floor(Math.random() * 10);
    console.log("whim: ", whim);
    if (whim < 3) {
      console.log("contacting remote resource...");
      setTimeout(() => {
        this.resource.getResource();
        return true;
      }, 1000);
    } else {
      console.log("I don't feel like it, so no.");
      return false;
    }
  }
}

class ResourceControllerByPermissions implements IResourceProvider {
  resource: Resource;
  permission: string;
  constructor(permission: string) {
    this.resource = new Resource();
    this.permission = permission;
  }

  getResource(): boolean {
    if (this.permission === "access") return this.resource.getResource();
    else {
      console.log("Access denied");
      return false;
    }
  }
}

let whimmed = new ResourceControllerByWhim();
let result = false;
while (result === false) {
  result = whimmed.getResource();
}
setTimeout(() => {
  console.log("\n\n----- Permission Proxy access example: no permissions");
  let noPermission = new ResourceControllerByPermissions("no access");
  noPermission.getResource();

  console.log("----- Permission Proxy access example: with permissions");
  let yesPermission = new ResourceControllerByPermissions("access");
  yesPermission.getResource();
}, 2000);
