import { Box, Drawer, Toolbar, ListItemButton, ListItemIcon, ListItemText, Typography, Collapse, Avatar, Grid, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ListPrimary, SubListPrimary } from "../list_global";
import {
    PlayCircleOutline as PlayCircleOutlineIcon,
    AddCircleOutline as AddCircleOutlineIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon,
} from "@mui/icons-material";

const NavBarGlobal = (props) => {
    const { handleClickItemNavBar, drawerWidth, windowsSize, openDrawer, setOpenDrawer, listnavs, stateNavs, userName } = props;
    const location = useLocation();
    const CustomList = ListPrimary;
    const CustomSubList = SubListPrimary;

    return (
        <Drawer
            variant={windowsSize ? "permanent" : "temporary"}
            anchor="left"
            open={windowsSize ? true : openDrawer}
            sx={{
                width: `${drawerWidth}px`,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: `${drawerWidth}px`,
                    borderRight: "none",
                    boxShadow: "1px 5px 20px -6px rgba(0,0,0,0.45)",
                    background: "#eeeeee",
                },
            }}
            onClose={() => {
                setOpenDrawer(false);
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto", pl: 1, pr: 1, pt: 2 }}>
                <Grid xs={12} container alignItems={"center"} justifyContent={"center"}>
                    <Avatar alt={"image user"} src="" sx={{ width: 150, height: 150 }} />
                </Grid>
                <Typography variant="h6" align="center">
                    {userName}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5" align="center">
                    MENU
                </Typography>
                <Divider sx={{ my: 2 }} />
                <CustomList>
                    {listnavs.map((item, index) => [
                        <ListItemButton
                            key={index}
                            onClick={() => {
                                handleClickItemNavBar(item);
                            }}
                            selected={
                                Array.isArray(item.urls) ? item.urls.indexOf(location.pathname) !== -1 : location.pathname.indexOf(item.urls) !== -1
                            }
                        >
                            <ListItemIcon>{item.icons}</ListItemIcon>
                            <ListItemText primary={item.name} />
                            {item.children && (
                                <ListItemIcon>{stateNavs[item.key] ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}</ListItemIcon>
                            )}
                        </ListItemButton>,
                        item.children && (
                            <Collapse key={index + 100} in={stateNavs[item.key]} timeout="auto" unmountOnExit>
                                <CustomSubList component="div">
                                    {item.children.map((item2, index2) => (
                                        <ListItemButton
                                            key={index2 + 200}
                                            onClick={() => {
                                                handleClickItemNavBar(item2);
                                            }}
                                            selected={location.pathname.indexOf(item2.urls) !== -1}
                                        >
                                            <ListItemIcon>
                                                <PlayCircleOutlineIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={item2.name} />
                                        </ListItemButton>
                                    ))}
                                </CustomSubList>
                            </Collapse>
                        ),
                    ])}
                </CustomList>
            </Box>
        </Drawer>
    );
};

export { NavBarGlobal };
