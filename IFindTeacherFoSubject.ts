
export interface ITeacherForSubject {
    subject_name: string;
    
}
  
export interface IFindTeachersForSubjectFunction {
    result: {
        teacher_id: number;
        first_name: string;
        last_name: string;
        email: string;
    }
  }