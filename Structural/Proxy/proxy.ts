class Resource {
  getResource(): boolean {
    console.log("Here you go!");
    return true;
  }
}

class ResourceControllerByWhim {
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

class ResourceControllerByPermissions {
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
whimmed.getResource();
whimmed.getResource();
whimmed.getResource();
whimmed.getResource();
whimmed.getResource();
whimmed.getResource();

let noPermission = new ResourceControllerByPermissions("no access");
noPermission.getResource();

let yesPermission = new ResourceControllerByPermissions("access");
yesPermission.getResource();
