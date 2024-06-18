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
class LinkTeacherToSubject {
    constructor(db) {
        this.db = db;
        this.result = false;
    }
    LinkToSubject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM link_teacher_to_subject($1,$2)`;
            let result = yield this.db.oneOrNone(query, [data.teacher_id, data.subject_id]);
            let link = result.link_teacher_to_subject;
            return link;
        });
    }
}
exports.default = LinkTeacherToSubject;
