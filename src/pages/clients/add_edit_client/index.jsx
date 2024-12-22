import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ViewAddEdit from "./view_add_edit";
import { messageSliceActions } from "../../../store/messageSlice";
import { useServiceAPI } from "../../../services";
import { formatISO, parseISO } from "date-fns";
import { ImageDialog } from "../../../components/option_dialog";
import { convertToBase64FromImage, convertToImageFromBase64 } from "../../../utils";

const Add_Edit_Users = () => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const navigate = useNavigate();
    const dinamicUserStore = useSelector((state) => state.userStore);
    const dispatch = useDispatch();
    const { idURL } = useParams();
    const { axiosAPI } = useServiceAPI();
    const modeAdd = idURL === undefined || idURL === null ? true : false;
    const { register, handleSubmit, formState, setValue, control } = useForm();
    const [dateNac, setDateNac] = useState({ date: new Date(), error: false });
    const [dateAfil, setDateAfil] = useState({ date: new Date(), error: false });
    const [listIntereses, setListIntereses] = useState([]);
    const [openDialogImage, setOpenDialogImage] = useState(false);
    const [uploadFile, setUploadFile] = useState([]);

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //
    const loadDataIntereses = async () => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosAPI("get", "/api/Intereses/Listado")
            .then((response) => {
                setListIntereses(response.data);
            })
            .catch((error) => {
                if (error?.response?.data?.message) {
                    dispatch(
                        messageSliceActions.showDinamicMessage({
                            shower: true,
                            type_question: 3,
                            title: error.response.data.message,
                        })
                    );
                } else if (error?.message) {
                    dispatch(
                        messageSliceActions.showDinamicMessage({
                            shower: true,
                            type_question: 3,
                            title: error.message,
                        })
                    );
                } else {
                    dispatch(
                        messageSliceActions.showDinamicMessage({
                            shower: true,
                            type_question: 3,
                            title: "Hubo un inconveniente con la transacción",
                        })
                    );
                }
            })
            .finally(() => {
                if (modeAdd) {
                    dispatch(messageSliceActions.showTransparentLoader(false));
                } else {
                    loadDataEdit();
                }
            });
    };

    const loadDataEdit = async () => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosAPI("get", `/api/Cliente/Obtener/${idURL}`)
            .then(async (response) => {
                setValue("input_lastname", response.data.apellidos);
                setValue("input_address", response.data.direccion);
                setValue("input_ci", response.data.identificacion);
                setValue("select_interest", response.data.interesesId);
                setValue("input_name", response.data.nombre);
                setValue("input_phone_other", response.data.otroTelefono);
                setValue("input_resenn", response.data.resenaPersonal);
                setValue("select_sex", response.data.sexo);
                setValue("input_phone_cell", response.data.telefonoCelular);
                setDateNac({ date: parseISO(response.data.fNacimiento), error: false });
                setDateAfil({ date: parseISO(response.data.fAfiliacion), error: false });
                if (response.data.imagen !== "") {
                    let file_base64 = await convertToImageFromBase64(response.data.imagen);
                    setUploadFile([
                        {
                            id: 1,
                            preview: URL.createObjectURL(file_base64),
                            file: file_base64,
                        },
                    ]);
                }
            })
            .catch((error) => {
                navigate("/home/clients");
                if (error?.response?.data?.message) {
                    dispatch(
                        messageSliceActions.showDinamicMessage({
                            shower: true,
                            type_question: 3,
                            title: error.response.data.message,
                        })
                    );
                } else if (error?.message) {
                    dispatch(
                        messageSliceActions.showDinamicMessage({
                            shower: true,
                            type_question: 3,
                            title: error.message,
                        })
                    );
                } else {
                    dispatch(
                        messageSliceActions.showDinamicMessage({
                            shower: true,
                            type_question: 3,
                            title: "Hubo un inconveniente con la transacción",
                        })
                    );
                }
            })
            .finally(() => {
                dispatch(messageSliceActions.showTransparentLoader(false));
            });
    };

    const handleClickBack = () => {
        navigate("/home/clients");
    };

    const handleSubmitAction = async (dataForm) => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        let img_64 = "";
        if (uploadFile.length > 0) {
            img_64 = await convertToBase64FromImage(uploadFile[0].file);
        }

        if (modeAdd) {
            await axiosAPI("post", "/api/Cliente/Crear", {
                nombre: dataForm.input_name,
                apellidos: dataForm.input_lastname,
                identificacion: dataForm.input_ci,
                celular: dataForm.input_phone_cell,
                otroTelefono: dataForm.input_phone_other,
                direccion: dataForm.input_address,
                fNacimiento: formatISO(dateNac.date),
                fAfiliacion: formatISO(dateAfil.date),
                sexo: dataForm.select_sex,
                imagen: img_64,
                resennaPersonal: dataForm.input_resenn,
                interesFK: dataForm.select_interest,
                usuarioId: dinamicUserStore.id,
            })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 1,
                                title: "El proceso se realizó correctamente",
                            })
                        );
                        handleClickBack();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error?.response?.data?.message) {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: error.response.data.message,
                            })
                        );
                    } else if (error?.message) {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: error.message,
                            })
                        );
                    } else {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: "Hubo un inconveniente con la transacción",
                            })
                        );
                    }
                })
                .finally(() => {
                    dispatch(messageSliceActions.showTransparentLoader(false));
                });
        } else {
            await axiosAPI("post", "/api/Cliente/Actualizar", {
                id: idURL,
                nombre: dataForm.input_name,
                apellidos: dataForm.input_lastname,
                identificacion: dataForm.input_ci,
                celular: dataForm.input_phone_cell,
                otroTelefono: dataForm.input_phone_other,
                direccion: dataForm.input_address,
                fNacimiento: formatISO(dateNac.date),
                fAfiliacion: formatISO(dateAfil.date),
                sexo: dataForm.select_sex,
                imagen: img_64,
                resennaPersonal: dataForm.input_resenn,
                interesFK: dataForm.select_interest,
                usuarioId: dinamicUserStore.id,
            })
                .then((response) => {
                    if (response.status === 200) {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 1,
                                title: "El proceso se realizó correctamente",
                            })
                        );
                        handleClickBack();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error?.response?.data?.message) {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: error.response.data.message,
                            })
                        );
                    } else if (error?.message) {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: error.message,
                            })
                        );
                    } else {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: "Hubo un inconveniente con la transacción",
                            })
                        );
                    }
                })
                .finally(() => {
                    dispatch(messageSliceActions.showTransparentLoader(false));
                });
        }
    };

    const handleClickOpenDialogImage = () => {
        setOpenDialogImage(true);
    };

    useEffect(() => {
        loadDataIntereses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <>
            <ViewAddEdit
                handleClickBack={handleClickBack}
                handleSubmitAction={handleSubmitAction}
                registerHookForm={register}
                handleSubmitHookForm={handleSubmit}
                formStateHookForm={formState}
                controlHookForm={control}
                modeAdd={modeAdd}
                dateNac={dateNac}
                setDateNac={setDateNac}
                dateAfil={dateAfil}
                setDateAfil={setDateAfil}
                listIntereses={listIntereses}
                handleClickOpenDialogImage={handleClickOpenDialogImage}
                uploadFile={uploadFile}
            />
            <ImageDialog
                open={openDialogImage}
                functionClose={() => {
                    setOpenDialogImage(false);
                }}
                uploadFile={uploadFile}
                setUploadFile={setUploadFile}
            />
        </>
    );
};

export default Add_Edit_Users;
