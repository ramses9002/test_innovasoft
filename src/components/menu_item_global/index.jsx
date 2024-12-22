import { MenuItem, styled } from "@mui/material";

const MenuItemPrimary = styled((props) => <MenuItem {...props} />)(({ theme }) => ({
    fontFamily: "Roboto",
    fontSize: 16,
    color: theme.palette.text.secondary,
    "& .MuiSvgIcon-root": {
        color: theme.palette.text.secondary,
    },
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        "& .MuiSvgIcon-root": {
            color: theme.palette.common.white,
        },
    },
    "&:active": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
        "& .MuiSvgIcon-root": {
            color: theme.palette.common.white,
        },
    },
    "&.Mui-selected": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        "&.MuiSvgIcon-root": {
            color: theme.palette.common.white,
        },
    },
    "&.Mui-selected:hover": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        "&.MuiSvgIcon-root": {
            color: theme.palette.common.white,
        },
    },
}));

export { MenuItemPrimary };
