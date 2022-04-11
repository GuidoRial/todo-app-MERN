import React from "react";
import "./Footer.css"

function Footer() {
    const openGithub = function () {
        window.open("https://github.com/GuidoRial", "_blank");
    };

    const openLinkedin = function () {
        window.open(
            "https://www.linkedin.com/in/guido-rial-275552221/",
            "_blank"
        );
    };
    return (
        <div className="footer">
            Created by Guido Rial
            <i className="fab fa-linkedin-in" onClick={openLinkedin} />
            <i className="fab fa-github" onClick={openGithub} />
        </div>
    );
}

export default Footer;
