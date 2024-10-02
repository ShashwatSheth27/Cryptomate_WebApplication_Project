import React, { useState, useEffect } from 'react';
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import { Avatar, Col, Row } from 'antd';
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { db, upload } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const Dashboard = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [newFirstName, setFirstName] = useState("");
  const [newLastName, setLastName] = useState("");
  const [newMiddleName, setMiddleName] = useState("");
  const [newCity, setCity] = useState("");
  const [newState, setState] = useState("");
  const [newCountry, setCountry] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const userCollectionRef = collection(db, "users");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/Login");
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0])
    }
  }

  function handleClick() {
    upload(photo, user, setLoading);
  }

  const updateUser = (id, updatedUser) => {
    const userDoc = doc(db, "users", id);
    return updateDoc(userDoc, updatedUser);
  }

  const getUsers = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const getUser = async (id) => {
    const userDoc = doc(db, "users", id);
    return getDoc(userDoc);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (newFirstName === "" || newState === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    try {
      await updateUser(user.uid, { firstname: newFirstName, middlename: newMiddleName, lastname: newLastName, city: newCity, state: newState, country: newCountry });
      setMessage({ error: false, msg: "Profile Updated successfully!" });
      getUsers();
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  const createUserDocument = async (user) => {
    if (!user) return;
    const userRef = doc(userCollectionRef, `${user.uid}`);
    const snapshot = await getUser(userRef.id);
    if (!snapshot.exists()) {
      try {
        await setDoc(userRef, {
          firstname: newFirstName,
          lastname: newLastName,
          middlename: newMiddleName,
          city: newCity,
          state: newState,
          country: newCountry,
          email: user.email,
          mobile: user.phoneNumber,
          createdAt: new Date(),
        });
      } catch (error) {
        console.log('Error in creating user', error);
      }
    }
  };


  const updateUserData = async () => {
    getUsers();
    users.map((save) => {
      if (save.id == user.uid) {
        setFirstName(save.firstname);
        setLastName(save.lastname);
        setMiddleName(save.middlename);
        setCity(save.city);
        setState(save.state);
        setCountry(save.country);
        user.photoURL != null && setPhotoURL(user.photoURL);
      }
    })
  }


  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    }
    getUsers();
    updateUserData();
  }, []);

  createUserDocument(user);

  return (
    <>
      <Button variant="success" onClick={handleLogout} style={{float:"right",color:"blue",padding:5,margin:5}}>Log out</Button>
      <Button variant="primary" onClick={updateUserData} style={{float:"right",color:"blue",padding:5,margin:5}}>Refresh</Button>
      <div className="p-4 box text-center">
        <Avatar src={photoURL} size={200} />
        <input type="file" onChange={handleChange} />
        <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
      </div>
      <div className=" p-4 box text-center">Hello Welcome back,&nbsp;
        {user && user.email}
        {user && user.phoneNumber}
      </div>
      <div className=" p-4 box text-center">
        {users.map((currentUser) => {
          if (currentUser.id == user.uid) {
            return (
              <Col>
                <Row span={5}>Firstname : {currentUser.firstname}</Row>
                <Row span={5}>Middlename : {currentUser.middlename}</Row>
                <Row span={5}>Lastname : {currentUser.lastname}</Row>
                <Row span={5}>City : {currentUser.city}</Row>
                <Row span={5}>State : {currentUser.state}</Row>
                <Row span={5}>Country : {currentUser.country}</Row>
              </Col>
            );
          }
        })}
      </div>
      <div className=" p-4 box text-center">
        {users.map((currentUser) => {
          if (currentUser.id == user.uid) {
            return (
              <div className="p-4 box">
                {message?.msg && (
                  <Alert
                    variant={message?.error ? "danger" : "success"}
                    dismissible
                    onClose={() => setMessage("")}
                  >
                    {message?.msg}
                  </Alert>
                )
                }
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="firstname">
                    <InputGroup>
                      <InputGroup.Text id="firstname">FirstName : </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={newFirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="middlename">
                    <InputGroup>
                      <InputGroup.Text id="middlename">MiddleName : </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={newMiddleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="lastname">
                    <InputGroup>
                      <InputGroup.Text id="lastname">LastName : </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={newLastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="city">
                    <InputGroup>
                      <InputGroup.Text id="city">City : </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={newCity}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="state">
                    <InputGroup>
                      <InputGroup.Text id="state">State : </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={newState}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="country">
                    <InputGroup>
                      <InputGroup.Text id="city">Country : </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={newCountry}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="Submit">Update Profile</Button>
                  </div>
                </Form>
              </div>
            );
          }
        })}
      </div>
    </>
  )
}
export default Dashboard;