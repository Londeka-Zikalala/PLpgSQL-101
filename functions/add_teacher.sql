CREATE OR REPLACE FUNCTION add_teacher(
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255)
) 
RETURNS BOOLEAN AS
$$
BEGIN
    -- Check if the email is unique
    IF NOT EXISTS (SELECT 1 FROM teacher WHERE teacher.email = add_teacher.email) THEN
        -- If the email is unique, insert the new teacher
        INSERT INTO teacher (first_name, last_name, email) VALUES (add_teacher.first_name, add_teacher.last_name, add_teacher.email);
        RETURN TRUE; -- Return true if the teacher is added successfully
    ELSE
        RETURN FALSE; -- Return false if the email already exists
    END IF;
END;
$$
LANGUAGE plpgsql;