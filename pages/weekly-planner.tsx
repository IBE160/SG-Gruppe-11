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

  if (calendarEvents) {
    calendarEvents.forEach(event => {
      combinedItems.push({
        id: event.id,
        title: event.title,
        date: event.start,
        type: 'Google Calendar Event',
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weekly Planner</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() - 7)))} className="btn">Previous Week</button>
        <span className="text-xl font-semibold">{currentWeekStart.toLocaleDateString()} - {weekEnd.toLocaleDateString()}</span>
        <button onClick={() => setCurrentWeekStart(new Date(currentWeekStart.setDate(currentWeekStart.getDate() + 7)))} className="btn">Next Week</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {daysOfWeek.map((day) => (
          <div key={day.toISOString()} className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
              <h3 className="card-title text-sm">{day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
              <ul className="space-y-1 mt-2">
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
                    <li key={item.id} className="text-xs p-1 rounded" style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>
                      <span className="badge badge-outline badge-sm mr-1">{item.type}</span>
                      {item.priority && <span className="badge badge-outline badge-sm" style={{ borderColor: getPriorityColor(item.priority), color: getPriorityColor(item.priority) }}>{item.priority}</span>}{' '}
                      {item.title}
                      {item.date && <span className="text-gray-500 ml-1">- {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
