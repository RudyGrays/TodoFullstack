import { FC } from "react";

import { Button, List, Typography } from "antd";
import { Status, Task } from "../../model/types/TaskSchema";
import style from "./style.module.scss";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { getUserData } from "@/entities/User";
import { workOnTaskThunk } from "../../model/services/workOnTask/workOnTaskThunk";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import { completeTaskThunk } from "../../model/services/completeTask/completeTaskThunk";
import { cancelTaskThunk } from "../../model/services/cancelTask/cancelTaskThunk";
interface TaskCardProps {
  someClasses?: string;
  task: Task;
  changeTask: (task: Task) => void;
}
const red = (dueDate: Date, status: Status) => {
  if (status === Status.CANCELLED || status === Status.DONE) return false;

  return new Date().getTime() > new Date(dueDate).getTime();
};

const green = (status: Status) => {
  if (status === Status.DONE) return true;
};
const TaskCard: FC<TaskCardProps> = ({ task, changeTask }) => {
  const userData = useSelector(getUserData);
  const dispatch = useAppDispatch();
  return (
    <List.Item
      style={{ display: "flex", gap: "20px" }}
      className={style.wrapper}
    >
      <Typography.Paragraph
        className={classNames(
          style.item,
          {
            [style.red]: red(task.dueDate, task.status),
            [style.green]: green(task.status),
          },
          []
        )}
      >
        {task?.title}
      </Typography.Paragraph>
      <Typography.Paragraph className={style.item}>
        Дата окончания: {String(task.dueDate)}
      </Typography.Paragraph>
      <Typography.Paragraph className={style.item}>
        Автор: {task.creator.firstName}
      </Typography.Paragraph>
      <Typography.Paragraph className={style.item}>
        Ответственный: {task.assignee?.firstName}
      </Typography.Paragraph>
      <Typography.Paragraph className={style.item}>
        Статус: {task.status}
      </Typography.Paragraph>
      <div className={style.buttons}>
        {userData.id === task.assigneeId && task.status !== Status.DONE && (
          <Button onClick={() => dispatch(completeTaskThunk(task.id))}>
            Выполнить
          </Button>
        )}
        {userData.id === task.assigneeId &&
          task.status !== Status.IN_PROGRESS && (
            <Button onClick={() => dispatch(workOnTaskThunk(task.id))}>
              Начать работу
            </Button>
          )}
        {userData.id === task.creatorId && (
          <Button onClick={() => changeTask(task)}>Изменить </Button>
        )}
        {userData.id === task.creatorId && task.status !== Status.CANCELLED && (
          <Button onClick={() => dispatch(cancelTaskThunk(task.id))}>
            Отменить
          </Button>
        )}
      </div>
    </List.Item>
  );
};

export { TaskCard };
