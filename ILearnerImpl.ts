// Import the ILearner and ILearnersImpl interfaces
import { IDatabase } from 'pg-promise';
import { ILearner } from './ILearner';
import { ILearnersImpl } from './ILearner';

// Create a class called LearnersImpl that implements the ILearnersImpl interface
class LearnersImpl implements ILearnersImpl {
    // Private variable to store the database connection
    constructor(private db: IDatabase<any>) { }

    // Method to create a learner in the database
    async createLearner(data: ILearner): Promise<boolean> {
        try {
            // SQL query to call the create_learner function
            const query = `SELECT * FROM create_learner($1, $2, $3, $4)`;
            // Execute the query with the provided data
            const result = await this.db.oneOrNone(query, [data.the_first_name, data.the_last_name, data.the_email, data.the_grade_id]);
            // Return the result
            let created = result.create_learner;
            return created;
        } catch (error: any) {
            console.error(error.message)
            return error
        }

    };

    // Method to fetch all learners from the database
    async fetchLearners(): Promise<ILearner[]> {
        // SQL query to select all learners
        const results = await this.db.manyOrNone(`SELECT * FROM learner`);
        // Return the results
        return results;
    };
}

// Export the LearnersImpl class as the default export
export default LearnersImpl;