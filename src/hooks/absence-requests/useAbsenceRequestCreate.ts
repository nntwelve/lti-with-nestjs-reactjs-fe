import { IAbsenceRequest } from '../../interfaces/absence-requests.interface';
import useAxios from '../shared/useAxiosWrapper';

function useAbsenceRequestCreate() {
  return useAxios<IAbsenceRequest>(
    {
      method: 'POST',
      url: `/absence-requests`,
    },
    {
      manual: true,
    }
  );
}

export default useAbsenceRequestCreate;
