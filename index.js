const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const { viewDept, viewEmployee } = require('./helperFunctions');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  err ? console.log("Error connecting...") : null;
});

async function main() {
  console.info('\x1b[34m', 'Welcome to the Employee Tracker 1.0! Please respond below.');
  
    try {
      const response = await inquirer.prompt([
        {
          type: 'list',
          message: 'What do you want to do?:',
          name: 'List',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
          ],
        },
      ]);
      
      switch (response.List) {
        case 'View all departments':
          console.log('Viewing all departments');
          viewDept(db);
          setTimeout(async () => {
            await main();
          }, 1000);
          break;
        case 'View all roles':
          console.log('Viewing all roles');
    
          break;
        case 'View all employees':
          console.log('Viewing all employees');
          viewEmployee(db);
          setTimeout(async () => {
            await main();
          }, 1000);
          break;
        case 'Add a department':
          console.log('Adding a department');
          
          break;
        case 'Add a role':
          console.log('Adding a role');
          
          break;
        case 'Add an employee':
          console.log('Adding an employee');
          
          break;
        case 'Update an employee role':
          console.log('Updating an employee role');
          
          break;
        case 'Exit':
          console.log('Exiting the program.');
          return;
        default:
          console.log('Invalid choice');
          break;
      }
    } catch (err) {
      console.error(err);
    }
  }

main();
