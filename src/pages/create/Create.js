import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [updateLoading, setUpdateLoading] = useState(false);
  const [userData, setUserDate] = useState({
    name: '',
    email: '',
    department: '',
    country: '',
  });

  const navigate = useNavigate();

  const userDataHandler = (event) => {
    setUserDate({ ...userData, [event.target.name]: event.target.value });
  };

  const submitHandler = async () => {
    const url = 'https://6541fd90f0b8287df1ff4458.mockapi.io/users';
    setUpdateLoading(true);

    try {
      await axios.post(url, userData);
      setUpdateLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form inline className="container mt-5 w-50">
      <FormGroup className="mb-2 me-sm-2 mb-sm-0">
        <Label className="me-sm-2" for="name">
          Username
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Mr.Frank"
          type="text"
          value={userData.name}
          onChange={userDataHandler}
        />
      </FormGroup>
      <FormGroup className="mb-2 me-sm-2 mb-sm-0 mt-3">
        <Label className="me-sm-2" for="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="frank@example.com"
          type="email"
          value={userData.email}
          onChange={userDataHandler}
        />
        <Row className="my-3">
          <Col md={6}>
            <Label for="department">Department</Label>
            <Input
              id="department"
              name="department"
              placeholder="books"
              type="text"
              value={userData.department}
              onChange={userDataHandler}
            />
          </Col>
          <Col md={6}>
            <Label for="country">Country</Label>
            <Input
              id="country"
              name="country"
              placeholder="India"
              type="text"
              value={userData.country}
              onChange={userDataHandler}
            />
          </Col>
        </Row>
      </FormGroup>
      {updateLoading ? (
        <>
          <Button color="success" disabled>
            <Spinner size="sm">Loading...</Spinner>
            <span> Creating</span>
          </Button>
        </>
      ) : (
        <Button color="success" className="mt-3" onClick={submitHandler}>
          Create
        </Button>
      )}
    </Form>
  );
};

export default Create;
