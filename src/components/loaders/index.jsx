import { Grid, LinearProgress, Backdrop, alpha, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const GlobalLoader = () => {
    return (
        <Backdrop
            open={true}
            sx={{ color: "#fff", background: (theme) => alpha(theme.palette.primary.dark, 1), zIndex: (theme) => theme.zIndex.drawer + 101 }}
        >
            <Grid container rowSpacing={5}>
                <Grid item xs={12} container alignItems={"center"} justifyContent={"center"}>
                    <LinearProgress color="inherit" sx={{ width: 260, height: 10 }} />
                </Grid>
                <Grid container item xs={12} alignItems={"center"} justifyContent={"center"}>
                    <Typography variant="h5" align="center" sx={{color:"#FFFFFF"}}>
                        UN MOMENTO POR FAVOR...
                    </Typography>
                </Grid>
            </Grid>
        </Backdrop>
    );
};

const TransparentLoader = () => {
    const dinamicLoaderStore = useSelector((state) => state.messageStore);

    return (
        <Backdrop
            open={dinamicLoaderStore.transparentLoader}
            sx={{ color: "#fff", background: (theme) => alpha(theme.palette.primary.dark, 0.8), zIndex: (theme) => theme.zIndex.drawer + 101 }}
        >
            <Grid container rowSpacing={5}>
                <Grid item xs={12} container alignItems={"center"} justifyContent={"center"}>
                    <LinearProgress color="inherit" sx={{ width: 260, height: 10 }} />
                </Grid>
                <Grid container item xs={12} alignItems={"center"} justifyContent={"center"}>
                    <Typography variant="h5" align="center" sx={{color:"#FFFFFF"}}>
                        UN MOMENTO POR FAVOR...
                    </Typography>
                </Grid>
            </Grid>
        </Backdrop>
    );
};
export { GlobalLoader, TransparentLoader };
