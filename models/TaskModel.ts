import { TaskStatus } from '../types/TaskType';
import { TaskTypeModel } from './TaskTypeModel';

export class TaskModel {
    name: String;
    status: TaskStatus;
    createdAt: EpochTimeStamp;
    updatedAt: EpochTimeStamp;
    description: String;
    type: TaskTypeModel;
}
