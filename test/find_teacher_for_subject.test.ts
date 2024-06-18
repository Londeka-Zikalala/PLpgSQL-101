// Import the FindTeacherForSubject class
import FindTeacherForSubject from '../FindTeacherForSubject';
import AddTeacherResult from '../Teacher';
import CreateSubject from '../CreateSubject';
// import FindSubject from '../FindSubject';
import LinkTeacherToSubject from '../LinkTeacherToSubject';
import db from '../db';
import assert from 'assert';


// Create a new instance of FindTeacherForSubject with the database connection
const findTeacherForSubject = new FindTeacherForSubject(db);
const createSubject = new CreateSubject(db);
// const findSub = new FindSubject(db);
const addTeacher = new AddTeacherResult(db);
const linkTeacherToSubject = new LinkTeacherToSubject(db);

// Describe the tests for the FindTeacherForSubject class
describe("FindTeacherForSubject", function () {
    beforeEach(async function () {
        // Clear existing test data
      await db.none(`TRUNCATE TABLE subject_teacher RESTART IDENTITY CASCADE`);

      
      });
    // Test case to create and fetch a learner
    it("should find a teacher for a subject", async () => {
        // Create or fetch subject
        createSubject.createSubject({
            the_name:'Economics'
       })
        
        // Add or fetch teacher
        await addTeacher.fetchTeachers();

        //Link teacher to subject
        await linkTeacherToSubject.LinkToSubject(
            {
                subject_id: 2,
                teacher_id: 1
            });
   
        // find teacher for subject
        let findTeacher = await findTeacherForSubject.findTeacher(
            { subject_name: "Economics" });
        // Assert that the learner was created successfully
        assert.deepEqual(
            [
                {
                  email: 'doeth@gmail.com',
                  first_name: 'Johnathan',
                  last_name: 'Doeth',
                  teacher_id: 1
                }
              ]
              
        , findTeacher);

    });


});
