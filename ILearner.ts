export  interface ILearner {
    id?: number;
    the_first_name: string;
    the_last_name: string;
    the_email: string;
    the_grade_id: number
}

export  interface ILearnersImpl {
    createLearner(data: ILearner): Promise<boolean>;
    fetchLearners(): Promise<ILearner[]>;
}

