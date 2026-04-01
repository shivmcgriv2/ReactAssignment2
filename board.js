function Board({ board, addTask, deleteTask, deleteBoard, renameBoard, handleDragStart, handleDragOver, handleDrop, editTask }) {
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newTaskDesc, setNewTaskDesc] = React.useState('');
  const [newTaskDue, setNewTaskDue] = React.useState('');
  const [isRenaming, setIsRenaming] = React.useState(false);
  const [renameValue, setRenameValue] = React.useState(board.title);

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
      {/* 3.1 Rename UI */}
      {isRenaming ? (
        <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
          <input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            style={{ padding: '4px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button onClick={() => {
            if (renameValue.trim()) renameBoard(board.id, renameValue.trim());
            setIsRenaming(false);
          }} style={{ padding: '4px 8px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✓</button>
          <button onClick={() => setIsRenaming(false)}
            style={{ padding: '4px 8px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <h2 style={{ margin: 0 }}>{board.title}</h2>
          <button onClick={() => { setRenameValue(board.title); setIsRenaming(true); }}
            style={{ padding: '2px 8px', fontSize: '12px', background: '#ffc107', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Rename</button>
        </div>
      )}

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
