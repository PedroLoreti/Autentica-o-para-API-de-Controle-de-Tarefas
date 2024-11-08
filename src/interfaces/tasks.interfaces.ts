export interface ITask {
    id: number;
    title: string;
    content: string;
    finished: boolean;
    categoryId?: number | null;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface ITaskWithCategory {
    id: number;
    title: string;
    content: string;
    finished: boolean;
    category: ICategory | null; 
}
export type ITaskWithoutId = Omit<ITask, "id">

export interface ITaskUpdate {
    title?: string;       
    content?: string;
    finished?: boolean;
    categoryId?: number;
}


export interface IUser {
    name: string;
    email: string;
    password: string;
}


export type IUserLogin = Pick<IUser, "email" | "password">