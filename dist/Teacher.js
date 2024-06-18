"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//Class that implements the ITeacher interfaces
class AddTeacherResult {
    // Private variable to store the database connection
    constructor(db) {
        this.db = db;
        this.result = false;
    }
    //method to add a teacher
    addTeacher(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM add_teacher($1,$2,$3)`;
            const result = yield this.db.oneOrNone(query, [data.first_name, data.last_name, data.email]);
            let added = result.add_teacher;
            return added;
        });
    }
    // method to fetch teachers
    fetchTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.db.manyOrNone(`SELECT * FROM teacher`);
            return results;
        });
    }
}
exports.default = AddTeacherResult;
