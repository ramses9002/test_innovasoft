import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import SuspenseLoader from "../components/suspense_loader";

const LoginView = lazy(() => import("../pages/login"));
const RegisterView = lazy(() => import("../pages/register"));
const LayoutView = lazy(() => import("../layout"));
const HomeView = lazy(() => import("../pages/home"));
const ClientsView = lazy(() => import("../pages/clients"));
const AddEditClientsView = lazy(() => import("../pages/clients/add_edit_client"));
const DetailsClientsView = lazy(() => import("../pages/clients/details_client"));
const NotFound = lazy(() => import("../pages/notfound"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <SuspenseLoader>
                <LoginView />
            </SuspenseLoader>
        ),
    },
    {
        path: "/register",
        element: (
            <SuspenseLoader>
                <RegisterView />
            </SuspenseLoader>
        ),
    },
    {
        path: "/home",
        element: (
            <SuspenseLoader>
                <LayoutView />
            </SuspenseLoader>
        ),
        children: [
            {
                path: "/home",
                element: <HomeView />,
            },
            {
                path: "/home/clients",
                element: <ClientsView />,
            },
            {
                path: "/home/clients/add",
                element: <AddEditClientsView />,
            },
            {
                path: "/home/clients/edit/:idURL",
                element: <AddEditClientsView />,
            },
            {
                path: "/home/clients/details/:idURL",
                element: <DetailsClientsView />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "*",
        element: (
            <SuspenseLoader>
                <NotFound />
            </SuspenseLoader>
        ),
    },
]);

export default router;
