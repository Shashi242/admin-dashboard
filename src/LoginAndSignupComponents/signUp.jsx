import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import "./Signup.css";

import { useState } from "react";
import {
  Form,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const SingUp = () => {
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   imageUrl: "",
  // });

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmdpassword] = useState("");
  const [imageUrl,setImageUrl] = useState("");

  const navigate = useNavigate();
  const [isLoading,setisLoading] = useState(false);

  // const handleClick = (event, property) => {
  //   setUserData((userData) => {
  //     return {
  //       ...userData,
  //       [property]: event.target.value,
  //     };
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(email,imageUrl);
    // name filed shuld not be empty
    if (name === undefined || name.trim() === "") {
      console.log("name field is empty");
      return;
    }

    // email should not be empty
    else if (email === undefined || email.trim() === "") {
      console.log("email field is empty");
      return;
    }

    // password should not be empty
    else if (password === undefined || password.trim() === "") {
      console.log("password field is empty");
      return;
    }

    // conformPassword should not be empty
    else if (
      confirmPassword === undefined ||
      confirmPassword.trim() === ""
    ) {
      console.log("confirmPassword field is empty");
      return;
    }

    // password and confirmed password should be same if not return
    else if (password !== confirmPassword) {
      console.log("Password and conform password should be same...");
      alert("Password and conform password should be same...");
      return;
    }

    /// here we calling an api
    setisLoading(()=>true);
    createUserWithEmailAndPassword(auth, email, password).then(async (userdetail) => {
      console.log(userdetail);
      const detail = userdetail.user;
      await updateProfile(detail, {
        displayName: name,
      });
      navigate("/");
      alert("Account created...")
    }).catch((err) => {
      console.log(err);
      alert(err.code)
    }).finally(()=>{setisLoading(()=>false)});

  };

  return (
    <>
      <Container>
        {/* single Row  */}

        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <Card
              className="my-3 shadow p-4 signup_main"
              style={{
                borderRadius: "20px",
              }}
            >
              <Card.Body>
                <Container className="text-center">
                  <img
                    src={"https://images.unsplash.com/photo-1568952433726-3896e3881c65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                    width={"50%"}
                    height={"50%"}
                    className="signup_img"
                    style={{
                      borderRadius: "10px",
                      border: "solid 1px white"
                    }}
                  />
                </Container>
                <h3 className="mb-4 mt-3 text-center text-uppercase">
                  Dashboard SignUp
                </h3>

                <Form
                  onSubmit={(event) => {
                    return handleSubmit(event);
                  }}
                >
                  {/* Name Field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label style={{color: "antiquewhite", fontSize: "18px"}}>Enter your Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Enter name"
                      onChange={(event) => {setName(event.target.value)}}
                      value={name}
                    />
                  </Form.Group>

                  {/* email field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label style={{color: "antiquewhite", fontSize: "18px"}}>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="Enter Email"
                      onChange={(event) => {setEmail(event.target.value)}}
                      value={email}
                    />
                  </Form.Group>

                  {/* new password field */}
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label style={{color: "antiquewhite", fontSize: "18px"}}>Enter new password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter password"
                      onChange={(event) =>{setPassword(event.target.value)} }
                      value={password}
                    />
                  </Form.Group>
{/* handleClick(event, "password") */}
{/* {userData.confirmPassword=event.target.value} */}
                  {/* Confirm password */}
                  <Form.Group className="mb-3" controlId="formConfirmpassword">
                    <Form.Label style={{color: "antiquewhite", fontSize: "18px"}}>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="Enter password"
                      onChange={(event) => {setConfirmdpassword(event.target.value)}}
                      value={confirmPassword}
                    />
                  </Form.Group>

                  {/* image url */}
                  <Form.Group className="mb-3" controlId="formImageUrl">
                    <Form.Label style={{color: "antiquewhite", fontSize: "18px"}}>Enter image Url</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter image url   (optional)"
                      onChange={(event) => {setImageUrl(event.target.value)}}
                      value={imageUrl}
                    />
                  </Form.Group>

                  <Container>
                    <p className="text-center">
                      Already register
                      <Link to="/" style={{ textDecoration: "none", fontSize: "17px" }}>
                        <span className="ms-1">login</span>
                      </Link>
                    </p>
                  </Container>

                  <Container className="text-center">
                    <Button
                      type="submit"
                      className={"text-uppercase signup_active"}
                      variant="success"
                      size="lg"
                      disabled={isLoading}
                    >
                      <Spinner hidden={!isLoading} animation="border" size="sm" className="me-2" />
                      <span hidden={!isLoading}>wait...</span>

                      <span hidden={isLoading}>Register</span>
                    </Button>
                    <Button
                    onClick={()=>{setName(""); 
                    setEmail(""); 
                    setPassword(""); 
                    setConfirmdpassword(""); 
                    setImageUrl("")}}
                      size="lg"
                      className="ms-2 text-uppercase signup_active"
                      variant="danger"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default SingUp;
