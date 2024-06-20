// Import the LinkTeacherToSubject class
import LinkTeacherToSubject from '../LinkTeacherToSubject';
import db from '../db';
import assert from 'assert';
import AddTeacherResult from '../Teacher';
import CreateSubject from '../CreateSubject';
// import FindSubject from '../FindSubject';
import FindTeacherForSubject from '../FindTeacherForSubject';


// Create a new instance of FindTeacherForSubject with the database connection
const findTeacherForSub = new FindTeacherForSubject(db);
const createSubject = new CreateSubject(db);
// const findSub = new FindSubject(db);
const addTeacher = new AddTeacherResult(db);

// Create a new instance of LinkTeacherToSubject with the database connection
const linkTeacherToSubject = new LinkTeacherToSubject(db);

// Describe the tests for the LinkTeacherToSubject class
describe("LinkTeacherToSubject", function () {
  beforeEach(async function () {
    // Clear existing test data
    await db.none(`TRUNCATE TABLE subject_teacher RESTART IDENTITY CASCADE`);
  });
  // Test case to create and fetch a learner
  it("should link a teacher to a subject", async () => {
    // Create or fetch subject
    createSubject.createSubject({
      the_name: 'Economics'
    })

    // Add or fetch teacher
    await addTeacher.fetchTeachers();

    //Link teacher to subject
    let linkTeacher = await linkTeacherToSubject.LinkToSubject(
      {
        subject_id: 2,
        teacher_id: 1
      });

    // Assert that the learner was created successfully
    assert.equal(true, linkTeacher);

  });

  after(async function () {
    // Disconnect from the database after the tests
    await db.$pool.end();
  });
});