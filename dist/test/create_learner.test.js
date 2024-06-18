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
// Import the LearnersImpl class
const ILearnerImpl_1 = __importDefault(require("../ILearnerImpl"));
const db_1 = __importDefault(require("../db"));
const assert_1 = __importDefault(require("assert"));
// Create a new instance of LearnersImpl with the database connection
const learnersImpl = new ILearnerImpl_1.default(db_1.default);
// Describe the tests for the LearnersImpl class
describe("LearnersImpl", function () {
    beforeEach(function () {
        return __awaiter(this, void 0, void 0, function* () {
            // Clear existing test data
            yield db_1.default.none(`TRUNCATE TABLE learner RESTART IDENTITY CASCADE`);
        });
    });
    // Test case to create and fetch a learner
    it("should create and fetch a learner", () => __awaiter(this, void 0, void 0, function* () {
        // Create a new learner
        let addLearner = yield learnersImpl.createLearner({
            the_first_name: "John",
            the_last_name: "Doe",
            the_email: "doe@gmail.com",
            the_grade_id: 1
        });
        // Assert that the learner was created successfully
        assert_1.default.equal(true, addLearner);
        // Fetch all learners
        let learner = yield learnersImpl.fetchLearners();
        // Assert that the fetched learner matches the created learner
        assert_1.default.deepEqual({
            email: 'doe@gmail.com',
            first_name: 'John',
            grade_id: 1,
            id: 1,
            last_name: 'Doe'
        }, learner[0]);
    }));
    // Test case to create and fetch multiple learners
    it("should create and fetch more learners", () => __awaiter(this, void 0, void 0, function* () {
        // Create a new learner
        yield learnersImpl.createLearner({
            the_first_name: "Johnathan",
            the_last_name: "Doeth",
            the_email: "doeth@gmail.com",
            the_grade_id: 3
        });
        // Fetch all learners
        let learners = yield learnersImpl.fetchLearners();
        // Assert that there is one learner
        assert_1.default.equal(1, learners.length);
        // Create another learner
        yield learnersImpl.createLearner({
            the_first_name: "Tom",
            the_last_name: "Tommy",
            the_email: "tommy@gmail.com",
            the_grade_id: 2
        });
        // Fetch all learners again
        learners = yield learnersImpl.fetchLearners();
        // Assert that there are two learners
        assert_1.default.equal(2, learners.length);
    }));
    //       after(async function () {
    //     // Disconnect from the database after the tests
    //     await db.$pool.end();
    //   });
});
