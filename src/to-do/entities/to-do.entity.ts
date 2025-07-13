import { TodoStatus } from "../enums/TodoStatus";

export class ToDo {
    constructor(
    public id: number,
    public description: string,
    public title: string,
    public status: TodoStatus,
    public dueDate: Date | null,
    public createdAt: Date | null,
    public priority: number,
    public updatedAt: Date | null,
    public deleteAt: Date | null,  
    ){}
}
