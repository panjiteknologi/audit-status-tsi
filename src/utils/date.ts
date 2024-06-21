import moment from "moment";

export const formatDate = (dateString: string) => {
  return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
};
