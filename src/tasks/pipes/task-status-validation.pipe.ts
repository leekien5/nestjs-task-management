import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ];

    transform(value: any) {
        if(value) {
            value = value.toUpperCase();
    
            if(!this.isStatusValid(value)) {
                throw new BadRequestException(`"${value}" is an invalid status.`)
            }
            return value;
        }
    }

    private isStatusValid(status: any) {
        const idx = this.allowStatuses.indexOf(status);
        return idx !== -1;
    }
}