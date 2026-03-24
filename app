/*  for later
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
*/

// constant totalBoards and totalTasks
const totalBoards = boards.length;
const totalTasks = boards.reduce((sum, b) => sum + b.tasks.length, 0);

// creates a new board
function addboard (title){
    const newBoard = {
        id: Date.now().toString(),
        title,
        tasks: []
    };
    setBoards([...boards, newBoard]);
}
// rename the board
function rename (id,title){
   setBoards(boards.map(b =>b.id === id ? { ...b, title: Title } : b));
}
// if id is the same it will delete the board
function deleteboard(id){
    setBoards(boards.filter(b=>b.id !== id));

}

// structure of board
const [boards, set_boards ] = React.useState([
    {
        id: "board1structure",
        title: "to_do",
               task: [
            {
                id: "task1",
                title: "to_do1",
                description: "5 things to do",
                created_At: "2026-03-20",
                due_date: "2027-03-20"
            }
        ]

    }
]);

// add a task
function addTask(BoardId, task){
    setBoards(boards.map(b =>{
        if (b.id === BoardId)
        {
            return {
                tasks: [...b.tasks, task] 
            };
        }
        return b;
    }));
};

const newtasks = {
    id: Date.now().toString(), 
    title,
    description,
    created_At: new Date().toLocaleDateString(),
    due_date
};

// edit task
const editTask = (BoardId, taskId) => {
const newTitle = prompt("New title:");
const newDescription = prompt("New description:");
const newDueDate = prompt("New due date:");

  setBoards(boards.map(boards => {
    if (boardId === boardId) {
      return {
        ...boards,
        tasks: boards.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              title: newTitle || task.title,
              description: newDescription || task.description,
              dueDate: newDueDate || task.dueDate
            };
          }
          return task;
        })
      };
    }
    return board;
  }));
};

// delete task
const deleteTask = (BoardId, taskId) => {

  setBoards(boards.map(boards => {
    if (boardId === boardId) {
      return {
        ...boards,
        tasks: boards.tasks.filter(task => task.id !== taskId)
    
    };
}
    return board;
  }));
};

// 3.3 Drag-and-Drop Functionality


