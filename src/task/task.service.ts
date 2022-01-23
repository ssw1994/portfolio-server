import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/task-filter.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument, Task } from './schemas/task.schema';
import { User, UserDocument } from '../auth/schemas/user.schema';
@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getTasks(taskFilterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = taskFilterDto;
    const result = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'tasks',
          localField: 'tasks',
          foreignField: '_id',
          as: 'tasks',
        },
      },
      { $match: { _id: user._id } },
      { $project: { tasks: 1, skills: 1 } },
    ]);

    return result;

    //return await this.taskModel.find({ userId: user._id }).exec();
  }
  // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }

  //   return tasks;
  // }

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createtaskdto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createtaskdto;
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
    };

    const TaskObj = new this.taskModel(task);
    console.log(TaskObj);
    await this.userModel.findByIdAndUpdate(user._id, {
      $push: { tasks: TaskObj._id },
    });
    return TaskObj.save();
  }

  async deleteTask(id: string, user: User): Promise<any> {
    return await this.taskModel.findByIdAndRemove(id);
  }

  // getTaskWithFilter() {}

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    return await this.taskModel.findByIdAndUpdate(id, { status: status });
  }
}
