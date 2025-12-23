import moment from "moment-timezone";
export const DateformatVNTimestamp = (date) => {
  return moment(date).add(0, "hours").format("DD/MM/YYYY HH:mm");
};
