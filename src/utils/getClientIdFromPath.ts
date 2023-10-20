const getClientIdFromPath = () => {
  return location.host.slice(0, location.host.indexOf("."));
}

export default getClientIdFromPath;
