import Question from "../Question";
import { useState } from "react";
import axios from "axios";

import {
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";

function Questions({ student, studentID, reload, setReload }) {
  const [askedQuestion, setAskedQuestion] = useState({
    question: "",
    answer: "",
    isAnswered: false,
  });

  function handleChange(e) {
    setAskedQuestion({ ...askedQuestion, question: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...student };
      delete clone._id;

      clone.questions.push(askedQuestion);

      await axios.put(
        `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`,
        clone
      );

      setReload(!reload);
      setAskedQuestion({ ...askedQuestion, question: "" });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="d-flex flex-column align-items-stretch ">
      <h2>Suas perguntas</h2>
      <Form onSubmit={handleSubmit} className="m-3 d-flex ">
        <InputGroup>
          <FloatingLabel
            controlId="floatingTextarea1"
            label="Faça sua pergunta"
          >
            <Form.Control
              as="textarea"
              value={askedQuestion.question}
              onChange={handleChange}
              placeholder="Faça sua pergunta"
              style={{ height: "100px", width: "100%" }}
            />
          </FloatingLabel>
          <Button type="submit" className="input-group-text btn btn-secondary">
            Perguntar
          </Button>
        </InputGroup>
      </Form>

      <div className="d-flex flex-column flex-wrap justify-content-center  align-items-center mb-4">
        {student.questions.map((question, index) => {
          return (
            <Question
              question={question}
              index={index}
              key={question.question}
              student={student}
              studentID={studentID}
              reload={reload}
              setReload={setReload}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
