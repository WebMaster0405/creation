// USER
export function userAccountLoaded(address:any) {
    return {
      type: 'USER_ACCOUNT',
      address
    }
}

export function userCryptoLoaded(crypto:any) {
  return {
    type: 'USER_CRYPTO',
    crypto
  }
}

// Network

export function userNetworkLoaded(network: any) {
  return {
    type: 'USER_NETWORK',
    network
  }
}