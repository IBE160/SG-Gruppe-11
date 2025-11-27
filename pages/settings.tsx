import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const saveCanvasApiKey = async (apiKey: string) => {
  const { data } = await axios.post('/api/canvas/connect', { canvasApiKey: apiKey });
  return data;
};

const fetchCanvasCourses = async () => {
  const { data } = await axios.get('/api/canvas/courses');
  return data;
};

const syncCanvasCourse = async (courseId: string) => {
  const { data } = await axios.post('/api/canvas/sync', { courseId });
  return data;
};

const syncAllCanvasCourses = async () => {
  const { data } = await axios.post('/api/canvas/sync-all');
  return data;
};

const fetchGoogleCalendars = async () => {
  const { data } = await axios.get('/api/calendar/list');
  return data;
};

const saveSelectedGoogleCalendars = async (calendarIds: string[]) => {
  const { data } = await axios.post('/api/calendar/select', { selectedCalendarIds: calendarIds });
  return data;
};

const savePreferredStudyTimes = async (preferences: { days: string[]; startTime: string; endTime: string; }) => {
  const { data } = await axios.put('/api/user/preferences', { preferredStudyTimes: preferences });
  return data;
};

const fetchUserPreferences = async () => {
  const { data } = await axios.get('/api/user/preferences'); // Assuming an API to fetch user preferences
  return data;
};


