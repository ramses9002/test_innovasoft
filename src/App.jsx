import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import router from "./routes";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { esES } from "@mui/x-date-pickers/locales";
import { es } from "date-fns/locale/es";
import theme from "./theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { DinamicMessage } from "./components/alert_message_global";
import { TransparentLoader } from "./components/loaders";

const App = () => {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={es}
            localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
                <DinamicMessage />
                <TransparentLoader />
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;
