import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditUserForm from "../../components/EditUserForm";
import Notes from "../../components/Notes";
import Questions from "../../components/Questions";

import { Button, Accordion } from "react-bootstrap";

function ProfilePage() {
  const { studentID } = useParams();

  const [student, setStudent] = useState({});
  console.log(student);

  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "",
    sign: "",
  });

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/wd-85-ft/${studentID}`
        );

        setStudent(response.data);
        setForm(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [studentID, reload]);

  return (
    <div>
      <div className="mb-2 mt-2 d-flex flex-row card shadow-md container-lg justify-content-between align-items-center">
        <h2 className="m-2 text-secondary">{student.name}</h2>

        <div>Signo {student.sign}</div>
        <div>{student.age} anos</div>
        <div>{student.type}</div>

        <Button onClick={() => setShowForm(!showForm)} size="sm">
          Editar
        </Button>
      </div>

      {showForm === true && (
        <EditUserForm
          form={form}
          studentID={studentID}
          setForm={setForm}
          show={showForm}
          setShow={setShowForm}
          reload={reload}
          setReload={setReload}
        />
      )}

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Notas</Accordion.Header>
          <Accordion.Body>
            {!isLoading && (
              <div className="container-lg card my-4">
                <Notes
                  student={student}
                  studentID={studentID}
                  reload={reload}
                  setReload={setReload}
                />
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Perguntas</Accordion.Header>
          <Accordion.Body>
            {!isLoading && (
              <div className="container-lg card my-4 ">
                <Questions
                  student={student}
                  studentID={studentID}
                  reload={reload}
                  setReload={setReload}
                />
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* {!isLoading && (
        <>
          <div className="container-lg card my-4">
            <Notes
              student={student}
              studentID={studentID}
              reload={reload}
              setReload={setReload}
            />
          </div>

          <div className="container-lg card my-4 ">
            <Questions
              student={student}
              studentID={studentID}
              reload={reload}
              setReload={setReload}
            />
          </div>
        </>
      )} */}
    </div>
  );
}

export default ProfilePage;
