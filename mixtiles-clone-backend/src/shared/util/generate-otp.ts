export const generateOtp = (): number => {
  return getRndInteger(111111, 999999);
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
