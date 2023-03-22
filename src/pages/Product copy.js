import React from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"

const Product = () => {
  const defaultValues = {
    title: "",
    description: "",
    price: "",
    image: "",
  }
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      description: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      price: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      image: Yup.string()
        .min(3, "Must be  3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
      // setFormState(values);
    },
  })

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className='mb-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                onChange={formik.handleChange}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.title && formik.errors.title ? (
                  <div className='text-danger'>{formik.errors.title}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                name='description'
                onChange={formik.handleChange}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.description && formik.errors.description ? (
                  <div className='text-danger'>{formik.errors.description}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='text'
                name='price'
                onChange={formik.handleChange}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.price && formik.errors.price ? (
                  <div className='text-danger'>{formik.errors.price}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Form.Group className='mb-3' controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                name='image'
                onChange={formik.handleChange}
                placeholder='Enter Title'
              />
              <Form.Text className='text-danger'>
                {formik.touched.image && formik.errors.image ? (
                  <div className='text-danger'>{formik.errors.image}</div>
                ) : null}
              </Form.Text>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Product
