import moment from 'moment';

export const currentTimezone = () => moment().format('[GMT]ZZ');
export const formatDate = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
