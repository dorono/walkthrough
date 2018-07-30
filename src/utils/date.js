import moment from 'moment';

export const currentTimezone = () => moment().format('[UTC]ZZ');
export const formatDate = date => moment(date).format('YYYY-MM-DD HH:mm');
export const formatDateLong = date => moment(date).format('dddd, MMMM D, YYYY, HH:mm');
