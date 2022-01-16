import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1 style={headingStyle}>{title}</h1>
      {/* <h1>{title}</h1> */}
      {location.pathname === "/" && (
        <Button
          color={showAdd ? "#BC011B" : "#5C7B45"}
          text={showAdd ? "Close" : "Add Dream"}
          onClick={onAdd}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Dream Journal",
};

Header.propTypes = {
  title: PropTypes.string,
};

//css in JS
const headingStyle = {
  color: "black",
  fontSize: "30px",
  // backgroundColor: "black",
};
export default Header;
