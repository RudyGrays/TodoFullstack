import { useState } from "react";
import { Dropdown, Button } from "antd";

const GroupByFilter = ({ onChange }) => {
  const [selected, setSelected] = useState("-");

  const handleMenuClick = ({ key }) => {
    setSelected(key);
    onChange(key);
  };

  const menuItems = [
    { label: "Today", key: "today" },
    { label: "This Week", key: "week" },
    { label: "Future", key: "future" },
  ];

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
    >
      <Button>Group By: {selected}</Button>
    </Dropdown>
  );
};

export default GroupByFilter;
