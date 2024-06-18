import { IDatabase } from "pg-promise";
import { ILinkToSubject } from "./ILinkTeacherToSubject";
import { ILinkTeacherToSubject } from "./ILinkTeacherToSubject";

class LinkTeacherToSubject implements ILinkTeacherToSubject{
    constructor(private db: IDatabase<any>) { } 
    result: boolean = false;
    async LinkToSubject(data: ILinkToSubject): Promise<boolean>{
        const query = `SELECT * FROM link_teacher_to_subject($1,$2)`;
        let result = await this.db.oneOrNone(query, [data.teacher_id, data.subject_id]);
        let link = result.link_teacher_to_subject;
        return link
    }

}

export default LinkTeacherToSubject;