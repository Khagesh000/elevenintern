import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from './DataContext';

function Courses() {
  const { courses, setCourses } = useContext(DataContext);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editId) {
      setCourses(courses.map(c => c.id === editId ? { ...c, name: input } : c));
      setEditId(null);
    } else {
      setCourses([...courses, { id: uuidv4(), name: input }]);
    }
    setInput('');
  };

  const handleEdit = (id) => {
    const course = courses.find(c => c.id === id);
    setInput(course.name);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className='page'>
      <h3>Courses</h3>
      <form onSubmit={handleSubmit}>
        <label>Course Name</label>
        <input
          type='text'
          placeholder='e.g. English, Hindi'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'>{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => handleEdit(course.id)}>Edit</button>
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;