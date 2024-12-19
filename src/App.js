import React, { useEffect, useState } from 'react';
import api from '../src/services/api';
import Swal from 'sweetalert2';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Box,
  Typography,
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', email: '', dob: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formData.id ? 'put' : 'post';
    const url = formData.id ? `/users/${formData.id}` : '/users';

    api[method](url, formData)
      .then(() => {
        Swal.fire('Success', 'User saved successfully', 'success');
        fetchUsers();
        setFormData({ id: null, name: '', email: '', dob: '' });
        handleClose();
      })
      .catch(error => console.error(error));
  };

  const handleEdit = (user) => {
    setFormData(user);
    setOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/users/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
            fetchUsers();
          })
          .catch(error => console.error(error));
      }
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        User List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>
        Add User
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.dob}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" onClick={() => handleEdit(user)} style={{ marginRight: '10px' }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {formData.id ? 'Edit User' : 'Add User'}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <TextField
            label="Date of Birth"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            required
          />
          <Button variant="contained" type="submit" color="primary" fullWidth>
            {formData.id ? 'Update' : 'Add'} User
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default UserList;
