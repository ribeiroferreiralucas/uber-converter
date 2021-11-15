import React from "react";
import { Container, Row } from "react-bootstrap";
import "./App.css";
import RecipeProporsionalResizer from "./tools/RecipeProporsinalResizer/RecipeProporsinalResizer";

interface Tool {
  name: string;
  description: string;
  component: React.FC;
}

export const tools: Tool[] = [
  {
    name: "Recipe Proporsinal Resizer",
    description: "desc",
    component: RecipeProporsionalResizer,
  },
];
console.log("exported", tools);

function App() {
  return (
    <Container>
      <h1>Uber Converter</h1>

      {tools.map((tool) => (
        <Row>
          <h2>{tool.name}</h2>
          <label>{tool.description}</label>
          <tool.component />
        </Row>
      ))}
    </Container>
  );
}

export default App;
