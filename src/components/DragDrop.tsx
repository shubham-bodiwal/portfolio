import  { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { FaTimes } from "react-icons/fa";

const initialColumns = {
  todo: {
    name: "To Do",
    items: [
      { id: uuidv4(), title: "Create wireframes", description: "Low-fidelity sketches for layout" },
      { id: uuidv4(), title: "Research competitors", description: "Review UI trends in market" }
    ]
  },
  inProgress: {
    name: "In Progress",
    items: []
  },
  review: {
    name: "Review",
    items: []
  },
  done: {
    name: "Done",
    items: []
  }
};

const getSavedTasks = () => {
  const data = localStorage.getItem("task-board");
  return data ? JSON.parse(data) : initialColumns;
};

const Wrapper = styled.div`
  padding: 2rem;
  background: #0f111a;
  color: #fff;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #00f5d4;
`;

const Board = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Column = styled.div`
  background: #181b2f;
  border-radius: 12px;
  padding: 1rem;
  width: 22%;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 1px #222;
`;

const ColumnTitle = styled.h2`
  font-size: 1.25rem;
  color: #00f5d4;
  margin-bottom: 1rem;
  text-align: center;
`;

const DroppableArea = styled.div`
  min-height: 50px;
  flex-grow: 1;
`;

const TaskCard = styled.div`
  background: #1c1f3b;
  border: 1px solid #333;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  box-shadow: 0 0 6px rgba(0, 245, 212, 0.1);

  &:hover {
    background: #222647;
  }
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

  &:hover {
    background: #0ff;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #181b2f;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  position: relative;
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  color: #00f5d4;
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1b1e2b;
  color: #fff;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #1b1e2b;
  color: #fff;
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #888;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }
`;

export default function DragDrop() {
  const [columns, setColumns] = useState(getSavedTasks);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    column: "todo"
  });

  useEffect(() => {
    localStorage.setItem("task-board", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === "trash") {
      const sourceColumn = columns[source.droppableId];
      const filtered = sourceColumn.items.filter((item: any) => item.id !== draggableId);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: filtered
        }
      });
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const draggedItem = sourceColumn.items.find((item: any) => item.id === draggableId);
    if (!draggedItem) return;

    const newSourceItems = [...sourceColumn.items].filter(item => item.id !== draggableId);
    const newDestItems = [...destColumn.items];
    newDestItems.splice(destination.index, 0, draggedItem);

    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: newSourceItems },
      [destination.droppableId]: { ...destColumn, items: newDestItems }
    });
  };

  const handleAddTask = () => {
    const id = uuidv4();
    const task = {
      id,
      title: newTask.title,
      description: newTask.description
    };
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

  return (
    <Wrapper>
      <Title>🧩 Project Task Board</Title>
      <AddTaskButton onClick={() => setShowModal(true)}>+ Add Task</AddTaskButton>
      <DragDropContext onDragEnd={onDragEnd}>
        <Board>
          {Object.entries(columns).map(([columnId, column]) => (
            <Column key={columnId}>
              <ColumnTitle>{column.name}</ColumnTitle>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <DroppableArea ref={provided.innerRef} {...provided.droppableProps}>
                    {column.items.map((item, index) => (
                      <Draggable draggableId={item.id} index={index} key={item.id}>
                        {(provided) => (
                          <TaskCard
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <strong>{item.title}</strong>
                            <p style={{ fontSize: "0.8rem", color: "#aaa" }}>{item.description}</p>
                          </TaskCard>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </DroppableArea>
                )}
              </Droppable>
            </Column>
          ))}
        </Board>
        <Droppable droppableId="trash">
          {(provided) => (
            <TrashZone ref={provided.innerRef} {...provided.droppableProps}>
              🗑️ Drop here to delete task
              {provided.placeholder}
            </TrashZone>
          )}
        </Droppable>
      </DragDropContext>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseIcon onClick={() => setShowModal(false)} />
            <ModalTitle>Add New Task</ModalTitle>
            <Input
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <Select
              value={newTask.column}
              onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
            >
              {Object.keys(columns).map((key) => (
                <option value={key} key={key}>{columns[key].name}</option>
              ))}
            </Select>
            <AddTaskButton onClick={handleAddTask}>Add</AddTaskButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Wrapper>
  );
}
