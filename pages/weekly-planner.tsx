import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const fetchTasks = async (startDate: string, endDate: string) => {
  const { data } = await axios.get(`/api/tasks?startDate=${startDate}&endDate=${endDate}`);
  return data;
};

const fetchCalendarEvents = async (timeMin: string, timeMax: string) => {
  const { data } = await axios.get(`/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`);
  return data;
};

const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(date.setDate(diff));
};

export default function WeeklyPlannerPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));

  const weekStartISO = currentWeekStart.toISOString();
  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(currentWeekStart.getDate() + 6);
  const weekEndISO = weekEnd.toISOString();

  const { data: tasks, isLoading: isLoadingTasks, isError: isErrorTasks } = useQuery({
    queryKey: ['tasks', weekStartISO, weekEndISO],
    queryFn: () => fetchTasks(weekStartISO, weekEndISO),
    enabled: status === 'authenticated',
  });

  const { data: calendarEvents, isLoading: isLoadingCalendarEvents, isError: isErrorCalendarEvents } = useQuery({
    queryKey: ['calendarEvents', weekStartISO, weekEndISO],
    queryFn: () => fetchCalendarEvents(weekStartISO, weekEndISO),
    enabled: status === 'authenticated',
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (isLoadingTasks || isLoadingCalendarEvents) return <div>Loading weekly planner...</div>;
  if (isErrorTasks || isErrorCalendarEvents) return <div>Error fetching weekly planner items</div>;

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

  const daysOfWeek = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(currentWeekStart);
    day.setDate(currentWeekStart.getDate() + i);
    return day;
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
      <h1>Weekly Planner</h1>
      <div>
        <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7)))}>Previous Week</button>
        <span>{currentWeekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}</span>
        <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7)))}>Next Week</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px', marginTop: '20px' }}>
        {daysOfWeek.map((day) => (
          <div key={day.toISOString()} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
            <ul>
              {combinedItems
                .filter(item => {
                  const itemDate = new Date(item.date);
                  return itemDate.toDateString() === day.toDateString();
                })
                .sort((a, b) => {
                  const dateA = a.date ? new Date(a.date).getTime() : Infinity;
                  const dateB = b.date ? new Date(b.date).getTime() : Infinity;
                  return dateA - dateB;
                })
                .map(item => (
                  <li key={item.id} style={{ textDecoration: item.isCompleted ? 'line-through' : 'none', fontSize: '0.8em' }}>
                    <strong>[{item.type}]</strong>{' '}
                    {item.priority && <span style={{ color: getPriorityColor(item.priority) }}>[{item.priority}]</span>}{' '}
                    {item.title}
                    {item.date && ` - ${new Date(item.date).toLocaleTimeString()}`}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
