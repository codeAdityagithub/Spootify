import React, { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Playlist = lazy(() => import("./pages/Playlist"));

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Search from "./pages/Search";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />} errorElement={<h1>Error</h1>} path="/">
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Route>
    )
);

const App = (): React.ReactNode => {
    return (
        <Suspense
            fallback={
                <h1 className="w-full h-screen text-6xl flex items-center justify-center">
                    Loading...
                </h1>
            }
        >
            <RouterProvider router={router} />
        </Suspense>
    );
};

export default App;
