const Tasks = ({ todos }) => {
  if (todos === null) {
    return "LOADING...";
  } else if (todos?.tasks?.length !== 0) {
    return (
      <>
        {todos?.tasks.map((task) => (
          <h1 key={task.id}>{task.title}</h1>
        ))}
      </>
    );
  } else {
    return null;
  }
};

export default Tasks;
