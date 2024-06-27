import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        padding: 0;
        background-color: var(--theme);
    }

    html[data-theme=light] {
        background-color: white;
        color: black;
    }

    html[data-theme=dark] {
        background-color: black;
        color: white;

    }
`;

export default GlobalStyles;
