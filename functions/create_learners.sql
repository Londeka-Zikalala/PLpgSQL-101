create or replace function create_learner(
    the_first_name varchar,
    the_last_name varchar,
    the_email varchar,
    the_grade_id int
) returns boolean as
$$
declare
    email_count int;
begin
    select count(*) into email_count from learner where email = the_email;

    if email_count > 0 then
        return false;
    end if;

    insert into learner (first_name, last_name, email, grade_id)
        values (the_first_name, the_last_name, the_email, the_grade_id);
    return true;
end;
$$
language plpgsql;