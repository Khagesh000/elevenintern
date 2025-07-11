import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from './DataContext';

function CourseTypes() {
  const { courseTypes, setCourseTypes } = useContext(DataContext);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editId) {
      setCourseTypes(courseTypes.map(type =>
        type.id === editId ? { ...type, name: input } : type
      ));
      setEditId(null);
    } else {
      setCourseTypes([...courseTypes, { id: uuidv4(), name: input }]);
    }
    setInput('');
  };

  const handleEdit = (id) => {
    const type = courseTypes.find(t => t.id === id);
    setInput(type.name);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setCourseTypes(courseTypes.filter(t => t.id !== id));
  };

  return (
    <div className='page'>
      <h3>Course Types</h3>
      <form onSubmit={handleSubmit}>
        <label>Course Type</label>
        <input
          type='text'
          placeholder='e.g. Individual, Group'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit'>{editId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {courseTypes.map((type) => (
          <li key={type.id}>
            {type.name}
            <button onClick={() => handleEdit(type.id)}>Edit</button>
            <button onClick={() => handleDelete(type.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseTypes;
