import React, { useState, useEffect } from 'react';
import './Home.css';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  ListGroup,
  ListGroupItem,
  Spinner,
} from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';
import { BsTrash, BsPencil, BsEye } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [id, setId] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getUsers = async () => {
    const url = 'https://6541fd90f0b8287df1ff4458.mockapi.io/users';

    try {
      await axios.get(url).then(({ data }) => setUsers(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    const url = `https://6541fd90f0b8287df1ff4458.mockapi.io/users/${userId}`;

    setDeleteLoading(true);
    setId(userId);
    try {
      await axios.delete(url);
      getUsers();
      setDeleteLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="d-flex my-5 container-fluid col-sm-6 offset-sm-2 offset-lg-4">
      <ListGroup>
        {loading ? (
          <Spinner className="m-5" color="dark">
            Loading...
          </Spinner>
        ) : (
          <>
            <ListGroupItem className="d-flex justify-content-between">
              <span className="fw-bold my-auto">All Users</span>
              <Link to="/create">
                <Button color="primary">Add users +</Button>
              </Link>
            </ListGroupItem>

            {users.map((user) => (
              <ListGroupItem
                className="d-flex justify-content-between"
                key={user.id}
              >
                <div className="d-flex me-5">
                  <Button color="none" className="outline--none">
                    <Link to={'/profile/' + user.id}>
                      <FaUserCircle className="fs-3 mx-3 my-auto text-dark" />
                    </Link>
                  </Button>
                  <div>
                    {user.name}
                    <br />
                    <span className="text-primary">{user.email}</span>
                  </div>
                </div>
                <ButtonToolbar>
                  <ButtonGroup className="me-2">
                    <Button color="link" className="outline--none">
                      <Link to={'/profile/' + user.id}>
                        <BsEye className="text-success" />
                      </Link>
                    </Button>
                    <Button color="link" className="outline--none">
                      <Link to={'/edit/' + user.id}>
                        <BsPencil className="text-primary" />
                      </Link>
                    </Button>
                    <Button color="link" className="outline--none">
                      {id === user.id && deleteLoading ? (
                        <Spinner color="danger" type="grow" size="sm">
                          Loading...
                        </Spinner>
                      ) : (
                        <BsTrash
                          className="text-danger"
                          onClick={() => deleteUser(user.id)}
                        />
                      )}
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </ListGroupItem>
            ))}
          </>
        )}
      </ListGroup>
    </div>
  );
};

export default Home;
