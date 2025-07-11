import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from './DataContext';

function Students() {
  const { offerings, students, setStudents, courses, courseTypes } = useContext(DataContext);
  const [name, setName] = useState('');
  const [offeringId, setOfferingId] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !offeringId) return;

    setStudents([...students, {
      id: uuidv4(),
      name,
      offeringId
    }]);
    setName('');
    setOfferingId('');
  };

  return (
    <div className='page'>
      <h3>Student Registration</h3>
      <form onSubmit={handleRegister}>
        <label>Student Name</label>
        <input
          type='text'
          placeholder='e.g. John Doe'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Offering</label>
        <select value={offeringId} onChange={(e) => setOfferingId(e.target.value)}>
          <option value=''>Select Offering</option>
          {offerings.map(o => {
            const course = courses.find(c => c.id === o.courseId)?.name || 'N/A';
            const type = courseTypes.find(t => t.id === o.typeId)?.name || 'N/A';
            return (
              <option key={o.id} value={o.id}>{type} - {course}</option>
            );
          })}
        </select>
        <button type='submit'>Register</button>
      </form>

      <ul>
        {students.map(s => {
          const offering = offerings.find(o => o.id === s.offeringId);
          const course = courses.find(c => c.id === offering?.courseId)?.name || 'N/A';
          const type = courseTypes.find(t => t.id === offering?.typeId)?.name || 'N/A';
          return (
            <li key={s.id}>{s.name} - {type} - {course}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default Students;
