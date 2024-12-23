import { Grid, Typography, Paper } from "@mui/material";

const Home = () => {
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
        <Paper elevation={10} sx={{ padding: 2, width: "100%" }}>
            <Grid
                container
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    minHeight: "100vh",
                }}
            >
                <Typography variant="h2" align="center">
                    Bienvenido
                </Typography>
            </Grid>
        </Paper>
    );
};

export default Home;
