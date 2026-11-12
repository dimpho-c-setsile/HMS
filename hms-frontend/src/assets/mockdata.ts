export type Role= "reception" | "doctor" | "pharmacy";
export interface MockUser{
    id:number;
    username: string;
    password: string;
    name:string;
    role:Role;
}

export const mockUsers: MockUser[]=[
    {
        id:1,
    username:"reception1" ,
    password: "123456",
    name:"Reception user",
    role:"reception"
    },
    {
        id:2,
    username: "doctor1",
    password: "123456",
    name:"Dr Setsile",
    role:"doctor"
    },
    {
        id:3,
    username: "pharmacy1",
    password: "123456",
    name:"pharmacy user",
    role:"pharmacy"
    }
]