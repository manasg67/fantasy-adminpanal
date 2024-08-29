

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility
//   const navigate = useNavigate();  // Initialize navigate hook

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       setMessage(data.msg); // Display success message
//       navigate('/mainpage'); // Redirect to the dashboard or any route you want
//     } else {
//       setMessage(data.msg); // Display error message
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div>
//       <div style={{ maxWidth: '100vw', padding: '4rem 1rem', margin: '0 auto' }}>
//         <div style={{ maxWidth: '32rem', margin: '0 auto', textAlign: 'center' }}>
//           <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
//             Get started today!
//           </h1>
//           <p style={{ marginTop: '1rem', color: '#6B7280' }}>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
//             ipsa culpa autem, at itaque nostrum!
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} style={{ maxWidth: '28rem', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           <div>
//             <label htmlFor="email" style={{ display: 'none' }}>Email</label>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type="email"
//                 style={{
//                   width: '100%',
//                   borderRadius: '0.5rem',
//                   border: '1px solid #E5E7EB',
//                   padding: '1rem 3rem 1rem 1rem',
//                   fontSize: '0.875rem',
//                   boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
//                 }}
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <span style={{ position: 'absolute', top: 0, bottom: 0, right: '0', display: 'grid', placeContent: 'center', paddingRight: '1rem' }}>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   style={{ width: '1rem', height: '1rem', color: '#9CA3AF' }}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                   />
//                 </svg>
//               </span>
//             </div>
//           </div>

//           <div>
//             <label htmlFor="password" style={{ display: 'none' }}>Password</label>
//             <div style={{ position: 'relative' }}>
//               <input
//                 type={passwordVisible ? 'text' : 'password'} // Toggle input type based on state
//                 style={{
//                   width: '100%',
//                   borderRadius: '0.5rem',
//                   border: '1px solid #E5E7EB',
//                   padding: '1rem 3rem 1rem 1rem',
//                   fontSize: '0.875rem',
//                   boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
//                 }}
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <span
//                 onClick={togglePasswordVisibility} // Toggle visibility on click
//                 style={{ position: 'absolute', top: 0, bottom: 0, right: '0', display: 'grid', placeContent: 'center', paddingRight: '1rem', cursor: 'pointer' }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   style={{ width: '1rem', height: '1rem', color: '#9CA3AF' }}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   {passwordVisible ? (
//                     <>
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                     />
//                     </>
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   )}
//                 </svg>
//               </span>
//             </div>
//           </div>

//           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <button
//               type="submit"
//               style={{
//                 display: 'inline-block',
//                 borderRadius: '0.5rem',
//                 backgroundColor: '#3B82F6',
//                 padding: '0.75rem 1.25rem',
//                 fontSize: '0.875rem',
//                 fontWeight: '500',
//                 color: '#FFFFFF'
//               }}
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         {message && (
//           <div style={{ marginTop: '1rem', textAlign: 'center', color: message.includes('successful') ? 'green' : 'red' }}>
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.msg); // Display success message
      navigate('/mainpage'); // Redirect to the dashboard or any route you want
    } else {
      setMessage(data.msg); // Display error message
    }

    // Log the message to ensure it is being set
    console.log("Message: ", message);

    // // Alert for immediate feedback
    alert(data.msg);


    // Hide the message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '32rem', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Get started today!
        </h1>
        <p style={{ marginTop: '1rem', color: '#6B7280' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla eaque error neque
          ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ maxWidth: '28rem', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'none' }}>Email</label>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              style={{
                width: '100%',
                borderRadius: '0.5rem',
                border: '1px solid #E5E7EB',
                padding: '1rem 3rem 1rem 1rem',
                fontSize: '0.875rem',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
              }}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span style={{ position: 'absolute', top: 0, bottom: 0, right: '0', display: 'grid', placeContent: 'center', paddingRight: '1rem' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '1rem', height: '1rem', color: '#9CA3AF' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'none' }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={passwordVisible ? 'text' : 'password'}
              style={{
                width: '100%',
                borderRadius: '0.5rem',
                border: '1px solid #E5E7EB',
                padding: '1rem 3rem 1rem 1rem',
                fontSize: '0.875rem',
                boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
              }}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={togglePasswordVisibility}
              style={{ position: 'absolute', top: 0, bottom: 0, right: '0', display: 'grid', placeContent: 'center', paddingRight: '1rem', cursor: 'pointer' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '1rem', height: '1rem', color: '#9CA3AF' }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {passwordVisible ? (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                )}
              </svg>
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{
              display: 'inline-block',
              borderRadius: '0.5rem',
              backgroundColor: '#3B82F6',
              padding: '0.75rem 1.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#FFFFFF'
            }}
          >
            Sign in
          </button>
        </div>
      </form>

      {message && (
        <div >
          {message}
        </div>
      )}
    </div>
  );
}

