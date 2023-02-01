import useAxios from '../shared/useAxiosWrapper';

function useLtiRole() {
  return useAxios<string>({
    method: 'GET',
    url: `/lti/roles`,
  });
}

export default useLtiRole;
