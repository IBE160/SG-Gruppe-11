import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const fetchTasks = async () => {
  const { data } = await axios.get('/api/tasks');
  return data;
};

const createTask = async (newTask: { title: string; priority: string; dueDate?: Date }) => {
  const { data } = await axios.post('/api/tasks', newTask);
  return data;
};

const updateTask = async (updatedTask: any) => {
  const { data } = await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask);
  return data;
};

const deleteTask = async (taskId: string) => {
  await axios.delete(`/api/tasks/${taskId}`);
};

const startTimer = async (taskId: string) => {
  await axios.post(`/api/tasks/${taskId}/start-timer`);
};

const stopTimer = async (taskId: string, elapsedTime: number) => {
  const { data } = await axios.post(`/api/tasks/${taskId}/stop-timer`, { elapsedTime });
  return data;
};

const findFreeTime = async (taskId: string, timeframeDays: number) => {
  const { data } = await axios.get(`/api/schedule/free-time?taskId=${taskId}&timeframeDays=${timeframeDays}`);
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

  const [showFreeTimeModal, setShowFreeTimeModal] = useState(false);
  const [selectedTaskForFreeTime, setSelectedTaskForFreeTime] = useState(null);

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


  const createTaskMutation = useMutation<any, Error, { title: string; priority: string; dueDate?: Date }>({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTaskTitle('');
      setNewTaskPriority('MEDIUM');
    },
  });

  const updateTaskMutation = useMutation<any, Error, any>({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setEditingTaskId(null);
    },
  });

  const deleteTaskMutation = useMutation<any, Error, string>({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const startTimerMutation = useMutation<any, Error, string>({
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

  const stopTimerMutation = useMutation<any, Error, { taskId: string, elapsedTime: number }>({
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

  const findFreeTimeMutation = useMutation<any, Error, { taskId: string, timeframeDays: number }>({
    mutationFn: ({ taskId, timeframeDays }) => findFreeTime(taskId, timeframeDays),
    onSuccess: (data) => {
      // Handle displaying suggested free times in a modal
      console.log('Suggested Free Times:', data);
    },
    onError: (error) => {
      // @ts-ignore
      alert(`Failed to find free time: ${error.response?.data?.message || error.message}`);
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

  const handleEditClick = (task: any) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    setEditingPriority(task.priority || 'MEDIUM');
  };

  const handleSaveEdit = (task: any) => {
    updateTaskMutation.mutate({
      ...task,
      title: editingTitle,
      dueDate: editingDueDate ? new Date(editingDueDate) : null,
      priority: editingPriority,
    });
  };

  const handleStartTimer = (taskId: string) => {
    startTimerMutation.mutate(taskId);
  };

  const handleStopTimer = (taskId: string) => {
    stopTimerMutation.mutate({ taskId, elapsedTime: currentElapsedTime });
  };

  const handleFindFreeTime = (task: any) => {
    setSelectedTaskForFreeTime(task);
    setShowFreeTimeModal(true);
  };

  const handleScheduleFreeTime = (suggestedSlot: any) => {
    // Create a new task based on the suggestion
    createTaskMutation.mutate({
      title: `Study for: ${selectedTaskForFreeTime.title}`,
      dueDate: new Date(suggestedSlot.start),
      priority: 'MEDIUM', // Or inherit from original task
    });
    setShowFreeTimeModal(false);
  };

  const getPriorityColor = (priority: string) => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <div className="mb-4 p-4 card bg-base-100 shadow-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New task title"
            className="input input-bordered w-full"
          />
          <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)} className="select select-bordered">
            {priorityOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button onClick={handleCreateTask} disabled={createTaskMutation.isPending} className="btn btn-primary">
            {createTaskMutation.isPending ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {tasks.map((task: any) => (
          <li key={task.id} className="card bg-base-100 shadow">
            <div className="card-body p-4">
              {editingTaskId === task.id ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="input input-bordered input-sm"
                  />
                  <input
                    type="date"
                    value={editingDueDate}
                    onChange={(e) => setEditingDueDate(e.target.value)}
                    className="input input-bordered input-sm"
                  />
                  <select value={editingPriority} onChange={(e) => setEditingPriority(e.target.value)} className="select select-bordered select-sm">
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <button onClick={() => handleSaveEdit(task)} disabled={updateTaskMutation.isPending} className="btn btn-success btn-sm">
                    Save
                  </button>
                  <button onClick={() => setEditingTaskId(null)} className="btn btn-ghost btn-sm">Cancel</button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={(e) =>
                      updateTaskMutation.mutate({ ...task, isCompleted: e.target.checked })
                    }
                    className="checkbox checkbox-primary"
                  />
                  <div className="flex-grow">
                    <span className="badge badge-outline" style={{ borderColor: getPriorityColor(task.priority), color: getPriorityColor(task.priority) }}>
                      {task.priority}
                    </span>{' '}
                    <span className={task.isCompleted ? 'line-through' : ''}>{task.title}</span>
                    {task.dueDate && <div className="text-xs text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>}
                    <div className="text-xs text-gray-500">Time Spent: {task.timeSpent} mins</div>
                  </div>
                  <div className="flex gap-2">
                    {runningTimerId === task.id ? (
                      <div className="flex items-center gap-2">
                        <span className="badge badge-secondary">Running: {currentElapsedTime} mins</span>
                        <button onClick={() => handleStopTimer(task.id)} disabled={stopTimerMutation.isPending} className="btn btn-warning btn-sm">
                          Stop Timer
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => handleStartTimer(task.id)} disabled={startTimerMutation.isPending || runningTimerId !== null} className="btn btn-info btn-sm">
                        Start Timer
                      </button>
                    )}
                    <button onClick={() => handleEditClick(task)} className="btn btn-ghost btn-sm">Edit</button>
                    <button onClick={() => deleteTaskMutation.mutate(task.id)} className="btn btn-ghost btn-sm">Delete</button>
                    {task.estimatedTime && ( // Only show if task has estimated time
                      <button onClick={() => handleFindFreeTime(task)} className="btn btn-accent btn-sm">Find Free Time</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {showFreeTimeModal && selectedTaskForFreeTime && (
        <FreeTimeModal
          task={selectedTaskForFreeTime}
          onClose={() => setShowFreeTimeModal(false)}
          onSchedule={handleScheduleFreeTime}
        />
      )}
    </div>
  );
}

function FreeTimeModal({ task, onClose, onSchedule }: { task: any, onClose: () => void, onSchedule: (slot: any) => void }) {
  const { data: freeTimeSlots, isLoading, isError } = useQuery({
    queryKey: ['freeTime', task.id],
    queryFn: () => findFreeTime(task.id, 14), // Look for free time in the next 14 days
  });

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Suggested Free Times for "{task.title}" ({task.estimatedTime} mins)</h3>
        {isLoading && <span className="loading loading-spinner"></span>}
        {isError && <div className="alert alert-error">Error finding free time.</div>}
        {freeTimeSlots && freeTimeSlots.length > 0 ? (
          <ul className="menu">
            {freeTimeSlots.map((slot, index) => (
              <li key={index}>
                <a onClick={() => onSchedule(slot)}>
                  {new Date(slot.start).toLocaleString()} - {new Date(slot.end).toLocaleTimeString()}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          !isLoading && <p>No free time slots found.</p>
        )}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
