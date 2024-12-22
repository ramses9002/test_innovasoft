import { Suspense } from "react";
import { GlobalLoader } from "../loaders";

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Suspense_Loader = ({ children }) => <Suspense fallback={<GlobalLoader />}>{children}</Suspense>;

export default Suspense_Loader;
