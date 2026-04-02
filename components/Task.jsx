function Task({ task, boardId, deleteTask, handleDragStart, editTask, handleDragOver, handleDrop }) {
  const isDueOverdue = task.due_date && new Date(task.due_date) < new Date();

  return (
    <div
      draggable="true"
      onDragStart={(e) => handleDragStart(e, task.id, boardId)}
      onDragOver={handleDragOver}
      onDrop={(e) => {
        e.stopPropagation(); // prevent board's onDrop from also firing
        handleDrop(e, boardId, task.id);
      }}
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'grab',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <h4 style={{ margin: '0 0 5px 0' }}>{task.title}</h4>
      <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>{task.description}</p>

      <div style={{ fontSize: '12px', color: '#999', marginBottom: '10px' }}>
        <div>Created: {task.created_At}</div>
        <div style={{ color: isDueOverdue ? '#dc3545' : '#666', fontWeight: isDueOverdue ? 'bold' : 'normal' }}>
          Due: {task.due_date} {isDueOverdue && '(OVERDUE)'}
        </div>
      </div>

      <button
        onClick={() => editTask(boardId, task.id)}
        style={{ marginRight: '5px', padding: '4px 8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
      >
        Edit
      </button>
      <button
        onClick={() => deleteTask(boardId, task.id)}
        style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
      >
        Delete
      </button>
    </div>
  );
}
