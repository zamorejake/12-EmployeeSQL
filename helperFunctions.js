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

module.exports = { viewDept, viewEmployee };
