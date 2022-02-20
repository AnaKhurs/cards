import * as React from 'react';
import {styled} from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppSelector} from '../../../../bll/store';
import {Table} from '@mui/material';


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export const TablePacks = () => {
debugger
    const packs = useAppSelector(state => state.packs.cardPacks)

    let mappedElements = packs.map((row) => (
        <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
                {row.name}
            </StyledTableCell>
            <StyledTableCell align="right">{row.cardsCount}</StyledTableCell>
            <StyledTableCell align="right">{row.updated}</StyledTableCell>
            <StyledTableCell align="right">{row.user_name}</StyledTableCell>
            <StyledTableCell align="right">
                <div>
                    <button>Delete</button>
                    <button>Edit</button>
                    <button>Learn</button>
                </div>
            </StyledTableCell>
        </StyledTableRow>
    ));


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Cards</StyledTableCell>
                        <StyledTableCell align="right">Last Updated</StyledTableCell>
                        <StyledTableCell align="right">Created by</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mappedElements}
                </TableBody>
            </Table>
        </TableContainer>
    );
}