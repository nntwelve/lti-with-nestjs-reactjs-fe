import {
  Alert,
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import useAbsenceRequestList from '../../hooks/absence-requests/useAbsenceRequestList';
import {
  AbsenceRequestGetParams,
  IAbsenceRequest,
} from '../../interfaces/absence-requests.interface';
import CreateAbsenceRequestDialog from './CreateAbsenceRequestsDialog';
import AbsenceRequestItem from './AbsenceRequestItem';
import { StyledTableCell } from '../shared/CustomTable';

type Props = {
  filter: AbsenceRequestGetParams;
  isTeacher: boolean;
};

export function AbsenceRequests({ isTeacher, filter }: Props) {
  const [{ data, error, loading }] = useAbsenceRequestList(filter);

  const [open, setOpen] = useState(false);

  const toggleCreate = () => {
    setOpen((prev) => !prev);
  };

  if (error) {
    return <Alert severity="error">error.message</Alert>;
  }

  return loading ? (
    <LinearProgress />
  ) : (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'right', m: '8px' }}>
        {!isTeacher && (
          <Button variant="outlined" onClick={toggleCreate}>
            Create absence request
          </Button>
        )}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                STT
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                Student ID
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                Student name
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                Reason
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                Date
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                Confirmed by
              </StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>
                {isTeacher ? 'Action' : 'Status'}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((absenceRequest: IAbsenceRequest, index) => (
                <AbsenceRequestItem
                  absenceRequest={absenceRequest}
                  index={index}
                  isTeacher={isTeacher}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateAbsenceRequestDialog open={open} onClose={toggleCreate} />
    </>
  );
}
