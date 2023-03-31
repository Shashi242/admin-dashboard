import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";


const Login = ({setLogin}) => {
  // this states handle data form user
  const [emailData, setemailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [isLoading,setLoading] = useState(false);

  // This function handle email and password field
  // const handleChange = (event, property) => {
  //   setLoginData((loginData) => {
  //     return {
  //       ...loginData,
  //       [property]: event.target.value,
  //     };
  //   });
  //   console.log(loginData.email);
  // };

  // this handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // this filed validation for email
    // if (emailData === undefined || emailData.trim() === "") {
    //   return;
    // }

    // // this is validation for password
    // if (loginData.password === undefined || loginData.email.trim() === "") {
    //   return;
    // }

    // here we make a api call...
    setLoading(()=>true);
    signInWithEmailAndPassword(auth, emailData, passwordData).then((userdetail) => {
      console.log(userdetail.user.email);
      
        setLogin(()=>false);
     
    }).catch((err) => {
      console.log(err.code);
      alert(err.code);
    }).finally(()=>{setLoading(()=>false)});

  };

  return (
    <>
      <Container className="mt-3 p-5">
        <Row>
          <Col
            md={{
              span: 8,
              offset: 2,
            }}
          >
            <Card className="p-2 login_main"
            style={{borderRadius: "10px", boxShadow: "0 0 7px black"}}
            >
              <Card.Body>
                <Container className="text-center mb-2 p-2 mb-3">
                  <img
                    src={"https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"}
                    className="img-fluid login_img"
                    style={{
                      maxHeight: "50%",
                      width: "50%",
                      objectFit: "contain",
                      borderRadius: "15px",
                      border: "solid 1px white"
                    }}
                  />
                </Container>
                <Container className="text-center mt-3 text-uppercase">
                  <h3>Newton Dashboard</h3>
                </Container>

                <Form onSubmit={(event) => handleSubmit(event)}>
                  {/* email login field */}
                  <Form.Group className="mb-3">
                    <Form.Label>Enter your email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      placeholder="email"
                      onChange={(event) => {setemailData(event.target.value)}}
                      value={emailData}
                    />
                  </Form.Group>

                  {/* password login field */}
                  <Form.Group className="mb-3">
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      placeholder="password"
                      onChange={(event) => {setPasswordData(event.target.value)}}
                      value={passwordData}
                    />
                  </Form.Group>

                  <Container>
                    <p className="text-center isSignup">
                      If you not have account
                      <Link to="/signup" style={{ textDecoration: "none", fontSize: "15px" }}>
                        <span className="ms-1">Signup</span>
                      </Link>
                    </p>
                  </Container>

                  <Container className="text-center text-uppercase">
                    <Button
                      size="lg"
                      type="submit"
                      variant="primary"
                      className="me-2 btn_active"
                      disabled={isLoading}
                    >
                      <Spinner hidden={!isLoading} animation="border" size="sm" className="me-2" />
                      <span hidden={!isLoading}>wait...</span>

                      <span hidden={isLoading}>Login</span>
                    </Button>

                    <Button size="lg" variant="danger" onClick={()=>{setPasswordData(""); setemailData("");}}>
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

export default Login;
