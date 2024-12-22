import ViewRegister from "./view_register";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageSliceActions } from "../../store/messageSlice";
import { useServiceAPI } from "../../services";

const Register = () => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const { register, handleSubmit, formState } = useForm();
    const dispatch = useDispatch();
    const { axiosWithoutBearerAPI } = useServiceAPI();
    const navigate = useNavigate();

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //
    const handleSubmitRegister = async (dataForm) => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosWithoutBearerAPI("post", "/api/Authenticate/register", {
            username: dataForm.input_user,
            email: dataForm.input_email,
            password: dataForm.input_pass,
        })
            .then((response) => {
                if (response?.data?.status) {
                    if (response.data.status === "Success") {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 1,
                                title: "Usuario creado correctamente. Será redirigido a la página de iniciar sesión",
                            })
                        );
                        setTimeout(() => {
                            navigate("/");
                        }, 6000);
                    } else {
                        dispatch(
                            messageSliceActions.showDinamicMessage({
                                shower: true,
                                type_question: 3,
                                title: response.data.message,
                            })
                        );
                    }
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

    const navToLogin = (e) => {
        e.preventDefault();
        navigate("/");
    };
    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <ViewRegister
            handleSubmitRegister={handleSubmitRegister}
            registerHookForm={register}
            handleSubmitHookForm={handleSubmit}
            formStateHookForm={formState}
            navToLogin={navToLogin}
        />
    );
};

export default Register;
