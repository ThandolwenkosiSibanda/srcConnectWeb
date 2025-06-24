import { connect } from "react-redux";

const HomePage = () => {
  return (
    <>
      <main className="main"></main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {})(HomePage);
