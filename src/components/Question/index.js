import { useState } from "react";
import axios from "axios";

import { Form, Button, Card } from "react-bootstrap";

function Question({ question, index, student, studentID, reload, setReload }) {
  const [inputAnswer, setInputAnswer] = useState("");

  function handleChange(e) {
    setInputAnswer(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputAnswer === " " || inputAnswer === "  ") {
      return;
    }

    try {
      const clone = { ...student };
      delete clone._id;

      clone.questions[index].answer = inputAnswer;
      clone.questions[index].isAnswered = true;

      await axios.put(
        `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`,
        clone
      );

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const clone = { ...student };
      delete clone._id;

      clone.questions.splice(index, 1);

      await axios.put(
        `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`,
        clone
      );

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card style={{ width: "90%" }} className="my-2">
      <Card.Body style={{ overflow: "auto", maxHeight: "300px" }}>
        <Card.Title>{question.question}?</Card.Title>

        {question.isAnswered && (
          <>
            <Card.Subtitle className="text-muted mt-1">
              {question.answer}
            </Card.Subtitle>
          </>
        )}
        {!question.isAnswered && (
          <Form className="mt-2">
            <Form.Control
              as="textarea"
              placeholder="responde o coleguinha"
              value={inputAnswer}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                minHeight: "100px",
                maxHeight: "120px",
              }}
            />
          </Form>
        )}
      </Card.Body>
      <Card.Footer>
        {question.isAnswered ? (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            className="d-flex"
          >
            Deletar Pergunta
          </Button>
        ) : (
          <div className="d-flex justify-content-between">
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Deletar Pergunta
            </Button>
            <Button variant="success" size="sm" onClick={handleSubmit}>
              Responder
            </Button>
          </div>
        )}
      </Card.Footer>
    </Card>
  );
}

export default Question;
