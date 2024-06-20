// Import the LearnersImpl class
import LearnersImpl from '../ILearnerImpl';
import db from '../db';
import assert from 'assert';


// Create a new instance of LearnersImpl with the database connection
const learnersImpl = new LearnersImpl(db);

// Describe the tests for the LearnersImpl class
describe("LearnersImpl", function () {
    beforeEach(async function () {
        // Clear existing test data
        await db.none(`TRUNCATE TABLE learner RESTART IDENTITY CASCADE`);
    });
    // Test case to create and fetch a learner
    it("should create and fetch a learner", async () => {
        // Create a new learner
        let addLearner = await learnersImpl.createLearner({
            the_first_name: "John",
            the_last_name: "Doe",
            the_email: "doe@gmail.com",
            the_grade_id: 1
        });
        // Assert that the learner was created successfully
        assert.equal(true, addLearner);

        // Fetch all learners
        let learner = await learnersImpl.fetchLearners();
        // Assert that the fetched learner matches the created learner
        assert.deepEqual(
            {
                email: 'doe@gmail.com',
                first_name: 'John',
                grade_id: 1,
                id: 1,
                last_name: 'Doe'
            }
            ,
            learner[0]
        );
    });

    // Test case to create and fetch multiple learners
    it("should create and fetch more learners", async () => {
        // Create a new learner
        await learnersImpl.createLearner({
            the_first_name: "Johnathan",
            the_last_name: "Doeth",
            the_email: "doeth@gmail.com",
            the_grade_id: 3
        });
        // Fetch all learners
        let learners = await learnersImpl.fetchLearners();
        // Assert that there is one learner
        assert.equal(1, learners.length);

        // Create another learner
        await learnersImpl.createLearner({
            the_first_name: "Tom",
            the_last_name: "Tommy",
            the_email: "tommy@gmail.com",
            the_grade_id: 2
        });
        // Fetch all learners again
        learners = await learnersImpl.fetchLearners();
        // Assert that there are two learners
        assert.equal(2, learners.length);
    });
});