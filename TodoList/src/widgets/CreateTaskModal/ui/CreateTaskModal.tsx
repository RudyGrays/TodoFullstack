import { FC } from "react";

import mainClasses from "./style.module.scss";
import { Modal } from "@/shared/ui/Modal/ui/Modal";
import { CreateTaskForm } from "@/entities/Task/ui/CreateTaskForm/CreateTaskForm";
import { useSelector } from "react-redux";
import { getTaskLoading } from "@/entities/Task";

interface CreateTaskModalProps {
  handleClose: () => void;
  isModalOpen: boolean;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({
  handleClose,
  isModalOpen,
}) => {
  const isLoading = useSelector(getTaskLoading);
  return (
    <Modal
      confirmLoading={isLoading}
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      title={<span className={mainClasses.title}>Добавление задачи</span>}
    >
      <CreateTaskForm closeHandler={handleClose} />
    </Modal>
  );
};

export { CreateTaskModal };
