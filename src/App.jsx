import React from "react";
import "./App.css";
import SignIn from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import GuestUserLayout from "./layouts/GuestUserLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GuestUserLayout />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <SignIn />,
            },
        ],
    },
]);

function App() {
    const defaultTheme = createTheme({
        palette: {
            primary: {
                light: "#706bf9",
                main: "white",
                themeMain: "#706bf9",
                dark: "#706bf9",
                contrastText: "#fff",
            },
            secondary: {
                light: "#ff7961",
                main: "#f44336",
                dark: "#ba000d",
                contrastText: "#000",
            },
        },
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={defaultTheme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
