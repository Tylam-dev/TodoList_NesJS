import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProviderEnums } from 'src/enums/ProvidersEnum';
import { Prisma, PrismaClient} from 'generated/prisma/client';
import { ToDo } from './entities/to-do.entity';

@Injectable()
export class ToDoService 
{
  constructor(
    @Inject(ProviderEnums.ASYNC_PRISMA_CONNECTION) 
    private prisma: PrismaClient
  ){}
  create(createTodo: ToDo) {
    this.checkHour(createTodo.dueDate)

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
    return this.prisma.todo.findMany({
      where: {
        deleteAt: null
      }
    });
  }

  findOne(id: number) {
    return this.prisma.todo.findFirst({
      where: {
        id: id
      },
      omit:{
        deleteAt: true
      }
    })
  }

  update(id: number, updateToDoDto: ToDo) {

    if (updateToDoDto.dueDate != null)
      this.checkHour(updateToDoDto.dueDate)
    
    return this.prisma.todo.update({
      where:{
        id: id
      },
      data:{
        title: updateToDoDto.title,
        description: updateToDoDto.description,
        dueDate: updateToDoDto.dueDate,
        status: updateToDoDto?.status,
        priority: updateToDoDto.priority
      }
    });
  }

  remove(id: number) {
    return this.prisma.todo.update({
      where:{
        id: id
      },
      data:{
        deleteAt: new Date()
      }
    })
  }
  private checkHour(dateHour: Date){
    let existingTodo = this.prisma.todo.findFirst({
      where:{
        dueDate: dateHour
      }  
    })
    if(existingTodo != null) 
      throw new HttpException("there is an existing ToDo at the same time.", HttpStatus.BAD_REQUEST)
  }
}
