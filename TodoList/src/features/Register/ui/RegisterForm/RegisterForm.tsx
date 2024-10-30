import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Typography } from "antd";

import mainClasses from "./RegisterForm.module.scss";
import { Link, Navigate } from "react-router-dom";
import { RoutePaths } from "@/app/providers/RouterProvider/config/RouterConfig";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import {
  getUserAuth,
  getUserError,
  getUserLoading,
  UserActions,
} from "@/entities/User";
import { useAppDispatch } from "@/app/providers/StoreProvider/config/store";
import {
  RegisterThunk,
  RegisterThunkProps,
} from "../../model/services/RegisterThunk";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getUserLoading);
  const error = useSelector(getUserError);
  const isAuth = useSelector(getUserAuth);

  useEffect(() => {
    dispatch(UserActions.resetError());
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    dispatch(RegisterThunk(values as RegisterThunkProps));
  };

  if (isAuth) {
    return <Navigate to={RoutePaths.tasks} />;
  }

  return (
    <Form
      name="register"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: "100%", maxWidth: "400px", minWidth: "200px" }}
      className={mainClasses.RegisterForm}
    >
      <div className={mainClasses.inputsWrapper}>
        <Typography.Title style={{ width: "100%", textAlign: "center" }}>
          <span className={mainClasses.Title}>Регистрация</span>
        </Typography.Title>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        <Form.Item
          className={mainClasses.Item}
          label={<span className={mainClasses.labelText}>Имя</span>}
          name="firstName"
          rules={[{ required: true, message: "Введите ваше имя!" }]}
          style={{ width: "100%" }}
        >
          <Input style={{ width: "100%" }} className={mainClasses.Input} />
        </Form.Item>

        <Form.Item
          className={mainClasses.Item}
          label={<span className={mainClasses.labelText}>Фамилия</span>}
          name="lastName"
          rules={[{ required: true, message: "Введите вашу фамилию!" }]}
          style={{ width: "100%" }}
        >
          <Input className={mainClasses.Input} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          className={mainClasses.Item}
          label={<span className={mainClasses.labelText}>Отчество</span>}
          name="patronymic"
          rules={[{ required: true, message: "Введите ваше отчество!" }]}
          style={{ width: "100%" }}
        >
          <Input className={mainClasses.Input} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          className={mainClasses.Item}
          label={<span className={mainClasses.labelText}>Логин</span>}
          name="login"
          rules={[{ required: true, message: "Введите логин!" }]}
          style={{ width: "100%" }}
        >
          <Input className={mainClasses.Input} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={<span className={mainClasses.labelText}>Пароль</span>}
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
          style={{ width: "100%" }}
        >
          <Input.Password
            className={mainClasses.Input}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className={mainClasses.labelText}>Повторите пароль</span>
          }
          name="confirmPassword"
          rules={[
            { required: true, message: "Повторите пароль!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
          style={{ width: "100%" }}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined className={mainClasses.openEye} />
              ) : (
                <EyeInvisibleOutlined className={mainClasses.closeEye} />
              )
            }
            className={mainClasses.Input}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>

      <Typography.Link>
        <Link to={RoutePaths.login}>Уже есть аккаунт?</Link>
      </Typography.Link>

      <Form.Item style={{ width: "100%" }}>
        <Button
          loading={isLoading}
          className={mainClasses.Button}
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export { RegisterForm };
