import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Row, Col, Form, Button } from "react-bootstrap";

import toast, { Toaster } from "react-hot-toast";

function CreateUserPage() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "",
    sign: "",
    notes: [],
    questions: [],
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("https://ironrest.herokuapp.com/wd-85-ft", form);
      navigate("/");
      toast.success("Perfil criado!");
    } catch (error) {
      console.log(error);
    }
  }

  console.log(form);
  return (
    <div className="container-lg">
      <h1 className="d-flex">Crie seu perfil</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label className="fs-4">Nome</Form.Label>
          <Form.Control
            size="lg"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="fs-4">Idade</Form.Label>
          <Form.Control
            size="lg"
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="fs-4">Signo</Form.Label>
          <Form.Control
            size="lg"
            name="sign"
            value={form.sign}
            onChange={handleChange}
          />
          <Form.Text>Não vale mentir</Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label className="fs-4">Tipo</Form.Label>
          <Form.Select name="type" onChange={handleChange} required>
            <option></option>
            <option value="professor">Professor</option>
            <option value="aluno">Aluno</option>
            <option value="ta">Ta</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="success" className="m-3" size="lg">
          Salvar
        </Button>
      </Form>
    </div>
  );
}

export default CreateUserPage;
