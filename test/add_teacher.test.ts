// Import the addTeacherResult class
import AddTeacherResult from '../Teacher';
import db from '../db';
import assert from 'assert';


// Create a new instance of addTeacherResult with the database connection
const addTeacherResult = new AddTeacherResult(db);

// Describe the tests for the addTeacherResult class
describe("addTeacherResult", function () {
    beforeEach(async function () {
        // Clear existing test data
      await db.none(`TRUNCATE TABLE teacher RESTART IDENTITY CASCADE`);

      
      });
    // Test case to create and fetch a learner
    it("should create and fetch a teacher", async () => {
        // Create a new learner
        let AddTeacher = await addTeacherResult.addTeacher({
            first_name: "John",
            last_name: "Doe",
            email: "doe@gmail.com",
        });
        // Assert that the learner was created successfully
        assert.equal(true, AddTeacher);

        // Fetch all learners
        let teacher = await addTeacherResult.fetchTeachers();
        // Assert that the fetched learner matches the created learner
        assert.deepEqual(
            {
                email: 'doe@gmail.com',
                first_name: 'John',
                id: 1,
                last_name: 'Doe'
              }
                 ,
            teacher[0]
        );
    });

    // Test case to create and fetch multiple learners
    it("should create and fetch more learners", async () => {
        // Create a new learner
        await addTeacherResult.addTeacher({
           first_name: "Johnathan",
           last_name: "Doeth",
           email: "doeth@gmail.com",
        });
        // Fetch all learners
        let learners = await addTeacherResult.fetchTeachers();
        // Assert that there is one learner
        assert.equal(1, learners.length);

        // Create another learner
        await addTeacherResult.addTeacher({
           first_name: "Tom",
           last_name: "Tommy",
           email: "tommy@gmail.com",
        });
        // Fetch all learners again
        let teachers = await addTeacherResult.fetchTeachers();
        // Assert that there are two learners
        assert.equal(2, teachers.length);
    });
  //     after(async function () {
  //   // Disconnect from the database after the tests
  //   await db.$pool.end();
  // });
});