import { ISubject } from "./IFindSubject";
import { IFindSubject } from "./IFindSubject";
import { IDatabase } from "pg-promise";

class FindSubject implements IFindSubject{
    constructor(private db: IDatabase<any>) { }
    result!: Promise<ISubject[]>;

    async findSubject() {
        const query = `SELECT * FROM find_subjects()`;
        let result = await this.db.manyOrNone(query);
        return result
    }
}

export default FindSubject;