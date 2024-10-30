import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";

import mainClasses from "./LoginForm.module.scss";
import { Link, Navigate } from "react-router-dom";
import { RoutePaths } from "@/app/providers/RouterProvider/config/RouterConfig";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import { useSelector } from "react-redux";
import {
  getUserAuth,
  getUserError,
  getUserLoading,
  UserActions,
} from "@/entities/User";
import { LoginThunk, LoginThunkProps } from "../../model/services/LoginThunk";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const isAuth = useSelector(getUserAuth);

  useEffect(() => {
    dispatch(UserActions.resetError());
  }, [dispatch]);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(LoginThunk(values as LoginThunkProps));
  };

  if (isAuth) {
    return <Navigate to={RoutePaths.tasks} />;
  }
  return (
    <Form
      name="login"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: "100%", maxWidth: "400px", minWidth: "200px" }}
      className={mainClasses.LoginForm}
    >
      <div className={mainClasses.inputsWrapper}>
        <Typography.Title style={{ width: "100%", textAlign: "center" }}>
          <span className={mainClasses.Title}>Вход в аккаунт</span>
        </Typography.Title>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        <Form.Item
          className={mainClasses.Item}
          label={<span className={mainClasses.labelText}>Username</span>}
          name="login"
          rules={[{ required: true, message: "Please input your username!" }]}
          style={{ width: "100%" }}
        >
          <Input className={mainClasses.Input} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={<span className={mainClasses.labelText}>Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          style={{ width: "100%" }}
        >
          <Input.Password
            className={mainClasses.Input}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>
      <Typography.Link>
        <Link to={RoutePaths.register}>Нет аккаунта?</Link>
      </Typography.Link>
      <Form.Item style={{ width: "100%" }}>
        <Button
          loading={isLoading}
          className={mainClasses.Button}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { LoginForm };
