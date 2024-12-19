import React, { useEffect, useState } from 'react';
import api from '../src/services/api';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', dob: '' });

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
            })
            .catch(error => console.error(error));
    };

    const handleEdit = (user) => {
        setFormData(user);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
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

    return (
        <div className="container">
            <h1 className="text-center">User List</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{formData.id ? 'Update' : 'Add'} User</button>
            </form>

            <ul className="list-group">
                {users.map(user => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
                        {user.name} - {user.email}
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(user)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;