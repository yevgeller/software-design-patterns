class Employee {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Manager extends Employee {
  employees: Employee[] = [];
}

interface IStaffManagementRepository {
  addEmployee(managerId: number, employee: Employee): void;
  removeEmployee(managerId: number, employee: Employee): void;
  hasEmployee(managerId: number, employeeId: number): boolean;
  writeDataStore(): void;
}

class StaffManagementRepository implements IStaffManagementRepository {
  managers: Manager[];

  constructor() {
    this.managers = [];
    this.managers.push(new Manager(1, "Alice"));
    this.managers.push(new Manager(2, "Bob"));
  }

  addEmployee(managerId: number, employee: Employee): void {
    let mgr = this.managers.filter((x) => x.id === managerId);
    if (mgr !== undefined && mgr.length > 0) {
      mgr[0].employees.push(employee);
    }
  }
  removeEmployee(managerId: number, employee: Employee): void {
    let mgr = this.managers.filter((x) => x.id === managerId);
    if (mgr !== undefined && mgr.length > 0) {
      mgr[0].employees = mgr[0].employees.filter((x) => x.id !== employee.id);
    }
  }
  hasEmployee(managerId: number, employeeId: number): boolean {
    let mgr = this.managers.filter((x) => x.id === managerId);
    if (mgr !== undefined && mgr.length > 0) {
      let employeeById = mgr[0].employees.filter((x) => x.id === employeeId);
      return employeeById.length > 0;
    }
    return false;
  }
  writeDataStore(): void {
    this.managers.forEach((x) => {
      console.log(`Manager ${x.name}, id: ${x.id}`);
      if (x.employees !== undefined) {
        console.log(`Employees count: ${x.employees.length}`);
        x.employees.forEach((e) => {
          console.log(`Employee: ${e.name}, id: ${e.id}`);
        });
      } else {
        console.log("No employees assigned");
      }
    });
  }
}

interface ICommand {
  execute(): void;
  canExecute(): boolean;
  undo(): void;
}

class AddEmployeeToManager implements ICommand {
  private readonly repository: IStaffManagementRepository;
  private readonly managerId: number;
  private readonly employee: Employee;

  constructor(
    repository: IStaffManagementRepository,
    managerId: number,
    employee: Employee
  ) {
    this.repository = repository;
    this.managerId = managerId;
    this.employee = employee;
  }

  execute(): void {
    this.repository.addEmployee(this.managerId, this.employee);
  }
  canExecute(): boolean {
    if (this.employee === undefined) {
      return false;
    }

    if (this.repository.hasEmployee(this.managerId, this.employee.id)) {
      return false;
    }
    //more checks...
    return true;
  }
  undo(): void {
    this.repository.removeEmployee(this.managerId, this.employee);
  }
}

class CommandManager {
  //since there is no UI, this will be a way to "click" "buttons"

  private commandStack: ICommand[];
  constructor() {
    this.commandStack = [];
  }
  public invoke(command: ICommand): void {
    if (command.canExecute()) {
      this.commandStack.push(command);
      command.execute();
    }
  }

  public undo(): void {
    if (this.commandStack?.length > 0) {
      let lastCommand = this.commandStack.pop();
      lastCommand.undo();
    }
  }
}

let cmdMgr = new CommandManager();
let repo = new StaffManagementRepository();
console.log("initial repository state:");
repo.writeDataStore();
console.log("--- Adding Kevin ---");
cmdMgr.invoke(new AddEmployeeToManager(repo, 1, new Employee(5, "Kevin")));
repo.writeDataStore();
console.log("--- Undoing last command ---");
cmdMgr.undo();
repo.writeDataStore();
