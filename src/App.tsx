import React, { useEffect, useState } from 'react'
import { FormInputs } from './components/FormInputs'
import { Post } from './types/Post'
import * as postsService from './api/posts'
import * as categoriesService from './api/categories'
import { TableComponent } from './components/TableComponent'
import { Modal } from './components/Modal'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Pagination } from './components/Pagination'
import { useThemeContext } from './theme/ThemeContextProvider'
import { CssBaseline, SelectChangeEvent, ThemeProvider } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

export const App = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [posts, setPosts] = useState<Post[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [open, setOpen] = React.useState(false)
    const [postToUpdate, setPostToUpdate] = useState<Post | null>(null)
    const activeQuery = searchParams.get('name') || ''
    const activeCategory = searchParams.get('category') || undefined
    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [totalRows, setTotalRows] = React.useState<number>(0)
    const { theme } = useThemeContext()

    const handleClickOpen = () => {
        setPostToUpdate(null)
        setOpen(true)
    }

    const handleClickEdit = (post: Post) => {
        setPostToUpdate(post)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleCloseQuery = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('name')
        setSearchParams(params)
    }

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        if (event.target.value === '') {
            params.delete('name')
        } else {
            params.set('name', event.target.value)
        }
        setSearchParams(params)
        setPage(0)
    }

    const handleCategoryChange = (event: SelectChangeEvent) => {
        const params = new URLSearchParams(searchParams)
        if (event.target.value === '') {
            params.delete('category')
        } else {
            params.set('category', event.target.value)
        }
        setSearchParams(params)
    }

    const deletePost = async (postId: number): Promise<void> => {
        try {
            await postsService.deletePost(postId)

            await fetchPageList()
        } catch (error) {
            throw error
        }
    }

    const addPost = async (newPost: Post): Promise<void> => {
        await postsService.addPost(newPost)

        await fetchPageList()
    }

    const updatePost = async (updatedPost: Post): Promise<void> => {
        await postsService.updatePost(updatedPost)

        await fetchPageList()
    }

    const fetchPageList = async () => {
        await postsService
            .getPost({
                category: activeCategory,
                name: activeQuery,
                page,
                limit: rowsPerPage,
            })
            .then((resp) => {
                setPosts(resp.data)
                setTotalRows(resp.meta.total)
            })
        await categoriesService
            .getCategories()
            .then((data) => setCategories(data))
    }

    useEffect(() => {
        fetchPageList()
    }, [activeCategory, activeQuery, page, rowsPerPage])

    return (
        <div style={{ margin: '0px 50px' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <FormInputs
                    activeQuery={activeQuery}
                    handleQueryChange={handleQueryChange}
                    categories={categories}
                    activeCategory={activeCategory}
                    handleCategoryChange={handleCategoryChange}
                    setPage={setPage}
                    handleCloseQuery={handleCloseQuery}
                />
                <TableComponent
                    posts={posts}
                    setPosts={setPosts}
                    handleClickEdit={handleClickEdit}
                    deletePost={deletePost}
                />
                <Button
                    variant="outlined"
                    onClick={handleClickOpen}
                    startIcon={<AddCircleIcon />}
                    sx={{
                        color: '#33CC33',
                        border: '1px solid #33CC33',
                        marginTop: '10px',
                        '&:hover': {
                            border: '1px solid green',
                            color: 'green',
                        },
                    }}
                >
                    REQUISITION
                </Button>
                <Modal
                    postToUpdate={postToUpdate}
                    setPosts={setPosts}
                    open={open}
                    onClose={handleClose}
                    updatePost={updatePost}
                    addPost={addPost}
                />
                <Pagination
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalRows={totalRows}
                />
            </ThemeProvider>
        </div>
    )
}
