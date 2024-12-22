import { useState } from "react";
import { Grid, Paper, Typography, Link, InputAdornment, IconButton, Button, TextField } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
import { cutInputField } from "../../utils";

const View_Register = (props) => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const { handleSubmitRegister, registerHookForm, handleSubmitHookForm, formStateHookForm, navToLogin } = props;
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
                        Registro
                    </Typography>
                </Grid>
                <form onSubmit={handleSubmitHookForm(handleSubmitRegister)} autoComplete="off" style={{ paddingTop: 20, paddingBottom: 20 }}>
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
                                label="Nombre Usuario *"
                                variant="outlined"
                                placeholder={"Insertar usuario"}
                                helperText={"input_user" in formStateHookForm.errors && "Debe insertar 2 o mas caracteres"}
                                error={"input_user" in formStateHookForm.errors}
                                fullWidth
                            />
                        </Grid>
                        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                {...registerHookForm("input_email", {
                                    required: true,
                                    minLength: 5,
                                    pattern:
                                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/,
                                    onChange: (e) => {
                                        cutInputField(e, 100);
                                    },
                                })}
                                label="Dirección de correo *"
                                variant="outlined"
                                placeholder={"Insertar correo"}
                                helperText={"input_email" in formStateHookForm.errors && "El correo no es válido"}
                                error={"input_email" in formStateHookForm.errors}
                                fullWidth
                            />
                        </Grid>
                        <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                            <TextField
                                {...registerHookForm("input_pass", {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&^]{8,}$/,
                                    onChange: (e) => {
                                        cutInputField(e, 20);
                                    },
                                })}
                                label="Contraseña *"
                                variant="outlined"
                                placeholder={"Insertar contraseña"}
                                helperText={
                                    "input_pass" in formStateHookForm.errors &&
                                    "Debe ser mayor de que 8, tener al menos una mayúscula, minúscula, número y caracter especial"
                                }
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
                                REGISTRARME
                            </Button>
                        </Grid>
                        <Grid item container xs={12} alignItems={"center"}>
                            <Link
                                color={"primary"}
                                href="#"
                                onClick={(e) => {
                                    navToLogin(e);
                                }}
                            >
                                <Typography variant="h6" color={"primary.main"}>
                                    ¿Ya tienes cuenta? Inicie sesión
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default View_Register;
