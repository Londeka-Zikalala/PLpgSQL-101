-- Return User-Defined Type in the {find_learners} fuction
DO $$
BEGIN
    CREATE TYPE learners_type AS (
        id integer,
        name text,
        email text
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create find_learners function below: