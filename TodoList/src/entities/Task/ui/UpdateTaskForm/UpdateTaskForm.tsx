import { FC } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  DatePicker,
  FormProps,
} from "antd";

import mainClasses from "./style.module.scss";

import { Task, TaskProps } from "@/entities/Task/model/types/TaskSchema";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import { useSelector } from "react-redux";
import { getTaskError, getTaskLoading } from "../../model/selectors/selectors";

import { getSubordinateSelectors } from "@/features/Subordinates";
import { updateTaskThunk } from "../../model/services/updateTask/updateTaskThunk";

const { Option } = Select;
interface Props {
  closeHandler: () => void;
  task: Task;
}
export const UpdateTaskForm: FC<Props> = ({ closeHandler, task }) => {
  const dispatch = useAppDispatch();
  const error = useSelector(getTaskError);
  const isLoading = useSelector(getTaskLoading);

  const subordinates = useSelector(getSubordinateSelectors.selectAll);

  const onFinish: FormProps<TaskProps>["onFinish"] = (values) => {
    dispatch(updateTaskThunk({ data: values, url: task.id }));
    closeHandler();
  };

  return (
    <Form
      name="task"
      layout="vertical"
      onFinish={onFinish}
      style={{ width: "100%", maxWidth: "400px", minWidth: "200px" }}
      className={mainClasses.TaskForm}
    >
      <div className={mainClasses.inputsWrapper}>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}

        <Form.Item
          label={<span className={mainClasses.labelText}>Заголовок</span>}
          name="title"
          rules={[{ message: "Введите заголовок задачи!" }]}
          style={{ width: "100%" }}
        >
          <Input className={mainClasses.Input} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={<span className={mainClasses.labelText}>Описание</span>}
          name="description"
          rules={[{ message: "Введите описание задачи!" }]}
          style={{ width: "100%" }}
        >
          <Input.TextArea
            className={mainClasses.Input}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={<span className={mainClasses.labelText}>Приоритет</span>}
          name="priority"
          rules={[{ message: "Выберите приоритет задачи!" }]}
          style={{ width: "100%" }}
        >
          <Select style={{ width: "100%" }} className={mainClasses.Input}>
            <Option value="HIGH">Высокий</Option>
            <Option value="MEDIUM">Средний</Option>
            <Option value="LOW">Низкий</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className={mainClasses.labelText}>Назначить на</span>}
          name="assigneeId"
          style={{ width: "100%" }}
        >
          <Select style={{ width: "100%" }} className={mainClasses.Input}>
            {!!subordinates.length &&
              subordinates.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user?.login}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={<span className={mainClasses.labelText}>Срок выполнения</span>}
          name="dueDate"
          rules={[{ required: true, message: "Выберите срок выполнения!" }]}
          style={{ width: "100%" }}
        >
          <DatePicker style={{ width: "100%" }} className={mainClasses.Input} />
        </Form.Item>
      </div>

      <Form.Item style={{ width: "100%" }}>
        <Button
          loading={isLoading}
          className={mainClasses.Button}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Обновить задачу
        </Button>
      </Form.Item>
    </Form>
  );
};
