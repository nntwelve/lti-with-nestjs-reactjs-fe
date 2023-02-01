import { IAbsenceRequest } from '../../interfaces/absence-requests.interface';
import useAxios from '../shared/useAxiosWrapper';

function useAbsenceRequestUpdate(id: string) {
  return useAxios<IAbsenceRequest>(
    {
      method: 'PATCH',
      url: `/absence-requests/${id}`,
    },
    {
      manual: true,
    }
  );
}

export default useAbsenceRequestUpdate;
