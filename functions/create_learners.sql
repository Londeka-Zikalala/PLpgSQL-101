-- Create a PLpgSQL function like this:
create or replace function create_learner(the_name varchar, the_email varchar)
    -- function returns a boolean
    returns boolean as
$$
declare
    -- Declare a variable
    email_count int;
begin
    -- Store the count of emails into the {email_count} variable
    select count(*) into email_count from learner where email = the_email;

    if email_count > 0 then
        return false;
    end if;

    insert into learner (name, email) values (the_name, the_email);
    return true;
end;
$$
language plpgsql;