import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@mui/material';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  useEffect(() => {
    // Fetch teachers data from fake API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const teacherData = response.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        setTeachers(teacherData);
      })
      .catch(error => console.error('Error fetching teachers:', error));
  }, []);

  // Create new teacher
  const handleCreateTeacher = (newTeacher) => {
    axios.post('https://jsonplaceholder.typicode.com/users', newTeacher)
      .then(response => {
        setTeachers([...teachers, { id: teachers.length + 1, ...newTeacher }]);
      })
      .catch(error => console.error('Error creating teacher:', error));
  };

  // Edit teacher
  const handleEditTeacher = (editedTeacher) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${editedTeacher.id}`, editedTeacher)
      .then(response => {
        setTeachers(teachers.map(teacher => (teacher.id === editedTeacher.id ? editedTeacher : teacher)));
      })
      .catch(error => console.error('Error editing teacher:', error));
  };

  // Delete teacher
  const handleDeleteTeacher = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setTeachers(teachers.filter(teacher => teacher.id !== id));
      })
      .catch(error => console.error('Error deleting teacher:', error));
  };

  // Open modal for create or edit
  const handleOpenModal = (teacher = null) => {
    setCurrentTeacher(teacher);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentTeacher(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal(params.row)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ ml: 1 }}  
            onClick={() => handleDeleteTeacher(params.row.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenModal()}>Add Teacher</Button>
      <DataTable rows={teachers} columns={columns} />
      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={currentTeacher ? handleEditTeacher : handleCreateTeacher}
        initialData={currentTeacher}
      />
    </div>
  );
};

export default Teachers;
