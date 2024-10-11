import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import FormModal from '../components/FormModal';
import { Button } from '@mui/material';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    // Fetch courses data from fake API (using posts for simulation)
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const courseData = response.data.map(post => ({
          id: post.id,
          name: post.title,
          description: post.body
        }));
        setCourses(courseData);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Create new course
  const handleCreateCourse = (newCourse) => {
    axios.post('https://jsonplaceholder.typicode.com/posts', newCourse)
      .then(response => {
        setCourses([...courses, { id: courses.length + 1, ...newCourse }]);
      })
      .catch(error => console.error('Error creating course:', error));
  };

  // Edit course
  const handleEditCourse = (editedCourse) => {
    axios.put(`https://jsonplaceholder.typicode.com/posts/${editedCourse.id}`, editedCourse)
      .then(response => {
        setCourses(courses.map(course => (course.id === editedCourse.id ? editedCourse : course)));
      })
      .catch(error => console.error('Error editing course:', error));
  };

  // Delete course
  const handleDeleteCourse = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setCourses(courses.filter(course => course.id !== id));
      })
      .catch(error => console.error('Error deleting course:', error));
  };

  // Open modal for create or edit
  const handleOpenModal = (course = null) => {
    setCurrentCourse(course);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCourse(null);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Course Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
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
            onClick={() => handleDeleteCourse(params.row.id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenModal()}>Add Course</Button>
      <DataTable rows={courses} columns={columns} />
      <FormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={currentCourse ? handleEditCourse : handleCreateCourse}
        initialData={currentCourse}
      />
    </div>
  );
};

export default Courses;
