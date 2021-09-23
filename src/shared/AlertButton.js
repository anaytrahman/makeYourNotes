import CloseIcon from "@material-ui/icons/Close";
const AlertButton = () => {
  return (
    <>
      <div
        className="mt-3 alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Empty Todo! </strong> Please Enter Your text here.
       
      </div>
    </>
  );
};

export default AlertButton;
