create or replace function find_subjects ()
    returns table (
        id int,
        name varchar
    ) as
$$
begin

return query
    select 
        "subject".id, 
        "subject".name
    from subject;

end;
$$
Language plpgsql;