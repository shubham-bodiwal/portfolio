import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { FaTimes } from "react-icons/fa";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  name: string;
  items: Task[];
}

interface Columns {
  [key: string]: Column;
}

const initialColumns: Columns = {
  todo: {
    name: "To Do",
    items: [
      { id: uuidv4(), title: "Create wireframes", description: "Low-fidelity sketches for layout" },
      { id: uuidv4(), title: "Research competitors", description: "Review UI trends in market" }
    ]
  },
  inProgress: { name: "In Progress", items: [] },
  review: { name: "Review", items: [] },
  done: { name: "Done", items: [] }
};

const getSavedTasks = (): Columns => {
  const data = localStorage.getItem("task-board");
  return data ? JSON.parse(data) : initialColumns;
};

// Styled components
const Wrapper = styled.div`padding: 2rem; background: #0f111a; color: #fff; min-height: 100vh;`;
const Title = styled.h1`font-size: 2.4rem; margin-bottom: 2rem; text-align: center; color: #00f5d4;`;
const Board = styled.div`display: flex; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;`;
const Column = styled.div`background: #181b2f; border-radius: 12px; padding: 1rem; width: 22%; min-width: 250px; display: flex; flex-direction: column; box-shadow: 0 0 0 1px #222;`;
const ColumnTitle = styled.h2`font-size: 1.25rem; color: #00f5d4; margin-bottom: 1rem; text-align: center;`;
const DroppableArea = styled.div`min-height: 50px; flex-grow: 1;`;
const TaskCard = styled.div`
  background: #1c1f3b;
  border: 1px solid #333;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 0 6px rgba(0, 245, 212, 0.1);
  cursor: grab;
  &:hover { background: #222647; }
  &.dragging { opacity: 0; }
`;
const TrashZone = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  border: 2px dashed #ff4d4f;
  border-radius: 10px;
  text-align: center;
  color: #ff4d4f;
  font-weight: bold;
  background: #1b1e2b;
  font-size: 1rem;
`;
const AddTaskButton = styled.button`
  margin: 1rem auto 2rem;
  display: block;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  background: #00f5d4;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
  &:hover { background: #0ff; }
`;
const ModalOverlay = styled.div`
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6); display: flex;
  align-items: center; justify-content: center; z-index: 1000;
`;
const ModalContent = styled.div`
  background: #181b2f;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  position: relative;
`;
const ModalTitle = styled.h3`margin-bottom: 1rem; color: #00f5d4; font-size: 1.2rem;`;
const Input = styled.input`
  width: 100%; padding: 0.75rem; margin-bottom: 1rem;
  border-radius: 8px; border: 1px solid #333;
  background: #1b1e2b; color: #fff;
`;
const Select = styled.select`
  width: 100%; padding: 0.75rem; margin-bottom: 1rem;
  border-radius: 8px; border: 1px solid #333;
  background: #1b1e2b; color: #fff;
`;
const CloseIcon = styled(FaTimes)`
  position: absolute; top: 1rem; right: 1rem;
  color: #888; cursor: pointer; font-size: 1rem;
  transition: color 0.2s ease;
  &:hover { color: #fff; }
`;
const ConfirmButton = styled.button`
  background: #ff4d4f; color: white; padding: 0.6rem 1.2rem;
  border: none; border-radius: 8px; font-weight: bold;
  margin-right: 1rem; cursor: pointer;
  &:hover { background: #ff6b6d; }
`;
const CancelButton = styled.button`
  background: #444; color: white; padding: 0.6rem 1.2rem;
  border: none; border-radius: 8px; font-weight: bold;
  cursor: pointer;
  &:hover { background: #666; }
`;

