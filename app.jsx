
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>


// I changed "set_boards" to "setBoards" and "task" to "tasks for consistency with line 9,16, 69, 71,82

function App() {

  const [boards, setBoards] = React.useState(() => {
    // Load from localStorage on initial render required for 3.3
    const saved = localStorage.getItem('kanban_boards');
    if (saved) {
      return JSON.parse(saved);
    }
    // structure of board
    return [
      {
        id: "board1",
        title: "To Do",
        tasks: [
          {
            id: "task1",
            title: "Sample Task",
            description: "Example task",
            created_At: "2026-03-28",
            due_date: "2026-04-15"
          }
        ]
      },
      {
        id: "board2",
        title: "In Progress",
        tasks: []
      },
      {
        id: "board3",
        title: "Done",
        tasks: []
      }
    ];
  });

  // Drag state to track what's being dragged
  const [draggedTaskId, setDraggedTaskId] = React.useState(null);
  const [draggedFromBoardId, setDraggedFromBoardId] = React.useState(null);

  // 3.3: Save to localStorage whenever boards change
  React.useEffect(() => {
    localStorage.setItem('kanban_boards', JSON.stringify(boards));
  }, [boards]);

  // 3.3: DRAG HANDLER whenever User starts dragging
  const handleDragStart = (e, taskId, boardId) => {
    setDraggedTaskId(taskId);
    setDraggedFromBoardId(boardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // 3.3: DRAG HANDLER whenever User drags over board
  // Must call preventDefault() to allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // 3.3: DRAG HANDLER whenever User drops task
  const handleDrop = (e, targetBoardId) => {
    e.preventDefault();

    if (!draggedTaskId || !draggedFromBoardId) return;

    // Find the task being dragged
    const taskToMove = boards
      .find(b => b.id === draggedFromBoardId)
      ?.tasks.find(t => t.id === draggedTaskId);

    if (!taskToMove) return;

    // Update boards. Remove from source, add to target
    const updatedBoards = boards.map(board => {
      // Remove from source board
      if (board.id === draggedFromBoardId) {
        return {
          ...board,
          tasks: board.tasks.filter(task => task.id !== draggedTaskId)
        };
      }
      // Add to target board
      if (board.id === targetBoardId) {
        return {
          ...board,
          tasks: [...board.tasks, taskToMove]
        };
      }
      return board;
    });

    setBoards(updatedBoards);
    setDraggedTaskId(null);
    setDraggedFromBoardId(null);
  };

  // Counters
  const totalBoards = boards.length;
  const totalTasks = boards.reduce((sum, b) => sum + b.tasks.length, 0);

  //Board Operations
  function addBoard(title) {
    const newBoard = {
      id: Date.now().toString(),
      title,
      tasks: []
    };
    setBoards([...boards, newBoard]);
  }

  // Changed Title to title to match the parameter originally in line 33,69,71,91, and 111.
  function rename(id, title) {
    setBoards(boards.map(b => b.id === id ? { ...b, title: title } : b));
  }

  function deleteBoard(id) {
    setBoards(boards.filter(b => b.id !== id));
  }

  // Added ...b to keep board id and title.
  function addTask(boardId, task) {
    setBoards(boards.map(b => {
      if (b.id === boardId) {
        return {
          ...b,  // Was missing this
          tasks: [...b.tasks, task]
        };
      }
      return b;
    }));
  }

  // Changed boardId === boardId to board.id === boardId
  // Changed return board to return boards
  const editTask = (boardId, taskId) => {
    const newTitle = prompt("New title:");
    if (!newTitle) return;
    const newDescription = prompt("New description:");
    const newDueDate = prompt("New due date:");

    setBoards(boards.map(board => {
      if (board.id === boardId) {  // Was boardId === boardId
        return {
          ...board,
          tasks: board.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                title: newTitle || task.title,
                description: newDescription || task.description,
                due_date: newDueDate || task.due_date
              };
            }
            return task;
          })
        };
      }
      return board;  // Was return board (undefined)
    }));
  };

  // Changed boardId === boardId to board.id === boardId
  const deleteTask = (boardId, taskId) => {
    setBoards(boards.map(board => {
      if (board.id === boardId) {  // Was boardId === boardId
        return {
          ...board,
          tasks: board.tasks.filter(task => task.id !== taskId)
        };
      }
      return board;
    }));
  };

  // ========== Render ==========
  return (
    <div style={{ padding: '20px' }}>
      <h1>Kanban Board</h1>
      <p>Boards: {totalBoards} | Tasks: {totalTasks}</p>

      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }}>
        {boards.map(board => (
          <Board
            key={board.id}
            board={board}
            addTask={addTask}
            deleteTask={deleteTask}
            deleteBoard={deleteBoard}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            editTask={editTask}
          />
        ))}
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
