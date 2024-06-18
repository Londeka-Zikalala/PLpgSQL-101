import { IDatabase } from 'pg-promise';
import { ITeacher }  from './ITeacher';
import { IAddTeacherResult } from './ITeacher';

//Class that implements the ITeacher interfaces

class AddTeacherResult implements IAddTeacherResult{
        // Private variable to store the database connection
    constructor(private db: IDatabase<any>) { } 
    result: boolean = false;
    //method to add a teacher
    async addTeacher(data: ITeacher): Promise<boolean> {
        const query = `SELECT * FROM add_teacher($1,$2,$3)`
        const result = await this.db.oneOrNone(query, [data.first_name, data.last_name, data.email]);
        let added = result.add_teacher
        return added
    }
// method to fetch teachers
async fetchTeachers(): Promise<ITeacher[]> {
    const results = await this.db.manyOrNone(`SELECT * FROM teacher`);
    return results;
}

}
export default AddTeacherResult