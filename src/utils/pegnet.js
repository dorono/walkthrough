import {PEGNET_TRANSACTION_TYPES} from 'constants/pegnet';

export const getPegnetTransactionType = (txaction) => PEGNET_TRANSACTION_TYPES[txaction - 1];