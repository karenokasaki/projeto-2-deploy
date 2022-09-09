import Alert from "react-bootstrap/Alert";

function ErrorPage() {
  return (
    <div
      style={{ height: "60vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Alert variant="dark">
        <Alert.Heading>ERROR 404</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This
          example text is going to run a bit longer so that you can see how
          spacing within an alert works with this kind of content.
        </p>
        <hr />
        <p className="mb-0">Page not found</p>
      </Alert>
    </div>
  );
}

export default ErrorPage;
