import { useCallback, useMemo, useState } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModalHandler = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const closeModalhandler = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const memoizedValue = useMemo(() => {
    return {
      openModalHandler,
      closeModalhandler,
      isModalOpen,
    };
  }, [openModalHandler, closeModalhandler, isModalOpen]);

  return memoizedValue;
};
