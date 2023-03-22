import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import environment from "../Environment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '' 
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      axios.post(`${environment.api}/user/login`, values)
        .then((res) => {
          console.log(res);
          const token = res.data.token; 
          if(token) {
            localStorage.setItem("token",token)
            navigate("/")
          } 
        })
        .catch((err) => {
          alert("unauthorized access")
        });
    },
  });

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Enter username"
              />
              <Form.Text className="text-danger">
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-danger">{formik.errors.username}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Enter password"
              />
              <Form.Text className="text-danger">
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
