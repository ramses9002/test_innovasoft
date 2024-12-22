import { useMemo } from "react";
import { Grid, ListItemIcon } from "@mui/material";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { MenuItemPrimary } from "../menu_item_global";

const TableGlobal = (props) => {
    const { data, datacolumns, actionMenuItems } = props;
    const columns = useMemo(
        () => [...datacolumns],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const CustomMenuItem = MenuItemPrimary;

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowActions: true,
        enableRowSelection: false,
        localization: MRT_Localization_ES,
        enableColumnFilterModes: false,
        enableColumnOrdering: false,
        enableGrouping: false,
        enableColumnPinning: true,
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "none",
        initialState: {
            columnPinning: {
                left: ["mrt-row-expand", "mrt-row-select"],
                right: ["mrt-row-actions"],
            },
            columnVisibility: { id: false },
        },
        displayColumnDefOptions: {
            "mrt-row-select": {
                size: 50,
                grow: false,
            },
            "mrt-row-actions": {
                size: 50,
                grow: false,
            },
        },
        muiPaginationProps: {
            color: "primary",
            rowsPerPageOptions: [10, 20, 30],
            shape: "rounded",
            variant: "text",
        },
        muiSelectCheckboxProps: {
            color: "primary",
        },
        muiTableHeadCellProps: {
            sx: (theme) => ({
                "& .MuiCheckbox-root.Mui-checked": {
                    color: theme.palette.primary.main,
                },
                "& .MuiCheckbox-root.MuiCheckbox-indeterminate": {
                    color: theme.palette.primary.main,
                },
            }),
            align: "center",
        },
        muiTableBodyCellProps: {
            align: "center",
        },
        muiTableFooterCellProps: {
            align: "center",
        },
        muiTopToolbarProps: {
            sx: (theme) => ({
                background: theme.palette.primary.main,
                "& .MuiSvgIcon-root": {
                    color: theme.palette.common.white,
                },
            }),
        },
        renderRowActionMenuItems: ({ closeMenu, row }) =>
            actionMenuItems.map((item) => (
                <CustomMenuItem
                    key={item.key}
                    onClick={() => {
                        item.onclick(row.original);
                        closeMenu();
                    }}
                >
                    <ListItemIcon>{item.icons}</ListItemIcon>
                    {item.text}
                </CustomMenuItem>
            )),
    });

    return (
        <Grid item container xs={12}>
            <Grid item xs={12} sx={{ display: "grid" }}>
                <MaterialReactTable table={table} />
            </Grid>
        </Grid>
    );
};

export { TableGlobal };
