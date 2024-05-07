const inquirer = require('inquirer');
const queryBuilder = require('./queries');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'employee_db'
});

// Create Arrays for List Choices
const managers = [];
const departments = [];
const roles = [];
const employees = [];

// Questions for Inquirer
const options = [
    {
        type: 'list',
        name: 'options',
        message: 'Select one of the following:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Department', 'View Employees by Manager', 'View Total Utilized Budget by Department', new inquirer.Separator(), 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Update Employee Manager', new inquirer.Separator(), "Delete a Department", "Delete a Role", "Delete an Employee", new inquirer.Separator()],
        default: 0
    },
    {
        type: 'list',
        name: 'department',
        message: 'Select Department:',
        choices: departments,
        default: 0,
        when: (answers) => answers.options === 'View Employees by Department'
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select Manager:',
        choices: managers,
        default: 0,
        when: (answers) => answers.options === 'View Employees by Manager',
        loop: false
    },
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter New Department Name.',
        when: (answers) => answers.options === 'Add a Department',
        validate: (answer) => answer ? true : 'Input Required.'
    },
    {
        type: 'input',
        name: 'roleName',
        message: 'Enter New Role Name.',
        when: (answers) => answers.options === 'Add a Role',
        validate: (answer) => answer ? true : 'Input Required.'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter New Role Salary.',
        when: (answers) => answers.options === 'Add a Role',
        validate: (answer) => isNaN(answer) ? 'Please enter a number' : true
    },
    {
        type: 'list',
        name: 'roleDepartment',
        message: 'Enter New Role Department.',
        choices: departments,
        when: (answers) => answers.options === 'Add a Role',
        validate: (answer) => answer ? true : 'Input Required.'
    },
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'Enter New Employee First Name.',
        when: (answers) => answers.options === 'Add an Employee',
        validate: (answer) => answer ? true : 'Input Required.'
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'Enter New Employee Last Name.',
        when: (answers) => answers.options === 'Add an Employee',
        validate: (answer) => answer ? true : 'Input Required.'
    },
    {
        type: 'list',
        name: 'employeeID',
        message: 'Select Employee from List.',
        choices: employees,
        when: (answers) => answers.options === "Update Employee Role" || answers.options === "Update Employee Manager",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Select New Employee Role.',
        choices: roles,
        when: (answers) => answers.options === "Add an Employee" || answers.options === "Update Employee Role",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Select New Employee Manager.',
        choices: employees,
        when: (answers) => answers.options === "Add an Employee" || answers.options === "Update Employee Manager",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'department',
        message: 'Select Department to Delete.',
        choices: departments,
        when: (answers) => answers.options === "Delete a Department",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select Role to Delete.',
        choices: roles,
        when: (answers) => answers.options === "Delete a Role",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employee',
        message: 'Select Employee to Delete.',
        choices: employees,
        when: (answers) => answers.options === "Delete an Employee",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    }
]

const handler = () =>{
    // Clears and populates each choices array on each calling of function
    pool.query("SELECT m.id AS value, m.first_name || ' ' || m.last_name AS name FROM employees m JOIN employees e ON e.manager_id = m.id GROUP BY m.id;")
    .then((manList) => {
        managers.splice(0, managers.length);
        for (let man of manList.rows) {
            managers.push(man)
        }
    });
    pool.query('SELECT department_name AS name, id AS value FROM departments;')
    .then((deptList) => {
        departments.splice(0, departments.length);
        for (let dept of deptList.rows) {
            departments.push(dept)
        }
    });
    pool.query('SELECT title AS name, id AS value FROM roles;')
    .then((roleList) => {
        roles.splice(0, roles.length);
        for (let role of roleList.rows) {
            roles.push(role)
        }
    });
    pool.query("SELECT first_name || ' ' || last_name AS name, id AS value FROM employees;")
    .then((employeeList) => {
        employees.splice(0, employees.length);
        for (let employee of employeeList.rows) {
            employees.push(employee)
        }
    });

    // Runs prompts, asks question to re-run function after answers processed
    inquirer
    .prompt(options)
    .then((answers) => {
        const sqlQuery = queryBuilder(answers)
        pool.query(sqlQuery)
        .then((data) => {
            console.table(data.rows);
            inquirer
            .prompt([{
            type: 'confirm',
            name: 'continue',
            message: 'Perform another action?'
            }])
            .then(answers => answers.continue ? handler() : process.exit())
        })
    })
    .catch((err) => console.error('Error: ', err))
}

handler();

module.exports = handler;