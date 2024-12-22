import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { messageSliceActions } from "../../store/messageSlice";
import { Grid, Typography, Avatar, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { HideImageOutlined as HideImageOutlinedIcon, Delete as DeleteIcon } from "@mui/icons-material";

const DropzoneZoneGlobal = (props) => {
    const {
        propTitle = "Subir archivo",
        propTypeFile = "imagen",
        propAcceptFile = { "image/*": [] },
        propMaxFiles = 1,
        propMultiple = false,
        propDisabled = false,
        propMaxSize = 200000,
        uploadFile,
        setUploadFile,
        propWidth = 100,
        propHeight = 100,
    } = props;
    const dispatch = useDispatch();
    const { getRootProps, getInputProps } = useDropzone({
        accept: propAcceptFile,
        maxFiles: propMaxFiles,
        multiple: propMultiple,
        disabled: propDisabled,
        maxSize: propMaxSize,
        onDrop: (acceptedFiles, rejectFiles) => {
            if (rejectFiles.length > 0) {
                dispatch(
                    messageSliceActions.showDinamicMessage({
                        shower: true,
                        type_question: 3,
                        title: `Uno o mas archivos no son válidos, deben ser tipo ${propTypeFile} con tamaño inferior ${propMaxSize / 1000} KB`,
                    })
                );
            }
            let couterId = 1;
            let arrFiles = [];
            for (const iterator of acceptedFiles) {
                arrFiles.push({
                    id: couterId,
                    preview: URL.createObjectURL(iterator),
                    file: iterator,
                });
                couterId++;
            }
            setUploadFile(arrFiles);
        },
    });

    useEffect(() => {
        return () => uploadFile.forEach((file) => URL.revokeObjectURL(file.preview));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid
            container
            sx={{
                width: "100%",
                padding: 1,
            }}
        >
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    {propTitle}
                </Typography>
            </Grid>
            <Grid
                item
                container
                xs={12}
                alignItems={"center"}
                justifyContent={"center"}
                direction={"column"}
                {...getRootProps()}
                sx={{
                    border: "3px dashed #00A4B4",
                    px: 2,
                    mb: 5,
                    minHeight: 100,
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            >
                <input {...getInputProps()} />
                <Typography>Arrastre y suelte el archivo aquí, o haga clic aquí para seleccionarlo.</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent={"center"} alignItems={"flex-start"} rowSpacing={2}>
                {uploadFile.length ? (
                    uploadFile.map((item, index) => (
                        <Grid key={index} item xs={6} md={4} direction={"row"} container justifyContent={"center"} alignItems={"flex-start"}>
                            <img
                                alt=""
                                src={item.preview}
                                style={{ width: propWidth, height: propHeight, borderRadius: 2 }}
                                // onLoad={() => {
                                //     URL.revokeObjectURL(item.preview);
                                // }}
                            />
                            <IconButton
                                onClick={() => {
                                    setUploadFile(uploadFile.filter((item2) => item2.id !== item.id));
                                }}
                                aria-label="delete"
                                color={"primary"}
                                sx={{ p: 0.5 }}
                                size="large"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    ))
                ) : (
                    <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.light, width: propWidth, height: propHeight }} variant="rounded">
                        <HideImageOutlinedIcon sx={{ width: "100%", height: "100%" }} />
                    </Avatar>
                )}
            </Grid>
        </Grid>
    );
};

export default DropzoneZoneGlobal;
