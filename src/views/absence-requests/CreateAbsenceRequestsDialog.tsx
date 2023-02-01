import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import {
  Button,
  TextField,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormControl,
  LinearProgress,
  FormHelperText,
  DialogContentText,
} from '@mui/material';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IAbsenceRequest } from '../../interfaces/absence-requests.interface';
import useAbsenceRequestCreate from '../../hooks/absence-requests/useAbsenceRequestCreate';

type Props = {
  open: boolean;
  onClose: () => void;
};

const schema = yup.object().shape({
  reason: yup.string().min(5).max(1000).required(),
  date: yup.date().required(),
});

const defaultValues = {
  reason: '',
  date: new Date(),
};

export default function CreateAbsenceRequestDialog({ open, onClose }: Props) {
  const [{ loading, error }, doCreate] = useAbsenceRequestCreate();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Partial<IAbsenceRequest>) => {
    doCreate({ data }).then((res) => {
      if (res.status === 201) {
        onClose();
        reset();
      }
    });
  };

  React.useEffect(() => {
    reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Absence Request</DialogTitle>
      {loading && <LinearProgress />}
      <DialogContent>
        {/* <FormControl>
          <Box sx={{ mt: '16px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="Choose date"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
        </FormControl> */}
        <Box
          id="absence-request-create-form"
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
          mt={2}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="reason"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label="Reason"
                  onChange={onChange}
                  placeholder="Enter your reason"
                  error={Boolean(errors.reason)}
                />
              )}
            />
            {errors.reason && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.reason.message}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <Controller
              name="date"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="Choose date"
                      inputFormat="MM/DD/YYYY"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              )}
            />
            {errors.date && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors.date.message}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
        {error && (
          <DialogContentText color={'error'}>
            Error: {error.message}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          form="absence-request-create-form"
          color="success"
          disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
