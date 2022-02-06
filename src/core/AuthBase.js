import React from "react";
import Menu from "./Menu";

const AuthBase = ({
  className = "bg-dark text-white p-4",
  children
}) => {
	return (
		<>
			<Menu />
	    <div className="container-fluid p-0 text-white" style={{ marginTop: "56px" }}>
	       <div className={className}>{children}</div>
	    </div>
	    <footer className="footer bg-dark mt-auto py-3">
	      <div className="container text-white-100 text-center">
	        <p>If you got any questions, feel free to reach out!</p>
	        <button className="btn btn-outline-secondary btn-lg">Contact us</button>
	      </div>
	      <div className="container text-center my-3">
	        <span className="text-muted">
	          Copyright © {new Date().getFullYear()} Shopyle
	        </span>
	      </div>
	    </footer>
		</>
	);
};

export default AuthBase;