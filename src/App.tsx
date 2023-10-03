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
import { CssBaseline, ThemeProvider } from '@mui/material'

export const App = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [open, setOpen] = React.useState(false)
    const [postToUpdate, setPostToUpdate] = useState<Post | null>(null)
    const [activeCategory, setActiveCategory] = useState('')
    const [activeQuery, setActiveQuery] = useState('')
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

    function updatePost(updatedPost: Post) {
        return postsService.updatePost(updatedPost).then(({ data: post }) => {
            setPosts((currentPosts) => {
                const newPosts = [...currentPosts]
                const index = newPosts.findIndex(
                    (post) => post.id === updatedPost.id
                )

                newPosts.splice(index, 1, post)

                return newPosts
            })
        })
    }

    useEffect(() => {
        postsService
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
        categoriesService.getCategories().then((data) => setCategories(data))
    }, [activeCategory, activeQuery, page, rowsPerPage])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div>
                <FormInputs
                    activeQuery={activeQuery}
                    setActiveQuery={setActiveQuery}
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />
                <TableComponent
                    posts={posts}
                    setPosts={setPosts}
                    handleClickEdit={handleClickEdit}
                    // setSelectedPost={setSelectedPost}
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
                />
                <Pagination
                    page={page}
                    setPage={setPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    totalRows={totalRows}
                />
            </div>
        </ThemeProvider>
    )
}
