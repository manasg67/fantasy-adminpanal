import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     // Clear authentication data (e.g., token)
    //     localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');
        
    //     // Redirect to the login page
    //     navigate('/');
    //   };
    const handleLogout = () => {
      // Clear authentication data
      localStorage.removeItem('authToken'); // or sessionStorage.removeItem('authToken');
      
      // Redirect to the login page and replace the history stack
      navigate('/', { replace: true });

      // Optionally, clear any other state if necessary
      window.location.reload(); // Force a reload to clear any cached state
  };
  return (
    <div>
      <header style={{  backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: '0 0 0.6px 0', // Only increase the bottom border width
          borderStyle: 'solid',
            }}>
        <div style={{ margin: '0 auto', maxWidth: '1280px', padding: '0 1rem', boxSizing: 'border-box',marginBottom:10,marginTop:20 }}>
          <div style={{ display: 'flex', height: '4rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '3rem' }}>
              <a href="#" style={{ display: 'block', color: '#14b8a6' }}>
              <img
                src="/logoheader.png"
                width={150}
                height={70}
                alt="Uomo"
                className="logo__image d-block"
              />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                    style={{
                      borderRadius: '0.375rem',
                      backgroundColor: '#14b8a6',
                      padding: '0.625rem 1.25rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: 'white',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
