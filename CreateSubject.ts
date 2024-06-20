import { IDatabase } from "pg-promise";
import { ICreateSubject } from "./ICreateSubject";
import { ICreateSubjectImp } from "./ICreateSubject";

class CreateSubject implements ICreateSubjectImp {
    constructor(private db: IDatabase<any>) { }
    result: boolean = false;
    async createSubject(data: ICreateSubject): Promise<boolean> {
        const query = `SELECT * FROM create_subject($1)`;
        let result = await this.db.oneOrNone(query, [data.the_name])
        let subjectCreated = result.create_subject;
        return subjectCreated
    }

    //method to fetch the subjects
    async fetchSubject() {
        let result = await this.db.manyOrNone(`SELECT * FROM subject`)
        return result

    }
}

export default CreateSubject