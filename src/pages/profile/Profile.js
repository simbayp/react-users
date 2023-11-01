import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from 'reactstrap';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    country: '',
    department: '',
    email: '',
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/users/${id}`;
    const viewProfile = async () => {
      try {
        setProfileLoading(true);
        const { data } = await axios.get(url);
        setProfileLoading(false);
        setProfile({ ...data });
      } catch (error) {
        console.log(error);
      }
    };

    viewProfile();
  }, [id]);

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <Card
        className="my-2"
        style={{
          width: '25rem',
        }}
      >
        <CardHeader className="fw-bold">
          {profileLoading ? (
            <Spinner color="danger" type="grow" size="sm">
              Loading...
            </Spinner>
          ) : (
            profile.name
          )}
        </CardHeader>
        <CardBody>
          <div className="card-text m-3">
            <span className="fw-bold">Email:</span>
            {profileLoading ? (
              <Spinner color="danger" type="grow" size="sm" className="ms-3">
                Loading...
              </Spinner>
            ) : (
              <span className="ms-3">{profile.email}</span>
            )}
          </div>
          <div className="card-text m-3">
            <span className="fw-bold">Department:</span>
            {profileLoading ? (
              <Spinner color="danger" type="grow" size="sm" className="ms-3">
                Loading...
              </Spinner>
            ) : (
              <span className="ms-3">{profile.department}</span>
            )}
          </div>
          <div className="card-text m-3">
            <span className="fw-bold">Country:</span>
            {profileLoading ? (
              <Spinner color="danger" type="grow" size="sm" className="ms-3">
                Loading...
              </Spinner>
            ) : (
              <span className="ms-3">{profile.country}</span>
            )}
          </div>
        </CardBody>
        <CardFooter className="d-flex justify-content-around">
          <Link to="/">
            <Button color="info">Back to Dashboard</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
