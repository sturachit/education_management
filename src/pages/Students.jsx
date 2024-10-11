import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@mui/material';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null); // For editing

  useEffect(() => {
    // Fetch students data from fake API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const studentData = response.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email
        }));
        setStudents(studentData);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  // Create new student
  const handleCreateStudent = (newStudent) => {
    axios.post('https://jsonplaceholder.typicode.com/users', newStudent)
      .then(response => {
        // Simulate adding a student
        setStudents([...students, { id: students.length + 1, ...newStudent }]);
      })
      .catch(error => console.error('Error creating student:', error));
  };

  // Edit student
  const handleEditStudent = (editedStudent) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${editedStudent.id}`, editedStudent)
      .then(response => {
        setStudents(students.map(student => (student.id === editedStudent.id ? editedStudent : student)));
      })
      .catch(error => console.error('Error editing student:', error));
  };

  // Delete student
  const handleDeleteStudent = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  // Open modal for create or edit
  const handleOpenModal = (student = null) => {
    setCurrentStudent(student);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentStudent(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <div>
          <Button variant="contained" color="primary" size="small" onClick={() => handleOpenModal(params.row)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ ml: 1 }}  
            onClick={() => handleDeleteStudent(params.row.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenModal()}>Add Student</Button>
      <DataTable rows={students} columns={columns} />
      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={currentStudent ? handleEditStudent : handleCreateStudent}
        initialData={currentStudent}
      />
    </div>
  );
};

export default Students;
