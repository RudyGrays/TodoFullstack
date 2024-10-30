import { FC, useCallback, useEffect, useState } from "react";

import { List, Typography } from "antd";

import { TaskCard } from "../TaskCard/TaskCard";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import { getTasksThunk } from "../../model/services/getTasks/getTasksThunk";
import { useSelector } from "react-redux";
import {
  getTaskLoading,
  getTaskSelectors,
} from "../../model/selectors/selectors";
import { Loader } from "@/shared/ui/Loader/Loader";
import style from "./style.module.scss";
import { Task } from "../../model/types/TaskSchema";
import { UpdateTaskModal } from "@/widgets/UpdateTaskModal/ui/UpdateTaskModal";

interface TasksListProps {
  someClasses?: string;
  groupBy?: "today" | "week" | "future";
  byAssignee?: string;
}

const TasksList: FC<TasksListProps> = ({ byAssignee, groupBy }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getTaskLoading);
  const [isUpdateTaskOpen, setIsUpdateTaskOpen] = useState<boolean>(false);
  const [currentTask, setСurrentTask] = useState<Task>();

  const openModal = () => {
    setIsUpdateTaskOpen(true);
  };
  const changeTask = (task: Task) => {
    setСurrentTask(task);
    openModal();
  };

  const closehandler = useCallback(() => [setIsUpdateTaskOpen(false)], []);
  const tasks = useSelector(getTaskSelectors.selectAll);

  useEffect(() => {
    const params = {} as Partial<{
      groupBy: "today" | "week" | "future";
      byAssignee: string;
    }>;
    if (byAssignee) {
      params.byAssignee = byAssignee;
    }
    if (groupBy) {
      params.groupBy = groupBy;
    }

    dispatch(getTasksThunk(params));
  }, [dispatch, byAssignee, groupBy]);

  if (isLoading)
    return (
      <div className="centerLoader">
        <Loader />
      </div>
    );
  return (
    <div className={style.main}>
      <Typography.Text className={style.list}>Список задач</Typography.Text>
      <List
        className={style.wrapper}
        size="small"
        dataSource={tasks}
        rootClassName={style.wrapper}
        renderItem={(task) => <TaskCard changeTask={changeTask} task={task} />}
      />
      <UpdateTaskModal
        handleClose={closehandler}
        task={currentTask}
        isModalOpen={isUpdateTaskOpen}
      />
    </div>
  );
};

export { TasksList };
