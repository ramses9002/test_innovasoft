import { Grid, TextField, Paper, Button, IconButton, Typography, Divider, Avatar } from "@mui/material";
import { Controller } from "react-hook-form";
import { cutInputField } from "../../../utils";
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { MenuItemPrimary } from "../../../components/menu_item_global";
import { DatePickerGlobal } from "../../../components/date_picker_global";

const View_Add_Edit = (props) => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const {
        handleClickBack,
        handleSubmitAction,
        registerHookForm,
        handleSubmitHookForm,
        formStateHookForm,
        controlHookForm,
        modeAdd,
        dateNac,
        setDateNac,
        dateAfil,
        setDateAfil,
        listIntereses,
        handleClickOpenDialogImage,
        uploadFile,
    } = props;

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Paper elevation={10} sx={{ padding: 2, width: "100%" }}>
            <form onSubmit={handleSubmitHookForm(handleSubmitAction)} autoComplete="off">
                <Grid container rowSpacing={2}>
                    <Grid item container xs={12} rowSpacing={{ xs: 2, md: 0 }}>
                        <Grid item container xs={12} md={6} alignItems={"center"}>
                            <IconButton onClick={handleClickOpenDialogImage} aria-label="buscar" size="large" sx={{ width: 90, height: 90 }}>
                                <Avatar src={uploadFile.length === 0 ? "" : uploadFile[0].preview} alt="" sx={{ width: 80, height: 80 }} />
                            </IconButton>
                            <Typography variant="h5">Mantenimiento de Clientes</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} container alignItems={"center"} justifyContent={{ xs: "flex-start", md: "flex-end" }} columnGap={1}>
                            <Button variant="contained" color="secondary" type="submit" startIcon={<SaveIcon />}>
                                Guardar
                            </Button>
                            <Button variant="contained" color="secondary" startIcon={<ArrowBackIcon />} onClick={handleClickBack}>
                                Regresar
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12} rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TextField
                                {...registerHookForm("input_ci", {
                                    required: true,
                                    minLength: 2,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Identificación *"
                                variant="outlined"
                                placeholder={"Insertar identificación"}
                                helperText={"input_ci" in formStateHookForm.errors && "Debe insertar 2"}
                                error={"input_ci" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TextField
                                {...registerHookForm("input_name", {
                                    required: true,
                                    minLength: 2,
                                    pattern: /^[A-Za-z ÁÉÍÓÚÑÄËÏÖÜáéíóúñäëïöü]+$/i,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Nombre *"
                                variant="outlined"
                                placeholder={"Insertar nombre"}
                                helperText={"input_name" in formStateHookForm.errors && "Debe insertar 2 o mas caracteres"}
                                error={"input_name" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TextField
                                {...registerHookForm("input_lastname", {
                                    required: true,
                                    minLength: 2,
                                    pattern: /^[A-Za-z ÁÉÍÓÚÑÄËÏÖÜáéíóúñäëïöü]+$/i,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Apellidos *"
                                variant="outlined"
                                placeholder={"Insertar apellidos"}
                                helperText={"input_lastname" in formStateHookForm.errors && "Debe insertar 2 o mas caracteres"}
                                error={"input_lastname" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Controller
                                name="select_sex"
                                control={controlHookForm}
                                defaultValue={"M"}
                                render={({ field }) => (
                                    <TextField
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        label="Género"
                                        variant="outlined"
                                        placeholder={"Seleccionar el género"}
                                        fullWidth
                                        select
                                    >
                                        <MenuItemPrimary value={"M"}>Masculino</MenuItemPrimary>
                                        <MenuItemPrimary value={"F"}>Femenino</MenuItemPrimary>
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <DatePickerGlobal
                                label={"Fecha de Nacimiento"}
                                value={dateNac}
                                setValue={setDateNac}
                                minDate={new Date("1900-01-01")}
                                maxDate={new Date()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <DatePickerGlobal
                                label={"Fecha de Afiliación"}
                                value={dateAfil}
                                setValue={setDateAfil}
                                minDate={new Date("1900-01-01")}
                                maxDate={new Date()}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TextField
                                {...registerHookForm("input_phone_cell", {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^[0-9]+$/i,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Teléfono Celular *"
                                variant="outlined"
                                placeholder={"Insertar teléfono"}
                                helperText={"input_phone_cell" in formStateHookForm.errors && "Debe insertar 8 o mas caracteres númericos"}
                                error={"input_phone_cell" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TextField
                                {...registerHookForm("input_phone_other", {
                                    required: true,
                                    minLength: 8,
                                    pattern: /^[0-9]+$/i,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Teléfono Otro *"
                                variant="outlined"
                                placeholder={"Insertar teléfono"}
                                helperText={"input_phone_other" in formStateHookForm.errors && "Debe insertar 8 o mas caracteres númericos"}
                                error={"input_phone_other" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <Controller
                                name="select_interest"
                                control={controlHookForm}
                                defaultValue={0}
                                rules={{ required: true, validate: (value) => value !== 0 }}
                                render={({ field }) => (
                                    <TextField
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                        label="Interés"
                                        variant="outlined"
                                        placeholder={"Seleccionar el interés"}
                                        helperText={"select_interest" in formStateHookForm.errors && "El campo no es válido"}
                                        error={"select_interest" in formStateHookForm.errors}
                                        fullWidth
                                        select
                                    >
                                        <MenuItemPrimary value={0}>Seleccione</MenuItemPrimary>
                                        {listIntereses.map((item) => (
                                            <MenuItemPrimary key={item.id} value={item.id}>
                                                {item.descripcion}
                                            </MenuItemPrimary>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...registerHookForm("input_address", {
                                    required: true,
                                    minLength: 8,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Dirección *"
                                variant="outlined"
                                placeholder={"Insertar dirección"}
                                helperText={"input_address" in formStateHookForm.errors && "Debe insertar 8 o mas caracteres"}
                                error={"input_address" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                {...registerHookForm("input_resenn", {
                                    required: true,
                                    minLength: 8,
                                    onChange: (e) => {
                                        cutInputField(e, 50);
                                    },
                                })}
                                label="Reseña *"
                                variant="outlined"
                                placeholder={"Insertar reseña"}
                                helperText={"input_resenn" in formStateHookForm.errors && "Debe insertar 8 o mas caracteres"}
                                error={"input_resenn" in formStateHookForm.errors}
                                InputLabelProps={modeAdd ? {} : { shrink: true }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default View_Add_Edit;
