import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from "../components/navbar/Navbar.jsx";

test("renders the navbar", () => {
  render(
    <Router>
        <Navbar />
    </Router>
  );

  expect(screen.getByRole("heading"));
  fireEvent.click(screen.getByText('Registe'))
  fireEvent.click(screen.getByText('Login'))
  expect(screen.getByRole('button', {name: "Registe"})).not.toBeDisabled();
  expect(screen.getByRole('button', {name: "Login"})).not.toBeDisabled();

});


test("rendering the register button to the register page", async () => {
    render(
      <Router>
          <Navbar />
      </Router>
    );
  
    expect(screen.getByRole("heading")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Registe"));
    // expect(screen.getByText("Register"));

  
});


test("rendering the login button to the login page", async () => {
    render(
      <Router>
          <Navbar />
      </Router>
    );
  
    expect(screen.getByRole("heading")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: "Login"}));
    expect(screen.getByText(/Login/)).toBeInTheDocument();

  
});


test("rendering the Register page", async () => {
    render(
      <Router>
          <Navbar />
      </Router>
    );
  
    expect(screen.getByRole("heading")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: "Login"}));
    expect(screen.getByText(/Login/)).toBeInTheDocument();

  
});





























































































































































































