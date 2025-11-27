import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const fetchTasks = async () => {
  const { data } = await axios.get('/api/tasks');
  return data;
};

const fetchCalendarEvents = async () => {
  const { data } = await axios.get('/api/calendar/events');
  return data;
};

export default function AgendaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { data: tasks, isLoading: isLoadingTasks, isError: isErrorTasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    enabled: status === 'authenticated',
  });

  const { data: calendarEvents, isLoading: isLoadingCalendarEvents, isError: isErrorCalendarEvents } = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: fetchCalendarEvents,
    enabled: status === 'authenticated',
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (isLoadingTasks || isLoadingCalendarEvents) return <div>Loading agenda...</div>;
  if (isErrorTasks || isErrorCalendarEvents) return <div>Error fetching agenda items</div>;

  const combinedItems = [];

  if (tasks) {
    tasks.forEach(task => {
      combinedItems.push({
        id: task.id,
        title: task.title,
        date: task.dueDate,
        isCompleted: task.isCompleted,
        type: task.type === 'CANVAS_ASSIGNMENT' ? 'Canvas Assignment' : 'Personal Task',
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

  return (
    <div>
      <h1>Agenda</h1>
      <ul>
        {combinedItems.map((item) => (
          <li key={item.id} style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
            <strong>[{item.type}]</strong> {item.title}
            {item.date && ` - ${new Date(item.date).toLocaleDateString()} ${new Date(item.date).toLocaleTimeString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
