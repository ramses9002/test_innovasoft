import { AppBar, Toolbar, IconButton, Tooltip, Box, Typography } from "@mui/material";
import { Menu as MenuIcon, Logout as IconLogout } from "@mui/icons-material";

const TopBarGlobal = (props) => {
    const { windowsSize, openDrawer, setOpenDrawer, handleClickExit, userName } = props;

    return (
        <AppBar
            position="fixed"
            sx={{
                background: "black",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                "& .MuiToolbar-root": { pl: 0, pr: 0 },
            }}
        >
            <Toolbar sx={{ pl: "0px", pr: "0px" }}>
                <Tooltip title="Menú">
                    <IconButton
                        onClick={() => {
                            setOpenDrawer(!openDrawer);
                        }}
                        color="inherit"
                        sx={{ display: windowsSize ? "none" : "" }}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Typography variant="h5" align="center" sx={{ mx: 2 }}>
                    COMPAÑIA PRUEBA
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="h5" align="center" sx={{ mx: 2, display: windowsSize ? "" : "none" }}>
                    {userName}
                </Typography>
                <Tooltip title="Salir">
                    <IconButton color="inherit" onClick={handleClickExit}>
                        <IconLogout fontSize="large" />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export { TopBarGlobal };
