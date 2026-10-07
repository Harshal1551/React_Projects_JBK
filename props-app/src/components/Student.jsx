function Student(props) {
  return (
    <div>
      <h2>Student Information</h2>

      <p>Name: {props.student.name}</p>
      <p>Age: {props.student.age}</p>
      <p>Course: {props.student.course}</p>
    </div>
  );
}

export default Student;