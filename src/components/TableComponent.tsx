import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import {Post} from '../types/Post'
import TableHead from '@mui/material/TableHead'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'

type TableComponentProps = {
    posts: Post[]
    setPosts: React.Dispatch<React.SetStateAction<Post[]>>
    handleClickEdit: (value: Post) => void
    deletePost: (postId: number) => Promise<void>
}

export const TableComponent: React.FC<TableComponentProps> = ({
                                                                  posts,
                                                                  handleClickEdit,
                                                                  deletePost,
                                                              }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Text</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.id}>
                            <TableCell
                                style={{width: 160}}
                                component="th"
                                scope="row"
                            >
                                {post.category}
                            </TableCell>
                            <TableCell style={{width: 160}} align="left">
                                {post.name}
                            </TableCell>
                            <TableCell align="left">{post.text}</TableCell>
                            <TableCell style={{width: 40}} align="right">
                                <IconButton
                                    onClick={() => handleClickEdit(post)}
                                    aria-label="update"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#33CC33',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'green',
                                        },
                                    }}
                                >
                                    <CreateIcon sx={{fontSize: 15}}/>
                                </IconButton>
                            </TableCell>
                            <TableCell style={{width: 40}} align="right">
                                <IconButton
                                    onClick={() => deletePost(post.id)}
                                    aria-label="delete"
                                    color="primary"
                                    sx={{
                                        backgroundColor: '#33CC33',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'green',
                                        },
                                    }}
                                >
                                    <DeleteIcon sx={{fontSize: 15}}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
