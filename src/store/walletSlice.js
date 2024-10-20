import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    wallets: []
  },
  reducers: {
    addWallet: (state, action) => {
      state.wallets.push(action.payload);
    },
    removeWallet: (state, action) => {
      state.wallets = state.wallets.filter(wallet => wallet.address !== action.payload);
    },
    updateWalletBalance: (state, action) => {
      const { address, balance } = action.payload;
      const wallet = state.wallets.find(w => w.address === address);
      if (wallet) {
        wallet.balance = balance;
      }
    }
  }
});

export const { addWallet, removeWallet, updateWalletBalance } = walletSlice.actions;
export default walletSlice.reducer;
