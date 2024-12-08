import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --success-color: #2ecc71;
    --danger-color: #e74c3c;
    --warning-color: #f1c40f;
    --background-color: #f5f6fa;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: var(--background-color);
  }

  button {
    cursor: pointer;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: bold;
  }
`;

export default GlobalStyles; 