// import {useForm} from "react-hook-form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  const params = useParams();
  // console.log(params)
  const { id } = params; // getting Id ES6 model
  const defaultValues = {
    title: "",
    description: "",
    price: "",
    image: "",
  };
  const [product, setProduct] = useState(defaultValues);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios("http://localhost:3000/products/" + id)
    .then((res) => {
      //console.log(res.data)
      const temp = { ...defaultValues, ...res.data };
      //console.log(temp)
      setProduct(temp)
    });
  }, []);
  // console.log(params.id); // getting Id normal js method

  const formik = useFormik({
    initialValues: product,
    enableReinitialize:true,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
      image: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      
      if (id) {
        // id is available update request
        axios
          .put("http://localhost:3000/products/" + id, values)
          .then(function (response) {
            console.log(response);
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        // id not available so create request
        axios
          .post("http://localhost:3000/products", values)
          .then(function (response) {
            console.log(response);
            navigate("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      // fetch("http://localhost:3000/products", {
      //     method: 'POST',
      //     headers: {
      //         "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(values)

      // })
      //     .then(res => res.json())
      //     .then((res) => {
      //         console.log(res);
      //         navigate('/')
      //     })
      //     .cath((err) => {
      //         console.log(err)
      //     })
    },
  });

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Enter Title"
              />
              <Form.Text className="text-danger">
                {formik.touched.title && formik.errors.title ? (
                  <div className="text-danger">{formik.errors.title}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Write description"
              />
              <Form.Text className="text-danger">
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-danger">{formik.errors.description}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
                placeholder="Enter Price"
              />
              <Form.Text className="text-danger">
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-danger">{formik.errors.price}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                onChange={formik.handleChange}
                value={formik.values.image}
                placeholder="Enter Image url"
              />
              <Form.Text className="text-danger">
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-danger">{formik.errors.image}</div>
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
export default Product;
