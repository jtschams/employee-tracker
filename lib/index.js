const inquirer = require('inquirer');
// TODO: const queries = require('queries');

// Create Empty Arrays for List Choices as Needed
const managers = [];
const departments = [];
const roles = [];
let employees = [];

// Populate Choices Arrays and Return True if Question is Needed
const employeesByDepartment = (answer) => {
    if (answer.options === 'View Employees by Department') {
        // TODO: Change deptList to queries.departmentList
        const deptList = ['Front', 'Back', 'Manage'];
        departments.push(...deptList);
        return true;
    } else {
        return false;
    }
}

const employeesByManager = (answer) => {
    if (answer.options === 'View Employees by Manager') {
        // TODO: Change mgrList to queries.managerList
        const mgrList = ['Alfred', 'Bartholemew', 'Charlotte'];
        deparmanagerstments.push(...mgrList);
        return true;
    } else {
        return false;
    }
}

const employeeUpdateCheck = (answer) => {
    if (answer.options === "Update Employee Role" || answer.options === "Update Employee Manager") {
        // TODO: Change employeeList to queries.employeeList
        const employeeList = ['Alfred', 'Bartholemew', 'Charlotte', 'Daniel', 'Edward'];
        employees.push(...employeeList);
        return true;
    } else {
        return false;
    }
}

const employeeRoleCheck = (answer) => {
    if (answer.options === "Add an Employee" || answer.options === "Update Employee Role") {
        // TODO: Change roleList to queries.roleList
        const roleList = ['Receptionist', 'Nurse', 'Doctor', 'Manager'];
        roles.push(...roleList);
        return true;
    } else {
        return false;
    }
}

const employeeManagerCheck = (answer) => {
    if (answer.options === "Add an Employee" || answer.options === "Update Employee Manager") {
        employees = []
        // TODO: Change employeeList to queries.employeeList
        const employeeList = ['Alfred', 'Bartholemew', 'Charlotte', 'Daniel', 'Edward'];
        employees.push(...employeeList);
        return true;
    } else {
        return false;
    }
}

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
        when: employeesByDepartment
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select Manager:',
        choices: managers,
        default: 0,
        when: employeesByManager,
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
        when: employeeUpdateCheck,
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employeeRole',
        message: 'Enter New Employee Role.',
        choices: roles,
        when: employeeRoleCheck,
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: 'Enter New Employee Manager.',
        choices: employees,
        when: employeeManagerCheck,
        validate: (answer) => answer ? true : 'Input Required.',
        loop: false
    }
]


inquirer
    .prompt(options)
    .then(answers => console.log(answers))