import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [students, setStudents] = useState([]);

  return (
    <DataContext.Provider value={{
      courseTypes, setCourseTypes,
      courses, setCourses,
      offerings, setOfferings,
      students, setStudents
    }}>
      {children}
    </DataContext.Provider>
  );
};