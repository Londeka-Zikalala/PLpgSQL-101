CREATE OR REPLACE FUNCTION link_teacher_to_subject(
    teacher_id INT,
    subject_id INT
)
RETURNS BOOLEAN AS
$$
BEGIN
    -- Check if the teacher is already linked to the subject
    IF NOT EXISTS (
        SELECT 1 
        FROM subject_teacher 
        WHERE subject_teacher.teacher_id = link_teacher_to_subject.teacher_id 
        AND subject_teacher.subject_id = link_teacher_to_subject.subject_id
    ) THEN
        -- If the teacher is not already linked, insert the new link
        INSERT INTO subject_teacher (teacher_id, subject_id) 
        VALUES (link_teacher_to_subject.teacher_id, link_teacher_to_subject.subject_id);
        RETURN TRUE; -- Return true if the link is added successfully
    ELSE
        RETURN FALSE; -- Return false if the teacher is already linked to the subject
    END IF;
END;
$$
LANGUAGE plpgsql;