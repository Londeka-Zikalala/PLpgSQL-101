// Import the CreateSubject class
import CreateSubject from '../CreateSubject';
import db from '../db';
import assert from 'assert';


// Create a new instance of CreateSubject with the database connection
const createSubject = new CreateSubject(db);

// Describe the tests for the CreateSubject class
describe("CreateSubject function", function () {
    beforeEach(async function () {
        // Clear existing test data
        await db.none(`TRUNCATE TABLE subject RESTART IDENTITY CASCADE`);
      });
    // Test case to create and fetch a learner
    it("should create and fetch a subject", async () => {
        // Create a new learner
        let addSubject = await createSubject.createSubject({
            the_name: "Mathematics"
        });
        // Assert that the learner was created successfully
        assert.equal(true, addSubject);

        // Fetch all learners
        let subject = await createSubject.fetchSubject();
        // Assert that the fetched learner matches the created learner
        assert.deepEqual(
            {
id: 1,
  name: 'Mathematics'
              }
                 ,
            subject[0]
        );
    });
//       after(async function () {
//     // Disconnect from the database after the tests
//     await db.$pool.end();
//   });
});