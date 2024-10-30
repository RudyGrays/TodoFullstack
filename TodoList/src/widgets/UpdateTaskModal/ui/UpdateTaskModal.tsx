import { FC } from "react";

import mainClasses from "./style.module.scss";
import { Modal } from "@/shared/ui/Modal/ui/Modal";

import { useSelector } from "react-redux";
import { getTaskLoading, Task } from "@/entities/Task";
import { UpdateTaskForm } from "@/entities/Task/ui/UpdateTaskForm/UpdateTaskForm";

interface CreateTaskModalProps {
  handleClose: () => void;
  isModalOpen: boolean;
  task: Task;
}

const UpdateTaskModal: FC<CreateTaskModalProps> = ({
  handleClose,
  isModalOpen,
  task,
}) => {
  const isLoading = useSelector(getTaskLoading);
  return (
    <Modal
      confirmLoading={isLoading}
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      title={<span className={mainClasses.title}>Обновление задачи</span>}
    >
      <UpdateTaskForm closeHandler={handleClose} task={task} />
    </Modal>
  );
};

export { UpdateTaskModal };
