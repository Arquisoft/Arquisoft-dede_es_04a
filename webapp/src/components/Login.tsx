import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

type NotificationType = {
  severity: AlertColor,
  message: string;
}

function Login(): JSX.Element {

  const [name, setName] = useState('');
  const [password, setPassWord] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result:boolean = true;
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'Welcome'
      });
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'Acces denied'
      });
    }
  }

  return (
    <>
      <form name="login" onSubmit={handleSubmit}>
        <TextField
            required
            name="username"
            label="User" 
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ my: 2 }}
          />
        <TextField
          required
          name="password"
          label="Password" 
          variant="outlined"
          value={password}
          onChange={e => setPassWord(e.target.value)}
          sx={{ my: 2 }}
        />
        <Button variant="contained" type="submit" sx={{ my: 2 }}>Login</Button>
      </form>
      <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={()=>{setNotificationStatus(false)}}>
        <Alert severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Login;
