import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useAdminAuth() {
  const [authed, setAuthed] = useState(!!localStorage.getItem('btcons_admin_token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!authed) navigate('/admin/login');
  }, [authed, navigate]);

  function logout() {
    localStorage.removeItem('btcons_admin_token');
    setAuthed(false);
  }

  return { authed, logout };
}
