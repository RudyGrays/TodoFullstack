import { FC, useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import mainClasses from "./TasksPage.module.scss";
import { Button } from "antd";
import { CreateTaskModal } from "@/widgets/CreateTaskModal/ui/CreateTaskModal";
import { TasksList } from "@/entities/Task";

import GroupByFilter from "@/widgets/GroupByFilter/GroupByFilter";
import ByAssigneeFilter from "@/widgets/ByAssigneeFilter/ByAssigneeFilter";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import {
  getSubordinateSelectors,
  getSubordinatesThunk,
} from "@/features/Subordinates";
import { useSelector } from "react-redux";
import {
  LS_GROUP_BY_ASSIGNEE_TASKS_KEY,
  LS_GROUP_BY_DATE_TASKS_KEY,
} from "@/shared/constants/constants";

interface TasksPageProps {}
type TDate = "today" | "week" | "future" | "all";
const TasksPage: FC<TasksPageProps> = () => {
  const [isCreateTaskModal, setIsCreateTaskModal] = useState<boolean>(false);

  const [groupBy, setGroupBy] = useState<TDate>();

  const [byAssignee, setByAssignee] = useState<string>();

  const subordinates = useSelector(getSubordinateSelectors.selectAll);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const item = localStorage.getItem(LS_GROUP_BY_DATE_TASKS_KEY) as TDate;
    if (!item) return;

    setGroupBy(item);
    console.log(groupBy);
  }, [subordinates]);

  useEffect(() => {
    dispatch(getSubordinatesThunk());
  }, [dispatch]);

  const setGroupByHandler = useCallback(
    (value) => {
      localStorage.setItem(LS_GROUP_BY_DATE_TASKS_KEY, value);
      setGroupBy(value);
    },
    [setGroupBy]
  );
  const setByAssigneeHandler = useCallback(
    (value: string) => {
      localStorage.setItem(
        LS_GROUP_BY_ASSIGNEE_TASKS_KEY,
        JSON.stringify(value)
      );
      setByAssignee(value);
    },
    [setByAssignee]
  );

  return (
    <div className={classNames(mainClasses.TasksPage, {}, [])}>
      <div className={mainClasses.buttons}>
        <Button onClick={() => setIsCreateTaskModal(true)}>+</Button>
        {(!!groupBy || !!byAssignee) && (
          <Button
            onClick={() => {
              setGroupBy(undefined);
              setByAssignee(undefined);
              localStorage.removeItem(LS_GROUP_BY_DATE_TASKS_KEY);
              localStorage.removeItem(LS_GROUP_BY_ASSIGNEE_TASKS_KEY);
            }}
          >
            Очистить фильтры
          </Button>
        )}
        <GroupByFilter onChange={setGroupByHandler} value={groupBy} />
        <ByAssigneeFilter
          users={subordinates}
          onSelect={setByAssigneeHandler}
        />
      </div>

      <TasksList byAssignee={byAssignee} groupBy={groupBy} />

      <CreateTaskModal
        handleClose={() => setIsCreateTaskModal(false)}
        isModalOpen={isCreateTaskModal}
      />
    </div>
  );
};

export default TasksPage;
