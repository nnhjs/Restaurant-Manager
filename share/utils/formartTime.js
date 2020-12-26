import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
require("dayjs/locale/vi");
dayjs.locale("vi"); // use locale globally
export const formart = (date) => {
  return dayjs(date).fromNow();
};
