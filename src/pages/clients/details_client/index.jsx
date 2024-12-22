import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ViewDetails from "./view_details";
import { messageSliceActions } from "../../../store/messageSlice";
import { useServiceAPI } from "../../../services";
import { format, parseISO } from "date-fns";

const Details_Client = () => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { idURL } = useParams();
    const { axiosAPI } = useServiceAPI();
    const [dataUser, setDataUser] = useState(null);

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //
    const loadDataUser = async () => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosAPI("get", `/api/Cliente/Obtener/${idURL}`)
            .then((response) => {
                response.data.fNacimiento = format(parseISO(response.data.fNacimiento), "dd-MM-yyyy");
                response.data.fAfiliacion = format(parseISO(response.data.fAfiliacion), "dd-MM-yyyy");
                setDataUser(response.data);
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

    useEffect(() => {
        loadDataUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return dataUser && <ViewDetails handleClickBack={handleClickBack} dataUser={dataUser} />;
};

export default Details_Client;
