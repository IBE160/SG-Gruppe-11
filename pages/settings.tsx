import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const saveCanvasApiKey = async (apiKey: string) => {
  const { data } = await axios.post('/api/canvas/connect', { canvasApiKey: apiKey });
  return data;
};

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');

  const mutation = useMutation({
    mutationFn: saveCanvasApiKey,
    onSuccess: () => {
      alert('Canvas API key saved!');
    },
    onError: () => {
      alert('Failed to save Canvas API key');
    },
  });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(apiKey);
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <h2>Canvas Integration</h2>
        <div>
          <label htmlFor="canvas-api-key">API Key</label>
          <input
            id="canvas-api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
