import axios from "axios";
import { useState } from "react";

import {Form, Button, Card } from "react-bootstrap";

function Note({ note, index, student, studentID, reload, setReload }) {
  const [showForm, setShowForm] = useState(false);

  const [noteEdit, setNoteEdit] = useState(note);

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const clone = { ...student };
      delete clone._id;

      clone.notes.splice(index, 1);

      await axios.put(
        `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`,
        clone
      );

      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(showForm);

  function handleChange(e) {
    setNoteEdit(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...student };
      delete clone._id;

      clone.notes[index] = noteEdit;

      await axios.put(
        `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`,
        clone
      );
      setReload(!reload);
      setShowForm(!showForm);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Card className="m-2" style={{ width: "18rem" }}>
      <>
        <Card.Body style={{ overflow: "auto", maxHeight: "150px" }}>
          {!showForm && <Card.Text>{note}</Card.Text>}

          {showForm && (
            <>
              <Form>
                <Form.Control
                  as="textarea"
                  value={noteEdit}
                  onChange={handleChange}
                  style={{
                    width: "16rem",
                    minHeight: "100px",
                    maxHeight: "120px",
                  }}
                />
              </Form>
            </>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          {showForm ? (
            <>
              <div className="d-flex justify-content-between">
                <Button onClick={handleSubmit} variant="success" size="sm">
                  salvar
                </Button>
                <Button size="sm" variant="danger" onClick={handleDelete}>
                  Deletar nota
                </Button>
              </div>
            </>
          ) : (
            <Button size="sm" onClick={() => setShowForm(!showForm)}>
              Editar
            </Button>
          )}
        </Card.Footer>
      </>
    </Card>
  );
}

export default Note;
