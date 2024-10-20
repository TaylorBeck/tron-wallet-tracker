import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWallet, updateWalletBalance } from '../store/walletSlice';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getBalance } from '../utils/tronWeb';

const WalletList = () => {
  const wallets = useSelector(state => state.wallet.wallets);
  const dispatch = useDispatch();
  const [trxPrice, setTrxPrice] = useState(0);

  useEffect(() => {
    const fetchBalances = async () => {
      for (const wallet of wallets) {
        const balance = await getBalance(wallet.address);
        dispatch(updateWalletBalance({ address: wallet.address, balance }));
      }
    };

    fetchBalances();

    // Fetch TRX price
    const fetchTrxPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd'
        );
        const data = await response.json();
        setTrxPrice(data.tron.usd);
      } catch (error) {
        console.error('Error fetching TRX price:', error);
      }
    };

    fetchTrxPrice();
  }, [wallets, dispatch]);

  const handleRemoveWallet = address => {
    dispatch(removeWallet(address));
  };

  const formatUSD = amount => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Grid
      container
      spacing={2}
      marginTop={4}
    >
      {wallets.map(wallet => (
        <Grid
          item
          xs={12}
          key={wallet.address}
        >
          <Card
            sx={{
              bgcolor: '#1a237e',
              color: 'white',
              position: 'relative',
              overflow: 'visible',
              width: '100%',
              marginTop: '12px'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                left: 20,
                bgcolor: '#ffd54f',
                borderRadius: '50%',
                p: 1
              }}
            >
              <AccountBalanceWalletIcon sx={{ fontSize: 26, color: '#1a237e' }} />
            </Box>
            <CardContent
              sx={{
                pt: 4,
                pb: 3
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ mb: 2 }}
              >
                TRON Wallet
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, wordBreak: 'break-all' }}
              >
                {wallet.address}
              </Typography>
              <Typography
                variant="h5"
                component="div"
              >
                {wallet.balance.toLocaleString()} TRX
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: '#90caf9' }}
              >
                ≈ {formatUSD(wallet.balance * trxPrice)} USD
              </Typography>
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'white',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'rotate(-6deg)'
                  }
                }}
                aria-label="delete"
                onClick={() => handleRemoveWallet(wallet.address)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WalletList;
