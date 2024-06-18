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
const db_1 = __importDefault(require("../db"));
const assert_1 = __importDefault(require("assert"));
const FindSubject_1 = __importDefault(require("../FindSubject"));
const findSubject = new FindSubject_1.default(db_1.default);
// Describe the tests for the FindSubject class
describe("FindSubject Function", function () {
    // Test case to find a subject
    it("should return all the subjects", () => __awaiter(this, void 0, void 0, function* () {
        // Create a new learner
        let findSub = yield findSubject.findSubject();
        console.log(findSub);
        // get the subject
        assert_1.default.deepEqual(findSub, [{ id: 1, name: 'Mathematics' }]);
    }));
    //       after(async function () {
    //     // Disconnect from the database after the tests
    //     await db.$pool.end();
    //   });
});
