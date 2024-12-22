import { useDispatch, useSelector } from "react-redux";
import { messageSliceActions } from "../../store/messageSlice";
import { Snackbar, Alert, Slide } from "@mui/material";

const DinamicMessage = () => {
    const dinamicMessageStore = useSelector((state) => state.messageStore.dinamicMessage);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(messageSliceActions.closeDinamicMessage(false));
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="left" />;
    }

    return (
        <Snackbar
            open={dinamicMessageStore.shower}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={5000}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
        >
            <Alert
                onClose={handleClose}
                severity={dinamicMessageStore.type_question === 1 ? "success" : dinamicMessageStore.type_question === 2 ? "warning" : "error"}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {dinamicMessageStore.title}
            </Alert>
        </Snackbar>
    );
};

export { DinamicMessage };
