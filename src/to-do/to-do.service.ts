import { Inject, Injectable } from '@nestjs/common';
import { UpdateToDoDto } from './dto/update-to-do.dto';
import { ProviderEnums } from 'src/enums/ProvidersEnum';
import { Prisma, PrismaClient } from 'generated/prisma/client';
import { ToDo } from './entities/to-do.entity';

@Injectable()
export class ToDoService 
{
  constructor(
    @Inject(ProviderEnums.ASYNC_PRISMA_CONNECTION) 
    private prisma: PrismaClient
  ){}
  create(createTodo: ToDo) {
    let newTodo: Prisma.TodoCreateInput ={
      title: createTodo.title,
      description: createTodo.description,
      dueDate: createTodo.dueDate,
      status: createTodo.status,
      priority: createTodo.priority
    } 
    return this.prisma.todo.create(
      {
        data: newTodo
      }
    );
  }

  findAll() {
    return `This action returns all toDo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} toDo`;
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    return `This action updates a #${id} toDo`;
  }

  remove(id: number) {
    return `This action removes a #${id} toDo`;
  }
}
