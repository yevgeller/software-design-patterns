var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(id, name) {
        this.id = id;
        this.name = name;
    }
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.employees = [];
        return _this;
    }
    return Manager;
}(Employee));
var StaffManagementRepository = /** @class */ (function () {
    function StaffManagementRepository() {
        this.managers = [];
        this.managers.push(new Manager(1, "Alice"));
        this.managers.push(new Manager(2, "Bob"));
    }
    StaffManagementRepository.prototype.addEmployee = function (managerId, employee) {
        var mgr = this.managers.filter(function (x) { return x.id === managerId; });
        if (mgr !== undefined && mgr.length > 0) {
            mgr[0].employees.push(employee);
        }
    };
    StaffManagementRepository.prototype.removeEmployee = function (managerId, employee) {
        var mgr = this.managers.filter(function (x) { return x.id === managerId; });
        if (mgr !== undefined && mgr.length > 0) {
            mgr[0].employees = mgr[0].employees.filter(function (x) { return x.id !== employee.id; });
        }
    };
    StaffManagementRepository.prototype.hasEmployee = function (managerId, employeeId) {
        var mgr = this.managers.filter(function (x) { return x.id === managerId; });
        if (mgr !== undefined && mgr.length > 0) {
            var employeeById = mgr[0].employees.filter(function (x) { return x.id === employeeId; });
            return employeeById.length > 0;
        }
        return false;
    };
    StaffManagementRepository.prototype.writeDataStore = function () {
        this.managers.forEach(function (x) {
            console.log("Manager ".concat(x.name, ", id: ").concat(x.id));
            if (x.employees !== undefined) {
                console.log("Employees count: ".concat(x.employees.length));
                x.employees.forEach(function (e) {
                    console.log("Employee: ".concat(e.name, ", id: ").concat(e.id));
                });
            }
            else {
                console.log("No employees assigned");
            }
        });
    };
    return StaffManagementRepository;
}());
var AddEmployeeToManager = /** @class */ (function () {
    function AddEmployeeToManager(repository, managerId, employee) {
        this.repository = repository;
        this.managerId = managerId;
        this.employee = employee;
    }
    AddEmployeeToManager.prototype.execute = function () {
        this.repository.addEmployee(this.managerId, this.employee);
    };
    AddEmployeeToManager.prototype.canExecute = function () {
        if (this.employee === undefined) {
            return false;
        }
        if (this.repository.hasEmployee(this.managerId, this.employee.id)) {
            return false;
        }
        //more checks...
        return true;
    };
    AddEmployeeToManager.prototype.undo = function () {
        this.repository.removeEmployee(this.managerId, this.employee);
    };
    return AddEmployeeToManager;
}());
var CommandManager = /** @class */ (function () {
    function CommandManager() {
        this.commandStack = [];
    }
    CommandManager.prototype.invoke = function (command) {
        if (command.canExecute()) {
            this.commandStack.push(command);
            command.execute();
        }
    };
    CommandManager.prototype.undo = function () {
        var _a;
        if (((_a = this.commandStack) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            var lastCommand = this.commandStack.pop();
            lastCommand.undo();
        }
    };
    return CommandManager;
}());
var cmdMgr = new CommandManager();
var repo = new StaffManagementRepository();
console.log("initial repository state:");
repo.writeDataStore();
console.log("--- Adding Kevin ---");
cmdMgr.invoke(new AddEmployeeToManager(repo, 1, new Employee(5, "Kevin")));
repo.writeDataStore();
console.log("Undoing last command");
cmdMgr.undo();
repo.writeDataStore();
