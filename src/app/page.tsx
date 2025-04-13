import React from "react";
import { Button, Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Postworthee
      </Typography>
      <Typography>
        This is a skeleton using Material UI with Next.js and TypeScript.
      </Typography>
      <Button variant="contained" color="primary" style={{ marginTop: "1rem" }}>
        Click Me
      </Button>
    </Container>
  );
}
