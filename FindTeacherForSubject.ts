import { IDatabase } from 'pg-promise';
import { ITeacherForSubject }  from './IFindTeacherFoSubject';
import { IFindTeachersForSubjectFunction } from './IFindTeacherFoSubject';

class FindTeacherForSubject implements IFindTeachersForSubjectFunction{
    constructor(private db: IDatabase<any>) { } 
    result!: { teacher_id: number; first_name: string; last_name: string; email: string; };

    async findTeacher(data:ITeacherForSubject) {
        const query = `SELECT * FROM find_teachers_for_subject($1)`;
        const result = await this.db.manyOrNone(query, [data.subject_name])
        return result
}

}

export default FindTeacherForSubject