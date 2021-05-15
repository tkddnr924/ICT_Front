import { get } from './base'

const URL = '/market'

export const getMarketStatisticDay = () => get(`${URL}/statistic/day`)
