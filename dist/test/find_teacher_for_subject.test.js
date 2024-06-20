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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the FindTeacherForSubject class
const FindTeacherForSubject_1 = __importDefault(require("../FindTeacherForSubject"));
const Teacher_1 = __importDefault(require("../Teacher"));
const CreateSubject_1 = __importDefault(require("../CreateSubject"));
// import FindSubject from '../FindSubject';
const LinkTeacherToSubject_1 = __importDefault(require("../LinkTeacherToSubject"));
const db_1 = __importDefault(require("../db"));
const assert_1 = __importDefault(require("assert"));
// Create a new instance of FindTeacherForSubject with the database connection
const findTeacherForSubject = new FindTeacherForSubject_1.default(db_1.default);
const createSubject = new CreateSubject_1.default(db_1.default);
// const findSub = new FindSubject(db);
const addTeacher = new Teacher_1.default(db_1.default);
const linkTeacherToSubject = new LinkTeacherToSubject_1.default(db_1.default);
// Describe the tests for the FindTeacherForSubject class
describe("FindTeacherForSubject", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear existing test data
            yield db_1.default.none(`TRUNCATE TABLE subject_teacher RESTART IDENTITY CASCADE`);
        });
    });
    // Test case to create and fetch a learner
    it("should find a teacher for a subject", () => __awaiter(this, void 0, void 0, function* () {
        // Create or fetch subject
        createSubject.createSubject({
            the_name: 'Economics'
        });
        // Add or fetch teacher
        yield addTeacher.fetchTeachers();
        //Link teacher to subject
        yield linkTeacherToSubject.LinkToSubject({
            subject_id: 2,
            teacher_id: 1
        });
        // find teacher for subject
        let findTeacher = yield findTeacherForSubject.findTeacher({ subject_name: "Economics" });
        // Assert that the learner was created successfully
        assert_1.default.deepEqual([
            {
                email: 'doeth@gmail.com',
                first_name: 'Johnathan',
                last_name: 'Doeth',
                teacher_id: 1
            }
        ], findTeacher);
    }));
});
