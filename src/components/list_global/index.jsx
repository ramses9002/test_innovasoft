import { List, styled } from "@mui/material";

const ListPrimary = styled((props) => <List {...props} />)(({ theme }) => ({
    "& .MuiListItemButton-root": {
        paddingLeft: "5px",
        paddingRight: "5px",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 7.5,
            "& .MuiListItemIcon-root": {
                "& .MuiSvgIcon-root": {
                    color: theme.palette.common.white,
                },
            },
            "& .MuiListItemText-root": {
                color: theme.palette.common.white,
            },
        },
    },
    "& .Mui-selected": {
        backgroundColor: `${theme.palette.primary.dark} !important`,
        borderRadius: 7.5,
        boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.19), 0px 6px 6px 0px rgba(0,0,0,0.23)",
        "& .MuiListItemIcon-root": {
            "& .MuiSvgIcon-root": {
                color: theme.palette.common.white,
            },
        },
        "& .MuiListItemText-root": {
            color: theme.palette.common.white,
        },
    },
    "& .MuiListItemIcon-root": {
        minWidth: "35px",
        "& .MuiSvgIcon-root": {
            color: theme.palette.text.secondary,
        },
    },
    "& .MuiListItemText-root": {
        color: theme.palette.text.secondary,
    },
}));

const SubListPrimary = styled((props) => <List {...props} />)(({ theme }) => ({
    "& .MuiListItemButton-root": {
        paddingLeft: "15px",
        paddingRight: "5px",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: 7.5,
            "& .MuiListItemIcon-root": {
                "& .MuiSvgIcon-root": {
                    color: theme.palette.common.white,
                },
            },
            "& .MuiListItemText-root": {
                color: theme.palette.common.white,
            },
        },
    },
    "& .Mui-selected": {
        backgroundColor: `${theme.palette.primary.light} !important`,
        borderRadius: 7.5,
        boxShadow: "none",
        "& .MuiListItemIcon-root": {
            "& .MuiSvgIcon-root": {
                color: theme.palette.common.white,
            },
        },
        "& .MuiListItemText-root": {
            color: theme.palette.common.white,
        },
    },
    "& .MuiListItemIcon-root": {
        minWidth: "35px",
        "& .MuiSvgIcon-root": {
            color: theme.palette.text.secondary,
        },
    },
    "& .MuiListItemText-root": {
        color: theme.palette.text.secondary,
    },
}));

export { ListPrimary, SubListPrimary };
