const inquirer = require("inquirer");

async function viewDept(db) {
  try {
    const [departments] = await db.promise().query("SELECT * FROM department;");
    console.table(departments) + "\n";
  } catch (err) {
    console.log(err);
  }
}

async function viewEmployee(db) {
  try {
    const [employees] = await db.promise().query("SELECT * FROM employee;");
    console.table(employees) + "\n";
  } catch (err) {
    console.log(err);
  }
}

async function viewRole(db) {
  try {
    const [roles] = await db.promise().query("SELECT * FROM role;");
    console.table(roles) + "\n";
  } catch (err) {
    console.log(err);
  }
}

async function addDept(db) {
  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the new department?",
          name: "dept",
        },
      ])
      .then(function (res) {
        db.promise().query(
          `INSERT INTO department (name) VALUES (?)`,
          [res.dept],
          (err) => {
            err ? console.log(err) : null;
          }
        );
        console.log(`Added ${res.dept} to departments`);
      });
  } catch (err) {
    console.log(err);
  }
}

async function addRole(db) {
  try {
    const [departments] = await db.promise().query("SELECT * FROM department;");
    var list = [...departments];
  } catch {
    console.log(err);
  }

  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "role",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Which department does the role belong to?",
          choices: list,
          name: "dept",
        },
      ])
      .then(function (res) {
        for (num of list) {
          num.name === res.dept ? (newID = num.id) : (newID = list.length);
        }
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`,
          [res.role, res.salary, newID],
          (err, _res) => {
            err ? console.log(err) : null;
          }
        );
        console.log(`Added ${res.role} to roles`);
      });
  } catch (err) {
    console.log(err);
  }
}

async function addEmployee(db) {
  try {
    const [roleID] = await db.promise().query("SELECT * FROM role;");
    const [employeeID] = await db.promise().query("SELECT * FROM employee;");
    var roleList = roleID.map((role) => ({
      name: `${role.title}: ${role.id}`,
    }));
    var employeeList = employeeID.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}: ${employee.id}`,
    }));
  } catch {
    console.log(err);
  }

  try {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "What is the first name of the new employee?",
          name: "first",
        },
        {
          type: "input",
          message: "What is the last name of the new employee?",
          name: "last",
        },
        {
          type: "list",
          message: "What is the role id of the new employee?",
          choices: roleList,
          name: "role",
        },
        {
          type: "list",
          message: "Who is the manager of the new employee?",
          choices: employeeList,
          name: "manager",
        },
      ])
      .then(function (res) {
        const pickedRoleId = res.role.split(": ")[1];
        const pickedManagerId = res.manager.split(": ")[1];
        db.promise().query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
          [res.first, res.last, pickedRoleId, pickedManagerId],
          (err) => {
            err ? console.log(err) : null;
          }
        );
        console.log(`Added new employee!`);
      });
  } catch (err) {
    console.log(err);
  }
}

async function updateEmployee(db) {
  try {
    const [roleID] = await db.promise().query("SELECT * FROM role;");
    const [employeeID] = await db.promise().query("SELECT * FROM employee;");
    var roleList = roleID.map((role) => ({
      name: `${role.title}: ${role.id}`,
    }));
    var employeeList = employeeID.map((employee) => ({
      name: `${employee.first_name} ${employee.last_name}: ${employee.id}`,
    }));
    console.log(roleList, employeeList);
  } catch {
    console.log(err);
  }

  try {
    await inquirer
      .prompt([
        {
          type: "list",
          message: "What employee do you want to edit?",
          choices: employeeList,
          name: "person",
        },
        {
          type: "list",
          message: "What role do you want to assign?",
          choices: roleList,
          name: "newRole",
        },
      ])
      .then(function (res) {
        const pickedPerson = res.person.split(": ")[1];
        const pickedRole = res.newRole.split(": ")[1];
        db.promise().query(
          `UPDATE employee SET role_id = ${pickedRole} WHERE id = ${pickedPerson}`,
          [pickedPerson, pickedRole],
          (err) => {
            err ? console.log(err) : null;
          }
        );
        console.log(`Changed employee role!`);
      });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  viewDept,
  viewEmployee,
  viewRole,
  addDept,
  addRole,
  addEmployee,
  updateEmployee
};
