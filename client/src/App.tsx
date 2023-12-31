import React, { lazy, Suspense } from "react";


const Home = lazy(() => import("./pages/Home"));
// @ts-ignore
const Register = lazy(() => import("./pages/Register"));
// @ts-ignore
const Login = lazy(() => import("./pages/Login"));
const Playlist = lazy(() => import("./pages/Playlist"));
const SearchBar = lazy(() => import("./components/searchbar/SearchBar"));

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout/Layout";

import UserPlaylist from "./pages/UserPlaylist";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />} errorElement={<h1>Error</h1>} path="/">
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/playlist/:playlistId" element={<Playlist />} />
            <Route
                path="/userplaylist/:playlistId"
                element={<UserPlaylist />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Route>
    )
);

const App = (): React.ReactNode => {
    return (
        <Suspense
            fallback={
                <h1 className="w-full h-screen text-2xl bg-baseDark text-textDark-200 flex items-center justify-center">
                    Loading...
                </h1>
            }
        >
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default App;
