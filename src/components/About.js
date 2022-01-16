import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>Version 1.0.0</h4>
      <h5>
        This is a web application created by NUS undergrad Chee Jia Le during
        winter break 2021.
      </h5>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default About;
