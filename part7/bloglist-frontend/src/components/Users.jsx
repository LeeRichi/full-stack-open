// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getAllUsers } from '../request';

// const Users = () => {
//   const { data: users = [], refetch } = useQuery({
//     queryKey: ['users'],
//     queryFn: getAllUsers,
// 	});

// 	if (!users) {
//     return null
//   }

//   return (
//     <div>
//       <h2>Users</h2>
//       <table>
//         <thead>
//           <tr>
//             <th></th>
//             <th>Number of Blogs</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td style={{ margin: '20px', padding: '10px' }}>{user.name}</td>
// 							<td>{user.blogs.length}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../request';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Users = () => {
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  if (!users) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Typography variant="h4" sx={{ margin: 2 }}>Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Number of Blogs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;
