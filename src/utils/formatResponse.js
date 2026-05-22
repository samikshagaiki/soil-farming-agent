export function formatResponse(
  success,
  data = null,
  error = null
) {

  return {
    success,
    data,
    error
  };
}