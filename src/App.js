import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CreateUserPage from "./pages/CreateUserPage";
import navImg from "./assets/4854004.png";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from 'react-hot-toast';

function App() {
  //INFORMAÇÕES QUE PODEM SER COMPARTILHADAS POR VÁRIAS PAGINAS

  return (
    <>
      <nav className="navbar shadow-sm">
        <Link to="/" className="text-decoration-none ms-5 fs-1 text-reset">
          Ironhackers
        </Link>

        <Link to="/" className="text-decoration-none ms-5 fs-1 text-reset">
          <img src={navImg} alt="nav" height={110} />
        </Link>
      </nav>
      <div className="App container-xl">
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/students/:studentID" element={<ProfilePage />} />

          <Route path="/create-user" element={<CreateUserPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <footer className="footer">Turma 85 Web Dev Full Time</footer>
    </>
  );
}

export default App;
