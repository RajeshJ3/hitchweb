export const getDomainFromUrl = (url) => {
  let domain = new URL(url);
  return domain.hostname;
};
