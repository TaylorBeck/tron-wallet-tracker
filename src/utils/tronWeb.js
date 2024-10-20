import { TronWeb } from 'tronweb';

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io'
  // headers: { 'TRON-PRO-API-KEY': 'your api key' },
  // privateKey: 'your private key'
});

export const getBalance = async address => {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    return tronWeb.fromSun(balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
    return '0';
  }
};

export default tronWeb;
