import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../../services/api';
import Swal from 'sweetalert2';

import './qrcode.scss';

function Qrcode() {
  const [qrcode, setQrcode] = useState('');
  const [loading, setLoading] = useState(true);
  const [isConect, setIsConect] = useState(false);
  const [waitForLogin, setWaitForLogin] = useState(false);
  const [previousQrcode, setPreviousQrcode] = useState('');

  const handleClick = async () => {
    setWaitForLogin(false);
    await api.get('/erp/session');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isConect) return '';
      if (!waitForLogin) {
        try {
          const response = await api.get('/erp/qrCodeBot');
          const qrcodeString = response.data.qrcode;
          const status = response.data.status;
          console.log(status);

          if (status === 'qrReadSuccess' || status === 'waitChat') {
            Swal.fire({
              icon: 'success',
              timer: 1000,
            });
          }

          if (status === 'successChat') {
            setWaitForLogin(true);
            setIsConect(true);
          }

          if (status !== 'waitForLogin') {
            if (qrcodeString !== previousQrcode) {
              setQrcode(qrcodeString);
              setPreviousQrcode(qrcodeString);
            }

            setLoading(false);
          } else {
            setWaitForLogin(true);
          }
        } catch (error) {}
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, [waitForLogin]);

  return (
    <>
      {!isConect ? (
        <div className="qrcode-container">
          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              {waitForLogin ? <button onClick={handleClick}></button> : <></>}
              <img
                style={
                  waitForLogin ? { filter: 'blur(3px)', transition: '.4s' } : {}
                }
                src={qrcode}
                alt="QR Code"
              ></img>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Qrcode;
