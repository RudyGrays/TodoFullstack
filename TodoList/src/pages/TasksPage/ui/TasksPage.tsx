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

interface TasksPageProps {}

const TasksPage: FC<TasksPageProps> = () => {
  const [isCreateTaskModal, setIsCreateTaskModal] = useState<boolean>(false);

  const [groupBy, setGroupBy] = useState<"today" | "week" | "future">();
  const [byAssignee, setByAssignee] = useState<string>();

  const subordinates = useSelector(getSubordinateSelectors.selectAll);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubordinatesThunk());
  }, [dispatch]);

  const setGroupByHandler = useCallback(
    (value) => {
      setGroupBy(value);
    },
    [setGroupBy]
  );
  const setByAssigneeHandler = useCallback(
    (value: string) => {
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
            }}
          >
            Очистить фильтры
          </Button>
        )}
        <GroupByFilter onChange={setGroupByHandler} />
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
