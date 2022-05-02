var Resource = /** @class */ (function () {
    function Resource() {
    }
    Resource.prototype.getResource = function () {
        console.log("Here you go!");
    };
    return Resource;
}());
var ResourceControllerByWhim = /** @class */ (function () {
    function ResourceControllerByWhim() {
        this.resource = new Resource();
    }
    ResourceControllerByWhim.prototype.getResource = function () {
        var _this = this;
        var whim = Math.floor(Math.random() * 10);
        console.log("whim: ", whim);
        if (whim < 3) {
            console.log("contacting remote resource...");
            setTimeout(function () { return _this.resource.getResource(); }, 1000);
        }
        else
            console.log("I don't feel like it, so no.");
    };
    return ResourceControllerByWhim;
}());
var ResourceControllerByPermissions = /** @class */ (function () {
    function ResourceControllerByPermissions(permission) {
        this.resource = new Resource();
        this.permission = permission;
    }
    ResourceControllerByPermissions.prototype.getResource = function () {
        if (this.permission === "access")
            return this.resource.getResource();
        else
            console.log("Access denied");
    };
    return ResourceControllerByPermissions;
}());
var whimmed = new ResourceControllerByWhim();
whimmed.getResource();
whimmed.getResource();
whimmed.getResource();
var noPermission = new ResourceControllerByPermissions("no access");
noPermission.getResource();
var yesPermission = new ResourceControllerByPermissions("access");
yesPermission.getResource();
