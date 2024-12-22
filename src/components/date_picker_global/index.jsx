import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { PickersLayout } from "@mui/x-date-pickers/PickersLayout";
import { add, sub } from "date-fns";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Calendar from '@mui/icons-material/Event';

const DatePickerGlobal = (props) => {
    const {
        label = "Fecha",
        value = new Date(),
        setValue = null,
        minDate = sub(new Date(), { years: 2 }),
        maxDate = add(new Date(), { years: 2 }),
    } = props;
    const StyledPickersLayout = styled(PickersLayout)(({ theme }) => ({
        ".MuiPickersToolbar-root": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
            ".MuiTypography-root": {
                color: theme.palette.common.white,
            },
        },
        ".MuiDialogActions-root": {
            display: "none",
        },
        ".MuiPickersDay-today": {
            border: `2px solid ${theme.palette.primary.main} !important`,
        },
        ".MuiPickersDay-root.Mui-selected": {
            ":hover": {
                backgroundColor: `${theme.palette.primary.dark} !important`,
            },
            backgroundColor: `${theme.palette.primary.main} !important`,
        },
    }));

    return (
        <MobileDatePicker
            slots={{
                layout: StyledPickersLayout,
                textField: TextField,
            }}
            slotProps={{
                textField: {
                    fullWidth: true,
                    helperText: value.error && "El campo no es válido",
                    error: value.error,
                    InputProps: { endAdornment: <Calendar color="secondary"/> },
                },
            }}
            label={label}
            value={value.date}
            onChange={(newValue) => {
                setValue({ date: newValue, error: false });
            }}
            format={"dd/MM/yyyy"}
            minDate={minDate}
            maxDate={maxDate}
            closeOnSelect
        />
    );
};

export { DatePickerGlobal };
