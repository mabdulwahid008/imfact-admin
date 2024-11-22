const moment = require('moment-timezone');
const { formateDate } = require('./formateDate');

export function convertTimeIntoSeoul(inputTime) {
  const timeInSeoul = moment(inputTime).tz('Asia/Seoul');
  return formateDate(timeInSeoul.format('YYYY-MM-DD HH:mm:ss'));
}


