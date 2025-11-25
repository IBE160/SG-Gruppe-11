import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const fetchTasks = async () => {
  const { data } = await axios.get('/api/tasks');
  return data;
};

export default function AgendaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data: tasks, isLoading, isError } = useQuery({ queryKey: ['tasks'], queryFn: fetchTasks, enabled: status === 'authenticated' });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div>
      <h1>Agenda</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            {task.title}
            {task.dueDate && ` - Due: ${new Date(task.dueDate).toLocaleDateString()}`}
          </li>
        ))}
      </ul>
    </div>
  );
}
