import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
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

const startTimer = async (taskId) => {
  await axios.post(`/api/tasks/${taskId}/start-timer`);
};

const stopTimer = async (taskId, elapsedTime) => {
  const { data } = await axios.post(`/api/tasks/${taskId}/stop-timer`, { elapsedTime });
  return data;
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

  const [runningTimerId, setRunningTimerId] = useState(null);
  const [timerStartTime, setTimerStartTime] = useState(null);
  const [currentElapsedTime, setCurrentElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (runningTimerId && timerStartTime !== null) {
      intervalRef.current = setInterval(() => {
        setCurrentElapsedTime(Math.floor((Date.now() - timerStartTime) / 1000 / 60)); // in minutes
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setCurrentElapsedTime(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [runningTimerId, timerStartTime]);


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

  const startTimerMutation = useMutation({
    mutationFn: startTimer,
    onSuccess: (data, taskId) => {
      setRunningTimerId(taskId);
      setTimerStartTime(Date.now());
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      alert('Failed to start timer');
    },
  });

  const stopTimerMutation = useMutation({
    mutationFn: ({ taskId, elapsedTime }) => stopTimer(taskId, elapsedTime),
    onSuccess: () => {
      setRunningTimerId(null);
      setTimerStartTime(null);
      setCurrentElapsedTime(0);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: () => {
      alert('Failed to stop timer');
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

  const handleStartTimer = (taskId) => {
    startTimerMutation.mutate(taskId);
  };

  const handleStopTimer = (taskId) => {
    stopTimerMutation.mutate({ taskId, elapsedTime: currentElapsedTime });
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
                (Time Spent: {task.timeSpent} mins)
                {runningTimerId === task.id ? (
                  <>
                    <span>Running: {currentElapsedTime} mins</span>
                    <button onClick={() => handleStopTimer(task.id)} disabled={stopTimerMutation.isLoading}>
                      Stop Timer
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleStartTimer(task.id)} disabled={startTimerMutation.isLoading || runningTimerId !== null}>
                    Start Timer
                  </button>
                )}
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
