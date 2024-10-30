import React from "react";

import { useSelector } from "react-redux";
import { getNotification } from "../../model/selectors/selectors";
import { createPortal } from "react-dom";
import { Typography } from "antd";
import style from "./style.module.scss";
const Notification: React.FC = () => {
  const notificationMessage = useSelector(getNotification);

  if (!notificationMessage) {
    return null;
  }

  return createPortal(
    <Typography.Text className={style.main}>
      {notificationMessage}
    </Typography.Text>,
    document.body
  );
};

export default Notification;
