import React, { FC, useState } from "react";
import { Dropdown, Button } from "antd";
import { User } from "@/entities/User";

interface Props {
  users: User[];
  onSelect: (value: string) => void;
}
const ByAssigneeFilter: FC<Props> = ({ users, onSelect }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleMenuClick = ({ key }) => {
    const user = users.find((user) => user.id === key);
    setSelectedUser(user.firstName);
    onSelect(user.id);
  };

  const menuItems = users.map((user) => ({
    label: user.firstName,
    key: user.id,
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
    >
      <Button>Assignee: {selectedUser || "Select User"}</Button>
    </Dropdown>
  );
};

export default ByAssigneeFilter;
