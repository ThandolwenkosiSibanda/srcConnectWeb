

const ErrorMessage = ({
  message = "Failed to load content. Please try again.",
}) => {
  return (
    <div className="alert alert-danger text-center my-3" role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
