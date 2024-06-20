import db from "../db";
import assert from "assert";
import FindSubject from "../FindSubject";

const findSubject = new FindSubject(db);

// Describe the tests for the FindSubject class
describe("FindSubject Function", function () {

    // Test case to find a subject
    it("should return all the subjects", async () => {
        // Create a new learner
        let findSub = await findSubject.findSubject();
        console.log(findSub)
        // get the subject
        assert.deepEqual(findSub, [{ id: 1, name: 'Mathematics' }]
        );

    });
});