import { FC, ReactNode } from "react";

import { Modal as AntModal } from "antd";

interface ModalProps {
  isModalOpen: boolean;
  title: string | ReactNode;
  handleClose: () => void;
  children: ReactNode;
  confirmLoading: boolean;
}

const Modal: FC<ModalProps> = ({
  handleClose,
  title,
  children,
  isModalOpen,
  confirmLoading,
}) => {
  return (
    <AntModal
      footer={[]}
      title={title}
      open={isModalOpen}
      onCancel={handleClose}
      confirmLoading={confirmLoading}
    >
      {children}
    </AntModal>
  );
};

export { Modal };
