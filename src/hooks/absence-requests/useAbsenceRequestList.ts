import {
  AbsenceRequestGetParams,
  IAbsenceRequest,
} from '../../interfaces/absence-requests.interface';
import useAxios from '../shared/useAxiosWrapper';

function useAbsenceRequestList(params: AbsenceRequestGetParams) {
  return useAxios<IAbsenceRequest[]>({
    method: 'GET',
    url: `/absence-requests`,
    params,
  });
}

export default useAbsenceRequestList;
