import { useState } from "react";
import ViewLogin from "./view_login";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageSliceActions } from "../../store/messageSlice";
import { userSliceActions } from "../../store/userSlice";
import { useServiceAPI } from "../../services";
import { UpdateToken } from "../../utils";

const Login = () => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const dinamicUserStore = useSelector((state) => state.userStore);
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            input_user: dinamicUserStore.password !== "" ? dinamicUserStore.username : "",
            input_pass: "",
        },
    });
    const dispatch = useDispatch();
    const { axiosWithoutBearerAPI } = useServiceAPI();
    const navigate = useNavigate();
    const [checkRemember, setCheckRemember] = useState(dinamicUserStore.password !== "" ? true : false);

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //
    const handleSubmitLogin = async (dataForm) => {
        dispatch(messageSliceActions.showTransparentLoader(true));
        await axiosWithoutBearerAPI("post", "api/Authenticate/login", {
            username: dataForm.input_user,
            password: dataForm.input_pass,
        })
            .then((response) => {
                if (response?.data?.token) {
                    UpdateToken(response.data.token, response.data.expiration);
                    dispatch(
                        userSliceActions.authUser({
                            id: response.data.userid,
                            username: response.data.username,
                            password: checkRemember ? dataForm.input_pass : "",
                        })
                    );
                    navigate("/home");
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
                dispatch(
                    messageSliceActions.showDinamicMessage({
                        shower: true,
                        type_question: 3,
                        title: "Credenciales no válidas",
                    })
                );
            })
            .finally(() => {
                dispatch(messageSliceActions.showTransparentLoader(false));
            });
    };

    const navToRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    };

    const handleCheckRemember = (e) => {
        setCheckRemember(e.target.checked);
    };

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <ViewLogin
            handleSubmitLogin={handleSubmitLogin}
            registerHookForm={register}
            handleSubmitHookForm={handleSubmit}
            formStateHookForm={formState}
            navToRegister={navToRegister}
            checkRemember={checkRemember}
            handleCheckRemember={handleCheckRemember}
        />
    );
};

export default Login;
