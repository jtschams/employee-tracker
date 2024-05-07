-- View All Departments
SELECT id, department_name FROM departments;

--View All Roles
SELECT title, roles.id, department_name, salary FROM roles
JOIN departments on roles.department_id = departments.id;

-- View All Employees
SELECT e.id as employee_id, e.first_name, e.last_name, title, department_name, salary, m.first_name || ' ' || m.last_name AS manager from employees e 
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees m ON e.manager_id = m.id;

-- Extra Options

-- List Managers -- Utility for list by manager
SELECT m.id as employee_id, m.first_name, m.last_name FROM employees m
JOIN employees e ON e.manager_id = m.id
GROUP BY m.id;
-- View Employees by Manager
SELECT e.id as employee_id, e.first_name, e.last_name, title, department_name, salary, m.first_name || ' ' || m.last_name AS manager from employees e 
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
JOIN employees m ON e.manager_id = m.id
WHERE m.id = 1;

-- View Employees by Department
SELECT e.id as employee_id, e.first_name, e.last_name, title, department_name, salary, m.first_name || ' ' || m.last_name AS manager from employees e 
JOIN roles ON e.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
JOIN employees m ON e.manager_id = m.id
WHERE department_name = 'Front Office';

-- View the Total Utilized Budget by Department
SELECT department_name, COUNT(employees.id) AS employees, SUM(salary) AS total_utilized_budget FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
GROUP BY department_name
ORDER BY total_utilized_budget DESC;