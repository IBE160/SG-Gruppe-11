import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const fetchTasks = async () => {
  const { data } = await axios.get('/api/tasks');
  return data;
};

const createTask = async (newTask) => {
  const { data } = await axios.post('/api/tasks', newTask);
  return data;
};

const updateTask = async (updatedTask) => {
  const { data } = await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask);
  return data;
};

const deleteTask = async (taskId) => {
  await axios.delete(`/api/tasks/${taskId}`);
};

export default function TasksPage() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });

  const [title, setTitle] = useState('');

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleCreateTask = () => {
    createTaskMutation.mutate({ title });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
        />
        <button onClick={handleCreateTask} disabled={createTaskMutation.isLoading}>
          {createTaskMutation.isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={(e) =>
                updateTaskMutation.mutate({ ...task, isCompleted: e.target.checked })
              }
            />
            {task.title}
            <button onClick={() => deleteTaskMutation.mutate(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
