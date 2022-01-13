import { get } from 'lodash'
import { createSelector } from 'reselect'


const address = (state:any) => get(state, 'user.address')
export const addressSelector = createSelector(address, a => a)


const crypto = (state:any) => get(state, 'user.crypto')
export const cryptoSelector = createSelector(crypto, c => c)


const network = (state:any) => get(state, 'user.network')
export const networkSelector = createSelector(network, n => n)