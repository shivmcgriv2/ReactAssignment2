function Board({ board, addTask, deleteTask, deleteBoard, handleDragStart, handleDragOver, handleDrop, editTask }) {
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newTaskDesc, setNewTaskDesc] = React.useState('');
  const [newTaskDue, setNewTaskDue] = React.useState('');

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      created_At: new Date().toLocaleDateString(),
      due_date: newTaskDue
    };

    addTask(board.id, newTask);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDue('');
  };

  return (
    <div
      // 3.3: Drag events
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, board.id)}
      style={{
        flex: 1,
        minWidth: '300px',
        backgroundColor: '#f0f0f0',
        border: '2px solid #333',
        borderRadius: '8px',
        padding: '15px',
        minHeight: '500px'
      }}
    >
      <h2>{board.title}</h2>
      <p>Tasks: {board.tasks.length}</p>

      {/* Task List */}
      <div style={{ marginBottom: '20px' }}>
        {board.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            boardId={board.id}
            deleteTask={deleteTask}
            handleDragStart={handleDragStart}
            editTask={editTask}
          />
        ))}
      </div>

      {/* Add Task Form */}
      <div style={{ borderTop: '1px solid #ccc', paddingTop: '10px' }}>
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          style={{ width: '100%', padding: '5px', marginBottom: '5px', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTaskDesc}
          onChange={(e) => setNewTaskDesc(e.target.value)}
          style={{ width: '100%', padding: '5px', marginBottom: '5px', boxSizing: 'border-box' }}
        />
        <input
          type="date"
          value={newTaskDue}
          onChange={(e) => setNewTaskDue(e.target.value)}
          style={{ width: '100%', padding: '5px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <button onClick={handleAddTask} style={{ width: '48%', padding: '8px', marginRight: '4%' }}>
          Add Task
        </button>
        <button onClick={() => deleteBoard(board.id)} style={{ width: '48%', padding: '8px', backgroundColor: '#dc3545', color: 'white' }}>
          Delete Board
        </button>
      </div>
    </div>
  );
}
