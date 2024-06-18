CREATE OR REPLACE FUNCTION find_teachers_for_subject(
    subject_name VARCHAR(255)
)
RETURNS TABLE (
    teacher_id INT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255)
) AS
$$
BEGIN
    -- Return teachers for the specified subject
    RETURN QUERY
    SELECT 
        teacher.id AS teacher_id,
        teacher.first_name,
        teacher.last_name,
        teacher.email
    FROM 
        teacher
    JOIN 
        subject_teacher ON teacher.id = subject_teacher.teacher_id
    JOIN 
        subject ON subject_teacher.subject_id = subject.id
    WHERE 
        subject.name = find_teachers_for_subject.subject_name; -- Filtering by subject name
END;
$$
LANGUAGE plpgsql;