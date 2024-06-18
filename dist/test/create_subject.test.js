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
// Import the CreateSubject class
const CreateSubject_1 = __importDefault(require("../CreateSubject"));
const db_1 = __importDefault(require("../db"));
const assert_1 = __importDefault(require("assert"));
// Create a new instance of CreateSubject with the database connection
const createSubject = new CreateSubject_1.default(db_1.default);
// Describe the tests for the CreateSubject class
describe("CreateSubject function", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear existing test data
            yield db_1.default.none(`TRUNCATE TABLE subject RESTART IDENTITY CASCADE`);
        });
    });
    // Test case to create and fetch a learner
    it("should create and fetch a subject", () => __awaiter(this, void 0, void 0, function* () {
        // Create a new learner
        let addSubject = yield createSubject.createSubject({
            the_name: "Mathematics"
        });
        // Assert that the learner was created successfully
        assert_1.default.equal(true, addSubject);
        // Fetch all learners
        let subject = yield createSubject.fetchSubject();
        // Assert that the fetched learner matches the created learner
        assert_1.default.deepEqual({
            id: 1,
            name: 'Mathematics'
        }, subject[0]);
    }));
    //       after(async function () {
    //     // Disconnect from the database after the tests
    //     await db.$pool.end();
    //   });
});
