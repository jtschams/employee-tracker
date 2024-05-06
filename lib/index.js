const inquirer = require('inquirer');
// TODO: const queries = require('queries');
const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'employee_db'
});

pool.connect();

// Create Arrays for List Choices
const managers = [];
pool.query("SELECT m.id AS value, m.first_name || ' ' || m.last_name AS name FROM employees m JOIN employees e ON e.manager_id = m.id GROUP BY m.id;")
.then((manList) => {
    for (let man of manList.rows) {
        managers.push(man)
    }
});

const departments = [];
pool.query('SELECT department_name FROM departments;')
.then((deptList) => {
    for (let dept of deptList.rows) {
        departments.push(dept.department_name)
    }
});

const roles = [];
pool.query('SELECT title FROM roles;')
.then((roleList) => {
    for (let role of roleList.rows) {
        roles.push(role.title)
    }
});

const employees = [];
pool.query("SELECT first_name || ' ' || last_name AS name, id AS value FROM employees;")
.then((employeeList) => {
    for (let employee of employeeList.rows) {
        employees.push(employee)
    }
});

// Questions for Inquirer
const options = [
    {
        type: 'list',
        name: 'options',
        message: 'Select one of the following:',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Department', 'View Employees by Manager', 'View Total Utilized Budget by Department', new inquirer.Separator(), 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Update Employee Manager', new inquirer.Separator()],
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
        type: 'number',
        name: 'roleSalary',
        message: 'Enter New Role Salary.',
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
        name: 'employeeName',
        message: 'Select Employee from List.',
        choices: employees,
        when: (answers) => answers.options === "Update Employee Role" || answers.options === "Update Employee Manager",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Enter New Employee Role.',
        choices: roles,
        when: (answers) => answers.options === "Add an Employee" || answers.options === "Update Employee Role",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Enter New Employee Manager.',
        choices: employees,
        when: (answers) => answers.options === "Add an Employee" || answers.options === "Update Employee Manager",
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    }
]


inquirer
    .prompt(options)
    .then(answers => console.log(answers))
    .catch((err) => console.error('Error: ', err))