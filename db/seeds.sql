INSERT INTO departments (department_name) VALUES
('Front Office'),
('Back Office'),
('Management');

INSERT INTO roles (title, salary, department_id) VALUES
('Receptionist', 31000, 1),
('Referrals', 35000, 1),
('Medical Assistant', 50000, 2),
('Nurse', 70000, 2),
('Doctor', 160000, 2),
('Department Manager', 80000, 3),
('Office Manager', 120000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
('Alfred', 'Anderson', 7, null),
('Brittany', 'Binford', 6, 1),
('Charlie', 'Chaplin', 6, 1),
('Doug', 'Darwin', 5, 1),
('Elizabeth', 'Enderson', 5, 1),
('Francine', 'Franklin', 4, 2),
('Gerald', 'Garza', 4, 2),
('Harry', 'Harrison', 3, 2),
('Ingrid', 'Ivy', 2, 3),
('Janis', 'Joplin', 1, 3),
('Kyle', 'Kristofson', 1,3);