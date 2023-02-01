export function getLtik() {
  const queries = window.location.search;
  const urlParams = new URLSearchParams(queries);
  const ltik = urlParams.get('ltik');
  return ltik;
}