export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiKey, setApiKey] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedGoogleCalendars, setSelectedGoogleCalendars] = useState<string[]>([]);
  const [preferredStudyDays, setPreferredStudyDays] = useState<string[]>([]);
  const [preferredStudyStartTime, setPreferredStudyStartTime] = useState('09:00');
  const [preferredStudyEndTime, setPreferredStudyEndTime] = useState('17:00');

  useEffect(() => {
    if (router.query.status === 'google-calendar-success') {
      alert('Google Calendar connected successfully!');
      router.replace('/settings', undefined, { shallow: true }); // Clear query param
    } else if (router.query.status === 'google-calendar-error') {
      alert('Failed to connect Google Calendar.');
      router.replace('/settings', undefined, { shallow: true }); // Clear query param
    }
  }, [router.query.status, router]);

  const queryClient = useQueryClient();

  // Fetch user preferences on load
  const { data: userPreferences, isLoading: isLoadingPreferences, isError: isErrorPreferences } = useQuery({
    queryKey: ['userPreferences'],
    queryFn: fetchUserPreferences,
    enabled: status === 'authenticated',
    onSuccess: (data) => {
      if (data?.preferredStudyTimes) {
        setPreferredStudyDays(data.preferredStudyTimes.days || []);
        setPreferredStudyStartTime(data.preferredStudyTimes.startTime || '09:00');
        setPreferredStudyEndTime(data.preferredStudyTimes.endTime || '17:00');
      }
      if (data?.selectedCalendarIds) {
        setSelectedGoogleCalendars(data.selectedCalendarIds);
      }
    },
  });


  const apiKeyMutation = useMutation({
    mutationFn: saveCanvasApiKey,
    onSuccess: () => {
      alert('Canvas API key saved!');
      queryClient.invalidateQueries({ queryKey: ['canvasCourses'] }); // Invalidate courses to refetch them
    },
    onError: (error) => {
      // @ts-ignore
      alert(`Failed to save Canvas API key: ${error.response?.data?.message || error.message}`);
    },
  });

  const { data: courses, isLoading: isLoadingCourses, isError: isErrorCourses } = useQuery({
    queryKey: ['canvasCourses'],
    queryFn: fetchCanvasCourses,
    enabled: status === 'authenticated', // Only fetch if authenticated
  });

  const syncMutation = useMutation({
    mutationFn: syncCanvasCourse,
    onSuccess: () => {
      alert('Canvas course synced successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Invalidate tasks to show new assignments
    },
    onError: (error) => {
      // @ts-ignore
      alert(`Failed to sync Canvas course: ${error.response?.data?.message || error.message}`);
    },
  });

  const syncAllMutation = useMutation({
    mutationFn: syncAllCanvasCourses,
    onSuccess: () => {
      alert('All Canvas courses synced successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Invalidate tasks to show new assignments
    },
    onError: (error) => {
      // @ts-ignore
      alert(`Failed to sync all Canvas courses: ${error.response?.data?.message || error.message}`);
    },
  });

  const { data: googleCalendars, isLoading: isLoadingGoogleCalendars, isError: isErrorGoogleCalendars } = useQuery({
    queryKey: ['googleCalendars'],
    queryFn: fetchGoogleCalendars,
    enabled: status === 'authenticated',
    onSuccess: (data) => {
      if (!userPreferences?.selectedCalendarIds) { // Only set if not already loaded from userPreferences
        const userSelectedCalendars = session?.user?.selectedCalendarIds || []; // Assuming session.user contains selectedCalendarIds
        setSelectedGoogleCalendars(userSelectedCalendars);
      }
    },
  });

  const saveGoogleCalendarsMutation = useMutation({
    mutationFn: saveSelectedGoogleCalendars,
    onSuccess: () => {
      alert('Google Calendar selections saved!');
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] }); // Invalidate user preferences to refetch them
    },
    onError: (error) => {
      // @ts-ignore
      alert(`Failed to save Google Calendar selections: ${error.response?.data?.message || error.message}`);
    },
  });

  const savePreferredStudyTimesMutation = useMutation({
    mutationFn: savePreferredStudyTimes,
    onSuccess: () => {
      alert('Preferred study times saved!');
      queryClient.invalidateQueries({ queryKey: ['userPreferences'] }); // Invalidate user preferences to refetch them
    },
    onError: (error) => {
      // @ts-ignore
      alert(`Failed to save preferred study times: ${error.response?.data?.message || error.message}`);
    },
  });

  const isErrorPreferredStudyTimes = savePreferredStudyTimesMutation.isError;

  if (status === 'loading' || isLoadingPreferences) { // Add isLoadingPreferences to check
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiKeyMutation.mutate(apiKey);
  };

  const handleSyncCourse = () => {
    if (selectedCourse) {
      syncMutation.mutate(selectedCourse);
    } else {
      alert('Please select a course to sync.');
    }
  };

  const handleSyncAllCourses = () => {
    syncAllMutation.mutate();
  };

  const handleGoogleCalendarSelect = (calendarId: string) => {
    setSelectedGoogleCalendars((prev) =>
      prev.includes(calendarId) ? prev.filter((id) => id !== calendarId) : [...prev, calendarId]
    );
  };

  const handleSaveGoogleCalendarSelection = () => {
    saveGoogleCalendarsMutation.mutate(selectedGoogleCalendars);
  };

  const handlePreferredStudyDayToggle = (day: string) => {
    setPreferredStudyDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSavePreferredStudyTimes = () => {
    savePreferredStudyTimesMutation.mutate({
      days: preferredStudyDays,
      startTime: preferredStudyStartTime,
      endTime: preferredStudyEndTime,
    });
  };

  return (
    <div>
      <h1>Settings</h1>

      <form onSubmit={handleApiKeySubmit}>
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
        <button type="submit" disabled={apiKeyMutation.isLoading}>
          {apiKeyMutation.isLoading ? 'Saving...' : 'Save API Key'}
        </button>
      </form>

      {courses && courses.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Sync Canvas Course</h3>
          <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
          <button onClick={handleSyncCourse} disabled={syncMutation.isLoading || !selectedCourse}>
            {syncMutation.isLoading ? 'Syncing...' : 'Sync Selected Course'}
          </button>
          {isLoadingCourses && <div>Loading courses...</div>}
          {isErrorCourses && <div>Error loading courses. Make sure your API key is valid.</div>}

          <div style={{ marginTop: '10px' }}>
            <button onClick={handleSyncAllCourses} disabled={syncAllMutation.isLoading}>
              {syncAllMutation.isLoading ? 'Syncing All...' : 'Sync All Canvas Courses'}
            </button>
          </div>
        </div>
      )}
      {courses && courses.length === 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>No Canvas courses found.</h3>
          <p>Please ensure your Canvas API key is valid and you have active enrollments.</p>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h2>Google Calendar Integration</h2>
        <button onClick={() => router.push('/api/auth/google-calendar-oauth')}>
          Connect Google Calendar
        </button>

        {googleCalendars && googleCalendars.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <h3>Select Calendars to Display</h3>
            {googleCalendars.map((calendar) => (
              <div key={calendar.id}>
                <input
                  type="checkbox"
                  id={calendar.id}
                  checked={selectedGoogleCalendars.includes(calendar.id)}
                  onChange={() => handleGoogleCalendarSelect(calendar.id)}
                />
                <label htmlFor={calendar.id}>{calendar.summary}</label>
              </div>
            ))}
            <button onClick={handleSaveGoogleCalendarSelection} disabled={saveGoogleCalendarsMutation.isLoading}>
              {saveGoogleCalendarsMutation.isLoading ? 'Saving...' : 'Save Calendar Selections'}
            </button>
            {isLoadingGoogleCalendars && <div>Loading calendars...</div>}
            {isErrorGoogleCalendars && <div>Error loading Google Calendars.</div>}
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Preferred Study Times</h2>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <div key={day}>
            <input
              type="checkbox"
              id={day}
              checked={preferredStudyDays.includes(day)}
              onChange={() => handlePreferredStudyDayToggle(day)}
            />
            <label htmlFor={day}>{day}</label>
          </div>
        ))}
        <div>
          Start Time: <input type="time" value={preferredStudyStartTime} onChange={(e) => setPreferredStudyStartTime(e.target.value)} />
        </div>
        <div>
          End Time: <input type="time" value={preferredStudyEndTime} onChange={(e) => setPreferredStudyEndTime(e.target.value)} />
        </div>
        <button onClick={handleSavePreferredStudyTimes} disabled={savePreferredStudyTimesMutation.isLoading}>
          {savePreferredStudyTimesMutation.isLoading ? 'Saving...' : 'Save Preferred Study Times'}
        </button>
        {isErrorPreferredStudyTimes && <div>Error saving preferred study times.</div>}
      </div>
    </div>
  );
}