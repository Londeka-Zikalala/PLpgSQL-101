-- Create the 'grade' table
CREATE TABLE grade (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the 'school' table
CREATE TABLE school (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL
);

-- Create the 'teacher' table
CREATE TABLE teacher (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);

-- Create the 'subject' table
CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create the 'subject_teacher' table
CREATE TABLE subject_teacher (
    subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    PRIMARY KEY (subject_id, teacher_id)
);

-- Create the 'learner' table
CREATE TABLE learner (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    grade_id INT NOT NULL,
    FOREIGN KEY (grade_id) REFERENCES grade(id)
);

-- Create the 'learner_subject' table
CREATE TABLE learner_subject (
    subject_id INT NOT NULL,
    learner_id INT NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subject(id),
    FOREIGN KEY (learner_id) REFERENCES learner(id),
    PRIMARY KEY (subject_id, learner_id)
);

-- Create the 'learner_school' table
CREATE TABLE learner_school (
    learner_id INT NOT NULL,
    school_id INT NOT NULL,
    current_school BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (learner_id) REFERENCES learner(id),
    FOREIGN KEY (school_id) REFERENCES school(id),
    PRIMARY KEY (learner_id, school_id)
);