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
    <div>
      <h1>Today's Dashboard</h1>
      <ul>
        {combinedItems.map((item) => (
          <li key={item.id} style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
            <strong>[{item.type}]</strong>{' '}
            {item.priority && <span style={{ color: getPriorityColor(item.priority) }}>[{item.priority}]</span>}{' '}
            {item.title}
            {item.date && ` - ${new Date(item.date).toLocaleTimeString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
