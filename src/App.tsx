import React from 'react';
import './App.css';
import { getLtik } from './helpers/lti.helper';
import { AbsenceRequests } from './views/absence-requests/AbsenceRequests';
import { Box, Container, Typography } from '@mui/material';
import useLtiRole from './hooks/roles/useLtiRole';
import { USER_ROLE } from './interfaces/lti.interface';

function App() {
  const ltik = getLtik();
  const [{ data }] = useLtiRole();

  if (!ltik) {
    return <Box>Missing ltik</Box>;
  }
  return (
    <Container className="App">
      <Typography variant="h3" gutterBottom mt={3}>
        LTI Absence Requests
      </Typography>
      <AbsenceRequests
        isTeacher={data !== USER_ROLE.STUDENT}
        filter={{
          limit: 10,
          offset: 0,
        }}
      />
    </Container>
  );
}

export default App;
