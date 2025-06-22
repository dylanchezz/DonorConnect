export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const getExpiryTime = (minutes = 10) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now.toISOString().slice(0, 19).replace('T', ' ');
};
