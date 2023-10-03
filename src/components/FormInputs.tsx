import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import React from 'react'
import { NightModeToggle } from './NightModeToggle'

type FormInputsProps = {
    activeQuery: string
    setActiveQuery: React.Dispatch<React.SetStateAction<string>>
    categories: string[]
    activeCategory: string
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

export const FormInputs: React.FC<FormInputsProps> = ({
    activeQuery,
    setActiveQuery,
    categories,
    activeCategory,
    setActiveCategory,
}) => {
    return (
        <div style={{ display: 'flex' }}>
            <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <InputLabel id="demo-simple-select-label">Kind</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    // onChange={handleChange}
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
                    label="Age"
                    onChange={(event) => {
                        setActiveCategory(event.target.value)
                    }}
                >
                    {categories.map((category) => (
                        <MenuItem value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                sx={{ m: 1, minWidth: 600, width: '100%' }}
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                value={activeQuery}
                onChange={(event) => {
                    setActiveQuery(event.target.value)
                }}
            />
            <NightModeToggle />
        </div>
    )
}
