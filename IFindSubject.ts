export interface ISubject {
    name: string;
    id: number;
    
  }
  
  export interface IFindSubject {
    result: Promise<ISubject[]>
  }