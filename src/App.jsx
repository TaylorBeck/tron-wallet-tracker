import { Container, Typography, Box } from '@mui/material';
import WalletList from './components/WalletList';
import AddWalletForm from './components/AddWalletForm';

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
        >
          Tron Wallet Tracker
        </Typography>
        <AddWalletForm />
        <WalletList />
      </Box>
    </Container>
  );
}

export default App;
