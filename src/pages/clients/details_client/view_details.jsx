import { Grid, Paper, Button, Typography, Divider, Avatar } from "@mui/material";

import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const View_Details = (props) => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const { handleClickBack, dataUser } = props;

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Paper elevation={10} sx={{ padding: 2, width: "100%" }}>
            <Grid container rowSpacing={2}>
                <Grid item container xs={12} rowSpacing={{ xs: 2, md: 0 }}>
                    <Grid item container xs={12} md={6} alignItems={"center"}>
                        <Avatar src={dataUser.imagen} alt="" sx={{ width: 100, height: 100, mr: 1 }} />
                        <Typography variant="h5">Detalles del cliente</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems={"center"} justifyContent={{ xs: "flex-start", md: "flex-end" }} columnGap={1}>
                        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />} onClick={handleClickBack}>
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item container xs={12} rowSpacing={2} columnSpacing={2}>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Nombre</Typography>
                        <Typography variant="body1">{dataUser.nombre}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Apellidos</Typography>
                        <Typography variant="body1">{dataUser.apellidos}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Identificación</Typography>
                        <Typography variant="body1">{dataUser.identificacion}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Teléfono celular</Typography>
                        <Typography variant="body1">{dataUser.telefonoCelular}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Otro teléfono</Typography>
                        <Typography variant="body1">{dataUser.otroTelefono}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Fecha de nacimiento</Typography>
                        <Typography variant="body1">{dataUser.fNacimiento}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Fecha de afilición</Typography>
                        <Typography variant="body1">{dataUser.fAfiliacion}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Sexo</Typography>
                        <Typography variant="body1">{dataUser.sexo === "M" ? "Masculino" : "Femenino"}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Dirección</Typography>
                        <Typography variant="body1">{dataUser.direccion}</Typography>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} sm={6} md={6} lg={4} direction={"column"}>
                        <Typography variant="h6">Reseña</Typography>
                        <Typography variant="body1">{dataUser.resenaPersonal}</Typography>
                        <Divider />
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default View_Details;
