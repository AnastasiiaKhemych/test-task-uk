import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import React from 'react'
import { NightModeToggle } from './NightModeToggle'
import ClearIcon from '@mui/icons-material/Clear'

type FormInputsProps = {
    activeQuery: string
    setActiveQuery: React.Dispatch<React.SetStateAction<string>>
    categories: string[]
    activeCategory: string
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const FormInputs: React.FC<FormInputsProps> = ({
    activeQuery,
    setActiveQuery,
    categories,
    activeCategory,
    setActiveCategory,
    setPage,
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
                    onChange={(event) => {
                        setActiveCategory(event.target.value)
                    }}
                >
                    <MenuItem>Clear select</MenuItem>
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
                onChange={(event) => {
                    setActiveQuery(event.target.value)
                    setPage(0)
                }}
                InputProps={{
                    endAdornment: activeQuery && (
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setActiveQuery('')}
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
