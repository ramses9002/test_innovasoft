import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import ViewDropZone from "../drop_zone_global";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const OptionDialog = (props) => {
    const { open, title, text, functionAcept, functionCancel } = props;

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">{text}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={functionAcept}>Aceptar</Button>
                <Button onClick={functionCancel}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
};

const ImageDialog = (props) => {
    const { open, functionClose, uploadFile, setUploadFile } = props;

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <ViewDropZone propTitle={"Subir imagen de usuario"} uploadFile={uploadFile} setUploadFile={setUploadFile} />
            </DialogContent>
            <DialogActions>
                <Button onClick={functionClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export { OptionDialog, ImageDialog };
