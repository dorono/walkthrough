import moment from 'moment';

export const formatDate = date => moment(date).format('YYYY-MM-DD HH:mm:ss [GMT]ZZ');
