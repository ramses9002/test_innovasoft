import { Grid, Typography } from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

const NotFound = () => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Grid
            container
            sx={{
                minHeight: "100vh",
            }}
        >
            <Grid xs={12} container alignItems={"center"} justifyContent={"center"}>
                <WarningIcon color="primary" sx={{ fontSize: 200 }} />
                <Typography variant="h1" align="center" color="primary" sx={{ fontSize: 200 }}>
                    404
                </Typography>
            </Grid>
            <Grid xs={12} container  justifyContent={"center"}>
                <Typography variant="h2" align="center">
                    Oops... Página no encontrada!
                </Typography>
            </Grid>
        </Grid>
    );
};

export default NotFound;
