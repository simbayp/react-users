import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const Edit = () => {
  const [profile, setProfile] = useState({
    name: '',
    department: '',
    country: '',
    email: '',
  });
  const [editLoading, setEditLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const editProfile = async () => {
      try {
        const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/users/${id}`;
        const { data } = await axios.get(url);
        setProfile({ ...data });
      } catch (error) {
        console.log(error);
      }
    };
    editProfile();
  }, [id]);

  const editProfileHandler = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
  };

  const profileHandler = async () => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/users/${id}`;
    setEditLoading(true);

    try {
      await axios.put(url, profile);
      setEditLoading(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form inline className="container mt-5 w-50">
      <FormGroup className="mb-2 me-sm-2 mb-sm-0">
        <Label className="me-sm-2" for="username">
          Username
        </Label>
        <Input
          id="username"
          name="name"
          type="text"
          value={profile.name}
          onChange={editProfileHandler}
        />
      </FormGroup>
      <FormGroup className="mb-2 me-sm-2 mb-sm-0 mt-3">
        <Label className="me-sm-2" for="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          onChange={editProfileHandler}
        />
        <Row className="my-3">
          <Col md={6}>
            <Label for="department">Department</Label>
            <Input
              id="department"
              name="department"
              type="text"
              value={profile.department}
              onChange={editProfileHandler}
            />
          </Col>
          <Col md={6}>
            <Label for="country">Country</Label>
            <Input
              id="country"
              name="country"
              type="text"
              value={profile.country}
              onChange={editProfileHandler}
            />
          </Col>
        </Row>
      </FormGroup>
      {editLoading ? (
        <>
          <Button color="warning" disabled>
            <Spinner size="sm">Loading...</Spinner>
            <span> Updating</span>
          </Button>
        </>
      ) : (
        <Button color="warning" className="mt-3" onClick={profileHandler}>
          Update
        </Button>
      )}
    </Form>
  );
};

export default Edit;
