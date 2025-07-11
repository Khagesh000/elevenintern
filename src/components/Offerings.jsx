import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from './DataContext';

function Offerings() {
  const { courses, courseTypes, offerings, setOfferings } = useContext(DataContext);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !selectedTypeId) return;

    const exists = offerings.find(
      o => o.courseId === selectedCourseId && o.typeId === selectedTypeId
    );
    if (!exists) {
      setOfferings([...offerings, {
        id: uuidv4(),
        courseId: selectedCourseId,
        typeId: selectedTypeId
      }]);
    }
  };

  const handleDelete = (id) => {
    setOfferings(offerings.filter(o => o.id !== id));
  };

  return (
    <div className='page'>
      <h3>Course Offerings</h3>
      <form onSubmit={handleSubmit}>
        <label>Type</label>
        <select value={selectedTypeId} onChange={(e) => setSelectedTypeId(e.target.value)}>
          <option value=''>Select Type</option>
          {courseTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <label>Course</label>
        <select value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
          <option value=''>Select Course</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button type='submit'>Add Offering</button>
      </form>

      <ul>
        {offerings.map(o => {
          const course = courses.find(c => c.id === o.courseId)?.name || 'N/A';
          const type = courseTypes.find(t => t.id === o.typeId)?.name || 'N/A';
          return (
            <li key={o.id}>
              {type} - {course}
              <button onClick={() => handleDelete(o.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Offerings;
