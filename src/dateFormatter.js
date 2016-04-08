/**
 * default format of date (ISO-8601)
 * @static
 * @final
 */
export const DEFAULT_DATE_FORMAT = 'yyyy-MM-ddThh:mm:ssO';

/**
 * Formats the given date by the given pattern.<br />
 * Following switches are supported:
 * <ul>
 * <li>yyyy: The year</li>
 * <li>MM: the month</li>
 * <li>dd: the day of month<li>
 * <li>hh: the hour<li>
 * <li>mm: minutes</li>
 * <li>O: timezone offset</li>
 * </ul>
 * @param {Date} vDate the date to format
 * @param {String} vFormat the format pattern
 * @return {String} formatted date string
 * @static
 */
export function formatDate(vDate, vFormat) {
	const vDay = this.addZero(vDate.getDate());
	const vMonth = this.addZero(vDate.getMonth() + 1);
	const vYearLong = this.addZero(vDate.getFullYear());
	const vYearShort = this.addZero(vDate.getFullYear().toString().substring(3, 4));
	const vYear = (vFormat.indexOf('yyyy') > -1 ? vYearLong : vYearShort);
	const vHour = this.addZero(vDate.getHours());
	const vMinute = this.addZero(vDate.getMinutes());
	const vSecond = this.addZero(vDate.getSeconds());
	const vTimeZone = this.zero(vDate);
	let vDateString = vFormat.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear);
	vDateString = vDateString.replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond);
	vDateString = vDateString.replace(/O/g, vTimeZone);
	return vDateString;
}
/**
 * Formats the given date by the given pattern in UTC without timezone specific information.<br />
 * Following switches are supported:
 * <ul>
 * <li>yyyy: The year</li>
 * <li>MM: the month</li>
 * <li>dd: the day of month<li>
 * <li>hh: the hour<li>
 * <li>mm: minutes</li>
 * </ul>
 * @param {Date} vDate the date to format
 * @param {String} vFormat the format pattern
 * @return {String} formatted date string
 * @static
 */
 export function formatUTCDate(vDate, vFormat) {
	const vDay = this.addZero(vDate.getUTCDate());
	const vMonth = this.addZero(vDate.getUTCMonth() + 1);
	const vYearLong = this.addZero(vDate.getUTCFullYear());
	const vYearShort = this.addZero(vDate.getUTCFullYear().toString().substring(3, 4));
	const vYear = (vFormat.indexOf('yyyy') > -1 ? vYearLong : vYearShort);
	const vHour	 = this.addZero(vDate.getUTCHours());
	const vMinute = this.addZero(vDate.getUTCMinutes());
	const vSecond = this.addZero(vDate.getUTCSeconds());
	let vDateString = vFormat.replace(/dd/g, vDay).replace(/MM/g, vMonth).replace(/y{1,4}/g, vYear);
	vDateString = vDateString.replace(/hh/g, vHour).replace(/mm/g, vMinute).replace(/ss/g, vSecond);
	return vDateString;
}

/**
 * @private
 * @static
 */
export function addZero(vNumber) {
  return ((vNumber < 10) ? '0' : '') + vNumber;
}

/**
 * Formates the TimeOffest
 * Thanks to http://www.svendtofte.com/code/date_format/
 * @private
 */
export function zero(date) {
	// Difference to Greenwich time (GMT) in hours
	const os = Math.abs(date.getTimezoneOffset());
	let h = String(Math.floor(os / 60));
	let m = String(os % 60);
	if (h.length === 1) h = '0' + h;
	if (m.length === 1) m = '0' + m;
	return date.getTimezoneOffset() < 0 ? '+' + h + m : '-' + h + m;
}