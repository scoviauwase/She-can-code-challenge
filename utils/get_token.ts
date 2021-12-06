export const getToken = (authHeader) => {
  if (!authHeader) {
    throw new Error('Header does not contain an authorization token');
  }
  if (!authHeader.startsWith('Bearer')) {
    throw new Error("The token should begin with the word 'Bearer'");
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new Error('The token does not contain a jwt');
  }
  return token;
};
