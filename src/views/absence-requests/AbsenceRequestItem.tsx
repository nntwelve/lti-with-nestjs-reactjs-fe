import { Alert, Box, Button, LinearProgress } from '@mui/material';
import { useState } from 'react';
import useAbsenceRequestUpdate from '../../hooks/absence-requests/useAbsenceRequestUpdate';
import {
  ABSENCE_REQUEST_STATUS,
  IAbsenceRequest,
} from '../../interfaces/absence-requests.interface';
import { StyledTableCell, StyledTableRow } from '../shared/CustomTable';

type Props = {
  absenceRequest: IAbsenceRequest;
  index: number;
  isTeacher: boolean;
};

function AbsenceRequestItem({ absenceRequest, index, isTeacher }: Props) {
  const [data, setData] = useState(absenceRequest);
  const [{ loading, error }, doUpdate] = useAbsenceRequestUpdate(
    absenceRequest._id
  );
  const handleUpdateStatus = async (is_approve: boolean) => {
    doUpdate({ data: { is_approve } }).then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
  };
  if (error) {
    return (
      <StyledTableRow>
        <StyledTableCell colSpan={7}>
          <Alert severity="error">{error.message}</Alert>
        </StyledTableCell>
      </StyledTableRow>
    );
  }
  return loading ? (
    <LinearProgress />
  ) : (
    <StyledTableRow key={data._id}>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        {index + 1}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        {data.student_id}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        {data.student_name}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        {data.reason}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        {new Date(data.date).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell sx={{ textAlign: 'center' }}>
        {data.confirmed_by_name}
      </StyledTableCell>
      {isTeacher ? (
        <StyledTableCell>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data.status === ABSENCE_REQUEST_STATUS.PENDING ? (
              <>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ mr: '4px' }}
                  onClick={() => handleUpdateStatus(true)}>
                  Approve
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleUpdateStatus(false)}>
                  Reject
                </Button>
              </>
            ) : (
              data.status
            )}
          </Box>
        </StyledTableCell>
      ) : (
        <StyledTableCell sx={{ textAlign: 'center' }}>
          {data.status}
        </StyledTableCell>
      )}
    </StyledTableRow>
  );
}

export default AbsenceRequestItem;
