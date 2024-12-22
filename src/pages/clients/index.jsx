import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import ViewManage from "./view_manage";
import { messageSliceActions } from "../../store/messageSlice";
import { useServiceAPI } from "../../services";
import { OptionDialog } from "../../components/option_dialog";

const Clients = (props) => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { axiosAPI } = useServiceAPI();
    const dinamicUserStore = useSelector((state) => state.userStore);
    const [dataTable, setDataTable] = useState([]);
    const { register, handleSubmit } = useForm();
    const [openDialog, setOpenDialog] = useState(false);
    const [idDelete, setIdDelete] = useState(0);

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //
    const buildDataTable = async (nombre = "", identificacion = "") => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosAPI("post", "/api/Cliente/Listado", {
            usuarioId: dinamicUserStore.id,
            nombre: nombre,
            identificacion: identificacion,
        })
            .then((response) => {
                let aux = [];
                for (const element of response.data) {
                    aux.push({
                        id: element.id,
                        identificacion: element.identificacion,
                        complete_name: element.nombre + " " + element.apellidos,
                    });
                }
                setDataTable(aux);
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
                dispatch(messageSliceActions.showTransparentLoader(false));
            });
    };

    const handleClickAnnadir = () => {
        navigate("/home/clients/add");
    };

    const handleClickBack = () => {
        navigate("/home");
    };

    const handleClickEdit = (id) => {
        navigate(`/home/clients/edit/${id}`);
    };

    const handleClickDelete = (id) => {
        setOpenDialog(true);
        setIdDelete(id);
    };

    const handleClickDetails = (id) => {
        navigate(`/home/clients/details/${id}`);
    };

    const functionModalDelete = async () => {
        setOpenDialog(false);
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosAPI("delete", `/api/Cliente/Eliminar/${idDelete}`)
            .then((response) => {
                console.log(response);
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
                dispatch(messageSliceActions.showTransparentLoader(false));
            });
    };

    const handleSubmitSearch = async (dataForm) => {
        buildDataTable(dataForm.input_name, dataForm.input_ci);
    };

    useEffect(() => {
        buildDataTable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Grid container>
            <ViewManage
                handleClickAnnadir={handleClickAnnadir}
                handleClickBack={handleClickBack}
                dataTable={dataTable}
                handleClickEdit={handleClickEdit}
                handleClickDelete={handleClickDelete}
                handleClickDetails={handleClickDetails}
                handleSubmitSearch={handleSubmitSearch}
                registerHookForm={register}
                handleSubmitHookForm={handleSubmit}
            />
            <OptionDialog
                open={openDialog}
                title={"Advertencia!"}
                text={"¿Desea eliminar este usuario?"}
                functionAcept={functionModalDelete}
                functionCancel={() => {
                    setOpenDialog(false);
                }}
            />
        </Grid>
    );
};

export default Clients;
