import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col, Form } from "react-bootstrap";

function HomePage() {
  const [students, setStudents] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchComAxios() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/wd-85-ft"
        );
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchComAxios();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <Row>
        <Col className="col-10">
          <Form.Control
            value={search}
            onChange={handleSearch}
            placeholder="Procure um amiguinho"
            type="search"
          />
        </Col>
        <Col className="col-2">
          <Link to="/create-user">
            <Button>Criar perfil</Button>
          </Link>
        </Col>
      </Row>

      <Row style={{ justifyContent: "space-evenly" }}>
        {students
          .filter((student) =>
            student.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((student) => {
            return (
              <Card
                key={student._id}
                style={{ width: "18rem", margin: "20px" }}
                className="shadow-sm"
              >
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src={
                      "http://franquia.globalmedclinica.com.br/wp-content/uploads/2016/01/investidores-img-02-01.png"
                    }
                  />
                  <Card.Title>{student.name.toUpperCase()}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted ">
                    {student.type}
                  </Card.Subtitle>
                </Card.Body>
                <Link
                  to={`/students/${student._id}`}
                  className="card-footer bg-white"
                >
                  <Button variant="dark">Veja Perfil Completo</Button>
                </Link>
              </Card>
            );
          })}
      </Row>
    </div>
  );
}

export default HomePage;
