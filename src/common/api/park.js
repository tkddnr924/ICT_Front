import { get } from './base'

const URL = '/park'

export const getCurrentParkStatus = () => get(`${URL}/status`)
