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
// Import the addTeacherResult class
const Teacher_1 = __importDefault(require("../Teacher"));
const db_1 = __importDefault(require("../db"));
const assert_1 = __importDefault(require("assert"));
// Create a new instance of addTeacherResult with the database connection
const addTeacherResult = new Teacher_1.default(db_1.default);
// Describe the tests for the addTeacherResult class
describe("addTeacherResult", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear existing test data
            yield db_1.default.none(`TRUNCATE TABLE teacher RESTART IDENTITY CASCADE`);
        });
    });
    // Test case to create and fetch a learner
    it("should create and fetch a teacher", () => __awaiter(this, void 0, void 0, function* () {
        // Create a new learner
        let AddTeacher = yield addTeacherResult.addTeacher({
            first_name: "John",
            last_name: "Doe",
            email: "doe@gmail.com",
        });
        // Assert that the learner was created successfully
        assert_1.default.equal(true, AddTeacher);
        // Fetch all learners
        let teacher = yield addTeacherResult.fetchTeachers();
        // Assert that the fetched learner matches the created learner
        assert_1.default.deepEqual({
            email: 'doe@gmail.com',
            first_name: 'John',
            id: 1,
            last_name: 'Doe'
        }, teacher[0]);
    }));
    // Test case to create and fetch multiple learners
    it("should create and fetch more learners", () => __awaiter(this, void 0, void 0, function* () {
        // Create a new learner
        yield addTeacherResult.addTeacher({
            first_name: "Johnathan",
            last_name: "Doeth",
            email: "doeth@gmail.com",
        });
        // Fetch all learners
        let learners = yield addTeacherResult.fetchTeachers();
        // Assert that there is one learner
        assert_1.default.equal(1, learners.length);
        // Create another learner
        yield addTeacherResult.addTeacher({
            first_name: "Tom",
            last_name: "Tommy",
            email: "tommy@gmail.com",
        });
        // Fetch all learners again
        let teachers = yield addTeacherResult.fetchTeachers();
        // Assert that there are two learners
        assert_1.default.equal(2, teachers.length);
    }));
    //     after(async function () {
    //   // Disconnect from the database after the tests
    //   await db.$pool.end();
    // });
});
