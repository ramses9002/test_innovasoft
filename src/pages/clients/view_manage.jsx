import { Grid, Typography, Button, Divider, TextField, IconButton, Paper } from "@mui/material";
import { TableGlobal } from "../../components/table_manage_global";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    Info as InfoIcon,
} from "@mui/icons-material";

const View_Nomenclators = (props) => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const {
        handleClickAnnadir,
        handleClickBack,
        dataTable,
        handleClickEdit,
        handleClickDelete,
        handleClickDetails,
        handleSubmitSearch,
        registerHookForm,
        handleSubmitHookForm,
    } = props;
    const actionMenuItems = [
        {
            key: 1,
            onclick: (row) => {
                handleClickEdit(row.id);
            },
            icons: <EditIcon />,
            text: "Editar",
        },
        {
            key: 2,
            onclick: (row) => {
                handleClickDelete(row.id);
            },
            icons: <DeleteIcon />,
            text: "Eliminar",
        },
        {
            key: 3,
            onclick: (row) => {
                handleClickDetails(row.id);
            },
            icons: <InfoIcon />,
            text: "Detalles",
        },
    ];

    const columnsTable = [
        {
            accessorKey: "id",
            header: "Ids",
        },
        {
            accessorKey: "identificacion",
            header: "Identificacion",
        },
        {
            accessorKey: "complete_name",
            header: "Nombre Completo",
        },
    ];

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Paper elevation={10} sx={{ padding: 2, width: "100%" }}>
            <Grid container rowGap={2}>
                <Grid item xs={12} container alignItems={"center"} justifyContent={"center"} rowSpacing={{ xs: 2, md: 0 }}>
                    <Grid item xs={12} md={6} container alignItems={"center"}>
                        <Typography variant="h5">Consulta de Clientes</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} container alignItems={"center"} justifyContent={{ xs: "flex-start", md: "flex-end" }} columnGap={1}>
                        <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={handleClickAnnadir}>
                            Agregar
                        </Button>
                        <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />} onClick={handleClickBack}>
                            Regresar
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitHookForm(handleSubmitSearch)} autoComplete="off">
                        <Grid item container xs={12} columnSpacing={{ xs: 0, md: 1 }} rowSpacing={{ xs: 1, md: 0 }}>
                            <Grid item container xs={12} md={5} justifyContent={"center"} alignItems={"center"}>
                                <TextField
                                    {...registerHookForm("input_name")}
                                    label="Nombre"
                                    variant="outlined"
                                    placeholder={"Insertar nombre"}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item container xs={12} md={5} justifyContent={"center"} alignItems={"center"}>
                                <TextField
                                    {...registerHookForm("input_ci")}
                                    label="Identificacion"
                                    variant="outlined"
                                    placeholder={"Insertar identificacion"}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item container xs={12} md={2} justifyContent={{ xs: "flex-end", md: "flex-start" }}>
                                <IconButton
                                    aria-label="buscar"
                                    size="large"
                                    type="submit"
                                    sx={{ width: 60, height: 60, background: (theme) => theme.palette.secondary.light }}
                                >
                                    <SearchIcon fontSize="inherit" sx={{ fontSize: 30 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <TableGlobal data={dataTable} datacolumns={columnsTable} actionMenuItems={actionMenuItems} />
            </Grid>
        </Paper>
    );
};

export default View_Nomenclators;
