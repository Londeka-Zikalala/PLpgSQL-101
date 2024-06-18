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
// Create a class called LearnersImpl that implements the ILearnersImpl interface
class LearnersImpl {
    // Private variable to store the database connection
    constructor(db) {
        this.db = db;
    }
    // Method to create a learner in the database
    createLearner(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // SQL query to call the create_learner function
                const query = `SELECT * FROM create_learner($1, $2, $3, $4)`;
                // Execute the query with the provided data
                const result = yield this.db.oneOrNone(query, [data.the_first_name, data.the_last_name, data.the_email, data.the_grade_id]);
                // Return the result
                let created = result.create_learner;
                return created;
            }
            catch (error) {
                console.error(error.message);
                return error;
            }
        });
    }
    ;
    // Method to fetch all learners from the database
    fetchLearners() {
        return __awaiter(this, void 0, void 0, function* () {
            // SQL query to select all learners
            const results = yield this.db.manyOrNone(`SELECT * FROM learner`);
            // Return the results
            return results;
        });
    }
    ;
}
// Export the LearnersImpl class as the default export
exports.default = LearnersImpl;
