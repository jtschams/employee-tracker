
const queryBuilder = (answers) => {
    switch (answers.options) {
        case 'View All Departments' :
            return 'SELECT id, department_name FROM departments;';
        case 'View All Roles' :
            return 'SELECT title, roles.id, department_name, salary FROM roles JOIN departments on roles.department_id = departments.id;';
        case 'View All Employees' :
            return "SELECT e.id as employee_id, e.first_name, e.last_name, title, department_name, salary, m.first_name || ' ' || m.last_name AS manager from employees e JOIN roles ON e.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON e.manager_id = m.id;";
        case 'View Employees by Department' :
            return `SELECT e.id as employee_id, e.first_name, e.last_name, title, department_name, salary, m.first_name || ' ' || m.last_name AS manager from employees e 
            JOIN roles ON e.role_id = roles.id
            JOIN departments ON roles.department_id = departments.id
            JOIN employees m ON e.manager_id = m.id
            WHERE department_id = '${answers.department}';`;
        case 'View Employees by Manager' :
            return `SELECT e.id as employee_id, e.first_name, e.last_name, title, department_name, salary, m.first_name || ' ' || m.last_name AS manager from employees e JOIN roles ON e.role_id = roles.id JOIN departments ON roles.department_id = departments.id JOIN employees m ON e.manager_id = m.id WHERE m.id = ${answers.manager};`;
        case 'View Total Utilized Budget by Department' :
            return 'SELECT department_name, COUNT(employees.id) AS employees, SUM(salary) AS total_utilized_budget FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id GROUP BY department_name ORDER BY total_utilized_budget DESC;';
        case 'Add a Department' :
            return `INSERT INTO departments (department_name) VALUES
            ('${answers.departmentName}');`;
        case 'Add a Role' :
            return `INSERT INTO roles (title, salary, department_id) VALUES
            ('${answers.roleName}', ${answers.roleSalary}, ${answers.roleDepartment});`;
        case 'Add an Employee' :
            return `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
            ('${answers.employeeFirstName}', '${answers.employeeLastName}', ${answers.employeeRole}, ${answers.employeeManager});`;
        case 'Update Employee Role' :
            return `UPDATE employees SET role_id = ${answers.employeeRole} WHERE id = ${answers.employeeID};`;
        case 'Update Employee Manager' :
            return `UPDATE employees SET role_id = ${answers.employeeManager} WHERE id = ${answers.employeeID};`;
        case 'Delete a Department' :
            return `DELETE FROM departments WHERE id = ${answers.department};`;
        case 'Delete a Role' :
            return `DELETE FROM roles WHERE id = ${answers.role};`;
        case 'Delete an Employee' :
            return `DELETE FROM employees WHERE id = ${answers.employee};`;
    }
};

module.exports = queryBuilder;