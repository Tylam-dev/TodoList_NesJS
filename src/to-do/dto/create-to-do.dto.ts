import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { ToDo } from "../entities/to-do.entity";
import { TodoStatus } from "../enums/TodoStatus";

export class CreateToDoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TodoStatus)
    @IsNotEmpty()
    status: TodoStatus;
    
    @IsDateString()
    dueDate: Date;

    @IsInt()
    @IsNotEmpty()
    priority: number;
    mapToDo(): ToDo{
        return new ToDo(
            0,
            this.description,
            this.title,
            this.status,
            this.dueDate,
            null,
            this.priority,
            null,
            null
        );
    }
}