export default function DragDrop() {
    const [columns, setColumns] = useState<Columns>(getSavedTasks);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<{ taskId: string, sourceColumnId: string } | null>(null);
    const [newTask, setNewTask] = useState<{ title: string; description: string; column: string }>({ title: "", description: "", column: "todo" });
    const [draggedId, setDraggedId] = useState<string | null>(null);
  
    useEffect(() => {
      localStorage.setItem("task-board", JSON.stringify(columns));
    }, [columns]);
  
    const onDrop = (e: React.DragEvent<HTMLDivElement>, destColumnId: string) => {
      const taskId = e.dataTransfer.getData("taskId");
      const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
      setDraggedId(null);
  
      if (!taskId || !sourceColumnId) return;
  
      if (!destColumnId || !(destColumnId in columns) && destColumnId !== "trash") return;
  
      if (destColumnId === "trash") {
        setConfirmDelete({ taskId, sourceColumnId });
        return;
      }
  
      if (destColumnId === sourceColumnId) return;
  
      const task = columns[sourceColumnId].items.find(item => item.id === taskId);
      if (!task) return;
  
      const newSourceItems = columns[sourceColumnId].items.filter(item => item.id !== taskId);
      const newDestItems = [...columns[destColumnId].items, task];
  
      setColumns({
        ...columns,
        [sourceColumnId]: { ...columns[sourceColumnId], items: newSourceItems },
        [destColumnId]: { ...columns[destColumnId], items: newDestItems }
      });
    };
  
    const handleAddTask = (): void => {
      const id = uuidv4();
      const task: Task = { id, title: newTask.title, description: newTask.description };
      setColumns({
        ...columns,
        [newTask.column]: {
          ...columns[newTask.column],
          items: [...columns[newTask.column].items, task]
        }
      });
      setNewTask({ title: "", description: "", column: "todo" });
      setShowModal(false);
    };
  
    const confirmDeleteTask = (): void => {
      if (!confirmDelete) return;
      const { taskId, sourceColumnId } = confirmDelete;
      const newItems = columns[sourceColumnId].items.filter(item => item.id !== taskId);
      setColumns({
        ...columns,
        [sourceColumnId]: { ...columns[sourceColumnId], items: newItems }
      });
      setConfirmDelete(null);
    };
  

  return (
    <Wrapper>
      <Title>🧩 Project Task Board</Title>
      <AddTaskButton onClick={() => setShowModal(true)}>+ Add Task</AddTaskButton>

      <Board>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column
            key={columnId}
            onDragOver={e => e.preventDefault()}
            onDrop={e => onDrop(e, columnId)}
          >
            <ColumnTitle>{column.name}</ColumnTitle>
            <DroppableArea>
              {column.items.map(item => (
                <TaskCard
                  key={item.id}
                  draggable
                  className={draggedId === item.id ? "dragging" : ""}
                  onDragStart={e => {
                    setDraggedId(item.id);
                    e.dataTransfer.setData("taskId", item.id);
                    e.dataTransfer.setData("sourceColumnId", columnId);
                  }}
                >
                  <strong>{item.title}</strong>
                  <p style={{ fontSize: "0.8rem", color: "#aaa" }}>{item.description}</p>
                </TaskCard>
              ))}
            </DroppableArea>
          </Column>
        ))}
      </Board>

      <TrashZone
        onDragOver={e => e.preventDefault()}
        onDrop={e => onDrop(e, "trash")}
      >
        🗑️ Drop here to delete task
      </TrashZone>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseIcon onClick={() => setShowModal(false)} />
            <ModalTitle>Add New Task</ModalTitle>
            <Input
              placeholder="Task title"
              value={newTask.title}
              onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newTask.description}
              onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            />
            <Select
              value={newTask.column}
              onChange={e => setNewTask({ ...newTask, column: e.target.value })}
            >
              {Object.entries(columns).map(([key, col]) => (
                <option value={key} key={key}>{col.name}</option>
              ))}
            </Select>
            <AddTaskButton onClick={handleAddTask}>Add</AddTaskButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {confirmDelete && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Are you sure you want to delete this task?</ModalTitle>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <ConfirmButton onClick={confirmDeleteTask}>Delete</ConfirmButton>
              <CancelButton onClick={() => setConfirmDelete(null)}>Cancel</CancelButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}
