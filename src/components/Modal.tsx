import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { IconButton, TextField } from '@mui/material'
import { Post } from '../types/Post'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'
import ClearIcon from '@mui/icons-material/Clear'

type ModalProps = {
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
    open: boolean
    onClose: () => void
    postToUpdate: Post | null
    updatePost: (post: Post) => Promise<void>
    addPost: (newPost: Post) => Promise<void>
}

type FormTypes = {
    category: string
    name: string
    text?: string
    required?: string
}

export const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    postToUpdate,
    updatePost,
    addPost,
}) => {
    const { handleSubmit, control, reset, setValue } = useForm<FormTypes>({
        values: {
            category: postToUpdate?.category || '',
            name: postToUpdate?.name || '',
            text: postToUpdate?.text || '',
            required: '',
        },
        resolver: yupResolver(
            object({
                category: string().required(`Can't be blank`),
                name: string().required(`Can't be blank`),
                text: string(),
                required: string(),
            })
        ),
    })

    const handlePostsSubmit = (data: any) => {
        if (postToUpdate) {
            updatePost({ ...data, id: postToUpdate.id }).then(onClose)
        } else {
            addPost(data).then(onClose).finally(reset)
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Add Requisition'}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(handlePostsSubmit)}>
                        <Controller
                            control={control}
                            name="category"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    error={!!error?.message}
                                    helperText={error?.message}
                                    label="Category"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        marginTop: '20px',
                                        '& .MuiInputBase-root': {
                                            paddingRight: 0,
                                        },
                                    }}
                                    value={value}
                                    onChange={onChange}
                                    size="small"
                                    InputProps={{
                                        endAdornment: value && (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setValue('category', '')
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="name"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    error={!!error?.message}
                                    helperText={error?.message}
                                    label="Name"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        marginTop: '20px',
                                        '& .MuiInputBase-root': {
                                            paddingRight: 0,
                                        },
                                    }}
                                    value={value}
                                    onChange={onChange}
                                    size="small"
                                    InputProps={{
                                        endAdornment: value && (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setValue('name', '')
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="text"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    error={!!error?.message}
                                    helperText={error?.message}
                                    label="Text"
                                    variant="outlined"
                                    value={value}
                                    onChange={onChange}
                                    sx={{
                                        width: '100%',
                                        marginTop: '20px',
                                        '& .MuiInputBase-root': {
                                            paddingRight: 0,
                                        },
                                    }}
                                    size="small"
                                    InputProps={{
                                        endAdornment: value && (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setValue('text', '')
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="required"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <TextField
                                    error={!!error?.message}
                                    helperText={error?.message}
                                    label="Required"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        marginTop: '20px',
                                        '& .MuiInputBase-root': {
                                            paddingRight: 0,
                                        },
                                    }}
                                    value={value}
                                    onChange={onChange}
                                    size="small"
                                    InputProps={{
                                        endAdornment: value && (
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() =>
                                                    setValue('required', '')
                                                }
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        ),
                                    }}
                                />
                            )}
                        />
                        <DialogActions
                            sx={{ paddingRight: '0px', paddingTop: '20px' }}
                        >
                            <Button
                                onClick={() => {
                                    onClose()
                                    reset()
                                }}
                                variant="outlined"
                                sx={{
                                    color: '#33CC33',
                                    border: '1px solid #33CC33',
                                    '&:hover': {
                                        border: '1px solid green',
                                        color: 'green',
                                    },
                                }}
                            >
                                CANCEL
                            </Button>
                            <Button
                                type="submit"
                                autoFocus
                                variant="outlined"
                                sx={{
                                    color: 'white',
                                    backgroundColor: '#33CC33',
                                    border: '1px solid #33CC33',
                                    '&:hover': {
                                        border: '1px solid green',
                                        backgroundColor: 'green',
                                        color: 'white',
                                    },
                                }}
                            >
                                SAVE
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
