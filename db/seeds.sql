INSERT INTO department (name) VALUES
    ('HR'),
    ('Marketing'),
    ('Janitorial');

INSERT INTO role (id, title, salary, department_id) VALUES
    (1, 'HR Manager', 80000, 1),
    (2, 'Marketer', 70000, 2),
    (3, 'Janitor', 50000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
    (1, 'John', 'Doe', 1, NULL),
    (2, 'Jane', 'Smith', 2, 1),
    (3, 'Michael', 'Jackson', 3, 1),
    (4, 'Sherlock', 'Holmes', 2, 2);

