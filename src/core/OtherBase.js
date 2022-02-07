import React from "react";
import Menu from "./Menu";

const OtherBase = ({
	className = "bg-dark text-white pt-4 pb-4",
	showCopywrite = true,
	children,
}) => {
	return (
		<>
			<Menu />
			<div
				className="container text-white"
				style={{ marginTop: "56px" }}
			>
				<div className={className}>{children}</div>
			</div>
			{showCopywrite && (
				<footer className="footer bg-dark mt-auto py-3">
					<div className="container text-white-100 text-center ">
						<p>If you got any questions, feel free to reach out!</p>
						<button className="btn btn-outline-secondary btn-lg">
							Contact us
						</button>
					</div>
					<div className="container text-center my-3">
						<span className="text-muted">
							Copyright © {new Date().getFullYear()} Shopyle
						</span>
					</div>
				</footer>
			)}
		</>
	);
};

export default OtherBase;
