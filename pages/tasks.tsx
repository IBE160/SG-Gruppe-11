import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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

const priorityOptions = ['LOW', 'MEDIUM', 'HIGH'];

export default function TasksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks, enabled: status === 'authenticated' });

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingDueDate, setEditingDueDate] = useState('');
  const [editingPriority, setEditingPriority] = useState('MEDIUM');

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskTitle('');
      setNewTaskPriority('MEDIUM');
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setEditingTaskId(null);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleCreateTask = () => {
    createTaskMutation.mutate({ title: newTaskTitle, priority: newTaskPriority });
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    setEditingPriority(task.priority || 'MEDIUM');
  };

  const handleSaveEdit = (task) => {
    updateTaskMutation.mutate({
      ...task,
      title: editingTitle,
      dueDate: editingDueDate ? new Date(editingDueDate) : null,
      priority: editingPriority,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'red';
      case 'MEDIUM':
        return 'orange';
      case 'LOW':
        return 'green';
      default:
        return 'black';
    }
  };

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div>
      <h1>Tasks</h1>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
          {priorityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button onClick={handleCreateTask} disabled={createTaskMutation.isLoading}>
          {createTaskMutation.isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <input
                  type="date"
                  value={editingDueDate}
                  onChange={(e) => setEditingDueDate(e.target.value)}
                />
                <select value={editingPriority} onChange={(e) => setEditingPriority(e.target.value)}>
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <button onClick={() => handleSaveEdit(task)} disabled={updateTaskMutation.isLoading}>
                  Save
                </button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={(e) =>
                    updateTaskMutation.mutate({ ...task, isCompleted: e.target.checked })
                  }
                />
                <span style={{ color: getPriorityColor(task.priority) }}>
                  [{task.priority}]
                </span>{' '}
                {task.title}
                {task.dueDate && ` - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                <button onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => deleteTaskMutation.mutate(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
