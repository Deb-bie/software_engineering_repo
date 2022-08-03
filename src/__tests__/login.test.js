import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import {BrowserRouter as Router} from 'react-router-dom';

import Navbar from "../components/navbar/Navbar.jsx";
import Login from "../pages/login/Login.jsx";



describe("Login render Page", () => {
    const loading = true;


    it('renders the Login page', () => {
      render(
        <Router>
            <Login  />
        </Router>
      );
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  
    it('render 2 input components', () => {
      const {getByPlaceholderText} = render(
        <Router>
            <Login  />
        </Router>
      );
      expect(getByPlaceholderText(/username/i)).toBeInTheDocument();
      expect(getByPlaceholderText(/password/i)).toBeInTheDocument();
    });
  
    it('renders a submit button', () => {
      render(
        <Router>
            <Login loading={true}  />
        </Router>
      );

    //   const logins = screen.getAllByText(/login/i)
    //   const loginButton = logins[1]


      expect(screen.getByRole('button', {name: "Submit"}));
    //   expect(getByText("Login"))[1].toBeInTheDocument();
    });
});