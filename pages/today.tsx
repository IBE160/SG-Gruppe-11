import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const fetchTasks = async (startDate: string, endDate: string) => {
  const { data } = await axios.get(`/api/tasks?startDate=${startDate}&endDate=${endDate}`);
  return data;
};

const fetchCalendarEvents = async (timeMin: string, timeMax: string) => {
  const { data } = await axios.get(`/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`);
  return data;
};

const getTodayDateRange = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Start of tomorrow

  return {
    startDate: today.toISOString(),
    endDate: tomorrow.toISOString(),
  };
};

export default function TodayPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { startDate, endDate } = getTodayDateRange();

  const { data: tasks, isLoading: isLoadingTasks, isError: isErrorTasks } = useQuery({
    queryKey: ['tasks', startDate, endDate],
    queryFn: () => fetchTasks(startDate, endDate),
    enabled: status === 'authenticated',
  });

  const { data: calendarEvents, isLoading: isLoadingCalendarEvents, isError: isErrorCalendarEvents } = useQuery({
    queryKey: ['calendarEvents', startDate, endDate],
    queryFn: () => fetchCalendarEvents(startDate, endDate),
    enabled: status === 'authenticated',
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (isLoadingTasks || isLoadingCalendarEvents) return <div>Loading today's view...</div>;
  if (isErrorTasks || isErrorCalendarEvents) return <div>Error fetching today's items</div>;

  const combinedItems = [];

  if (tasks) {
    tasks.forEach(task => {
      combinedItems.push({
        id: task.id,
        title: task.title,
        date: task.dueDate,
        isCompleted: task.isCompleted,
        type: task.type === 'CANVAS_ASSIGNMENT' ? 'Canvas Assignment' : 'Personal Task',
        priority: task.priority,
      });
    });
  }

  if (calendarEvents) {
    calendarEvents.forEach(event => {
      combinedItems.push({
        id: event.id,
        title: event.title,
        date: event.start, // Assuming event.start is the relevant date for sorting
        type: 'Google Calendar Event',
      });
    });
  }

  combinedItems.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : Infinity;
    const dateB = b.date ? new Date(b.date).getTime() : Infinity;
    return dateA - dateB;
  });

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Today's Dashboard</h1>
      <ul className="space-y-2">
        {combinedItems.map((item) => (
          <li key={item.id} className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className={item.isCompleted ? 'line-through' : ''}>
                <span className="badge badge-outline mr-2">{item.type}</span>
                {item.priority && <span className="badge badge-outline" style={{ borderColor: getPriorityColor(item.priority), color: getPriorityColor(item.priority) }}>{item.priority}</span>}{' '}
                {item.title}
                {item.date && <span className="text-sm text-gray-500 ml-2">- {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
