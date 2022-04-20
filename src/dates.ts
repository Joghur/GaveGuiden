import { format } from "date-fns";
import { da } from "date-fns/locale";

export const convertEpochSecondsToDateString = (
  epochSeconds: number,
  formatUsed = "dd/MM-yyyy HH:mm"
) => {
  const date = format(epochSeconds * 1000, formatUsed, {
    locale: da,
  });
  return date;
};

// export const fromNow = (epochSeconds: number) => {
//   return moment(epochSeconds * 1000).fromNow();
// };

// export const dayDiff = (epochSeconds: number) => {
//   const epoch = epochSeconds * 1000;
//   return moment(epoch).diff(moment(new Date()), "days");
// };
