import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material'
import React from 'react'
import { NightModeToggle } from './NightModeToggle'
import ClearIcon from '@mui/icons-material/Clear'

type FormInputsProps = {
    activeQuery: string
    handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    categories: string[]
    activeCategory: string | undefined
    handleCategoryChange: (event: SelectChangeEvent) => void
    setPage: React.Dispatch<React.SetStateAction<number>>
    handleCloseQuery: () => void
}

export const FormInputs: React.FC<FormInputsProps> = ({
    activeQuery,
    handleQueryChange,
    categories,
    activeCategory,
    handleCategoryChange,
    handleCloseQuery,
}) => {
    return (
        <div style={{ display: 'flex' }}>
            <FormControl
                sx={{ m: 1, minWidth: 400, marginLeft: '0' }}
                size="small"
            >
                <InputLabel id="demo-simple-select-label">Kind</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Kind"
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={activeCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                sx={{
                    m: 1,
                    minWidth: 400,
                    width: '100%',
                    '& .MuiInputBase-root': {
                        paddingRight: 0,
                    },
                }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                value={activeQuery}
                onChange={handleQueryChange}
                InputProps={{
                    endAdornment: activeQuery && (
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleCloseQuery}
                        >
                            <ClearIcon />
                        </IconButton>
                    ),
                }}
            />
            <NightModeToggle />
        </div>
    )
}
