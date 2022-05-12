import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            Created by Guido Rial
            <i
                className="fab fa-linkedin-in"
                onClick={() =>
                    window.open(
                        "https://www.linkedin.com/in/guido-rial-275552221/",
                        "_blank"
                    )
                }
            />
            <i
                className="fab fa-github"
                onClick={() =>
                    window.open("https://github.com/GuidoRial", "_blank")
                }
            />
        </div>
    );
}

export default Footer;
