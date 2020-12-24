export const convertPrice = (price) => {
  return price?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
