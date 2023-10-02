import * as React from 'react'
import TablePagination from '@mui/material/TablePagination'

type PaginationProps = {
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    rowsPerPage: number
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
    totalRows: number
}

export const Pagination: React.FC<PaginationProps> = ({
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalRows,
}) => {
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}
        />
    )
}
