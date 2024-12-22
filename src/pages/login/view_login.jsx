import { useState } from "react";
import { Grid, Paper, Typography, Link, InputAdornment, IconButton, Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
import { cutInputField } from "../../utils";

const View_Login = (props) => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const { handleSubmitLogin, registerHookForm, handleSubmitHookForm, formStateHookForm, navToRegister, checkRemember, handleCheckRemember } = props;
    const [showPassword, setShowPassword] = useState(false);

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Grid
            container
            alignItems={"center"}
            sx={{
                minHeight: "100vh",
                background: "#FFFFFF",
                py: { xs: 5 },
            }}
        >
            <Paper
                elevation={15}
                sx={{
                    padding: { xs: 2, sm: 4 },
                    width: { xs: "90%", sm: "70%", md: "50%", lg: "35%", xl: "30%" },
                    mx: "auto",
                    background: "#eceff1",
                }}
            >
                <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                    <Typography variant="h5" align="center">
                        Iniciar Sesión
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmitHookForm(handleSubmitLogin)} autoComplete="off" style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Grid item container xs={12} rowSpacing={2}>
                        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                {...registerHookForm("input_user", {
                                    required: true,
                                    minLength: 2,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Usuario *"
                                variant="outlined"
                                placeholder={"Insertar usuario"}
                                helperText={"input_user" in formStateHookForm.errors && "Debe insertar 2 o mas caracteres"}
                                error={"input_user" in formStateHookForm.errors}
                                fullWidth
                            />
                        </Grid>
                        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                {...registerHookForm("input_pass", {
                                    required: true,
                                    minLength: 2,
                                    onChange: (e) => {
                                        cutInputField(e, 20);
                                    },
                                })}
                                label="Contraseña *"
                                variant="outlined"
                                placeholder={"Insertar contraseña"}
                                helperText={"input_pass" in formStateHookForm.errors && "Debe insertar 2 o mas caracteres"}
                                error={"input_pass" in formStateHookForm.errors}
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => {
                                                    setShowPassword(!showPassword);
                                                }}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon color={"secondary"} /> : <VisibilityIcon color={"secondary"} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                            <Button variant="contained" type="submit" fullWidth color="primary">
                                INICIAR SESIÓN
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid item container xs={12}>
                    <FormControlLabel control={<Checkbox checked={checkRemember} onChange={handleCheckRemember} />} label="Recuérdame" />
                </Grid>
                <Grid item container xs={12} alignItems={"center"}>
                    <Link
                        color={"primary"}
                        href="#"
                        onClick={(e) => {
                            navToRegister(e);
                        }}
                    >
                        <Typography variant="h6" color={"primary.main"}>
                            ¿No tienes cuenta? Regístrese
                        </Typography>
                    </Link>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default View_Login;
