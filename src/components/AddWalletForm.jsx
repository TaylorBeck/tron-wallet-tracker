import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWallet } from '../store/walletSlice';
import { TextField, Button, Box } from '@mui/material';

const AddWalletForm = () => {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (address) {
      dispatch(addWallet({ address, balance: 0 }));
      setAddress('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2 }}
    >
      <TextField
        fullWidth
        label="Wallet Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Add Wallet
      </Button>
    </Box>
  );
};

export default AddWalletForm;
