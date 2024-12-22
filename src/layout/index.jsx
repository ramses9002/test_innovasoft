import { useState, useEffect } from "react";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TopBarGlobal } from "../components/top_bar_global";
import { NavBarGlobal } from "../components/nav_bar_global";
import { grey } from "@mui/material/colors";
import { Dashboard as DashboardIcon, Group as GroupIcon } from "@mui/icons-material";

const Layout_Back_Office = () => {
    // =============================================================================== //
    // =============================|| STATES AND CONST ||============================ //
    // =============================================================================== //
    const navigate = useNavigate();
    const dinamicUserStore = useSelector((state) => state.userStore);
    const windowsSize = useMediaQuery((theme) => theme.breakpoints.up("md"));
    const drawerWidth = 300;
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [stateNavs, setStateNavs] = useState({});
    const listnavs = [
        {
            key: "uno",
            urls: ["/home", "/home/"],
            name: "Inicio",
            icons: <DashboardIcon />,
            children: null,
        },
        {
            key: "dos",
            urls: [
                "/home/clients",
                "/home/clients/",
                "/home/clients/add",
                "/home/clients/add/",
                "/home/clients/edit",
                "/home/clients/edit/",
                "/home/clients/details",
                "/home/clients/details/",
            ],
            name: "Consultar Clientes",
            icons: <GroupIcon />,
            children: null,
        },
    ];

    // =============================================================================== //
    // =================================|| FUNCTIONS ||=============================== //
    // =============================================================================== //
    const handleClickItemNavBar = (item) => {
        if (item.children) {
            setStateNavs({
                ...stateNavs,
                [item.key]: !stateNavs[item.key],
            });
        } else {
            navigate(Array.isArray(item.urls) ? item.urls[0] : item.urls);
        }
    };

    const handleClickExit = () => {
        navigate("/");
    };

    useEffect(() => {
        const listStateNavs = [];
        for (const iterator of listnavs) {
            let result = location.pathname.indexOf(iterator.urls) !== -1 ? true : false;
            Object.assign(listStateNavs, { [iterator.key]: result });
        }
        setStateNavs(listStateNavs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =============================================================================== //
    // ==================================|| VIEWS ||================================== //
    // =============================================================================== //

    return (
        <Box sx={{ display: "flex" }}>
            <TopBarGlobal
                windowsSize={windowsSize}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                handleClickExit={handleClickExit}
                userName={dinamicUserStore.username}
            />
            <NavBarGlobal
                handleClickItemNavBar={handleClickItemNavBar}
                drawerWidth={drawerWidth}
                windowsSize={windowsSize}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                listnavs={listnavs}
                stateNavs={stateNavs}
                userName={dinamicUserStore.username}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3, background: grey[50], minHeight: "100vh" }}>
                <Toolbar /> {/*margin top*/}
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout_Back_Office;
