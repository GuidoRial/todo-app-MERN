type styleOfLinks = {
    textDecoration: string;
    color: string;
    fontWeight: string;
};

export const linkStyle: styleOfLinks = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
};

export const clearInputs = (): void => {
    let allInputs = document.querySelectorAll("input");
    Array.from(allInputs).forEach((input) => {
        input.value = "";
    });
};
