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
  });

  useEffect(() => {
    if (userPreferences) {
      if (userPreferences?.preferredStudyTimes) {
        setPreferredStudyDays(userPreferences.preferredStudyTimes.days || []);
        setPreferredStudyStartTime(userPreferences.preferredStudyTimes.startTime || '09:00');
        setPreferredStudyEndTime(userPreferences.preferredStudyTimes.endTime || '17:00');
      }
      if (userPreferences?.selectedCalendarIds) {
        setSelectedGoogleCalendars(userPreferences.selectedCalendarIds);
      }
    }
  }, [userPreferences]);


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
  });

  useEffect(() => {
    if (googleCalendars && !userPreferences?.selectedCalendarIds) { // Only set if not already loaded from userPreferences
      const userSelectedCalendars = session?.user?.selectedCalendarIds || []; // Assuming session.user contains selectedCalendarIds
      setSelectedGoogleCalendars(userSelectedCalendars);
    }
  }, [googleCalendars, userPreferences, session]);

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
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Canvas Integration</h2>
          <form onSubmit={handleApiKeySubmit} className="space-y-2">
            <div className="form-control">
              <label className="label" htmlFor="canvas-api-key">
                <span className="label-text">API Key</span>
              </label>
              <input
                id="canvas-api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" disabled={apiKeyMutation.isPending} className="btn btn-primary">
              {apiKeyMutation.isPending ? <span className="loading loading-spinner"></span> : 'Save API Key'}
            </button>
          </form>

          {courses && courses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Sync Canvas Course</h3>
              <div className="flex gap-2 items-center mt-2">
                <select onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse} className="select select-bordered w-full max-w-xs">
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </select>
                <button onClick={handleSyncCourse} disabled={syncMutation.isPending || !selectedCourse} className="btn">
                  {syncMutation.isPending ? <span className="loading loading-spinner"></span> : 'Sync Selected'}
                </button>
              </div>
              <div className="mt-2">
                <button onClick={handleSyncAllCourses} disabled={syncAllMutation.isPending} className="btn btn-secondary">
                  {syncAllMutation.isPending ? <span className="loading loading-spinner"></span> : 'Sync All Courses'}
                </button>
              </div>
            </div>
          )}
          {isLoadingCourses && <span className="loading loading-spinner"></span>}
          {isErrorCourses && <div className="alert alert-error mt-2">Error loading courses. Make sure your API key is valid.</div>}
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Google Calendar Integration</h2>
          <button onClick={() => router.push('/api/auth/google-calendar-oauth')} className="btn btn-primary">
            Connect Google Calendar
          </button>

          {googleCalendars && googleCalendars.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Select Calendars to Display</h3>
              <div className="form-control">
                {googleCalendars.map((calendar) => (
                  <label key={calendar.id} className="label cursor-pointer">
                    <span className="label-text">{calendar.summary}</span>
                    <input
                      type="checkbox"
                      id={calendar.id}
                      checked={selectedGoogleCalendars.includes(calendar.id)}
                      onChange={() => handleGoogleCalendarSelect(calendar.id)}
                      className="checkbox"
                    />
                  </label>
                ))}
              </div>
              <button onClick={handleSaveGoogleCalendarSelection} disabled={saveGoogleCalendarsMutation.isPending} className="btn btn-primary mt-2">
                {saveGoogleCalendarsMutation.isPending ? <span className="loading loading-spinner"></span> : 'Save Selections'}
              </button>
            </div>
          )}
          {isLoadingGoogleCalendars && <span className="loading loading-spinner"></span>}
          {isErrorGoogleCalendars && <div className="alert alert-error mt-2">Error loading Google Calendars.</div>}
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Preferred Study Times</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select Days</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text mr-2">{day}</span>
                    <input
                      type="checkbox"
                      id={day}
                      checked={preferredStudyDays.includes(day)}
                      onChange={() => handlePreferredStudyDayToggle(day)}
                      className="checkbox"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="start-time">
              <span className="label-text">Start Time</span>
            </label>
            <input type="time" id="start-time" value={preferredStudyStartTime} onChange={(e) => setPreferredStudyStartTime(e.target.value)} className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="end-time">
              <span className="label-text">End Time</span>
            </label>
            <input type="time" id="end-time" value={preferredStudyEndTime} onChange={(e) => setPreferredStudyEndTime(e.target.value)} className="input input-bordered" />
          </div>
          <button onClick={handleSavePreferredStudyTimes} disabled={savePreferredStudyTimesMutation.isPending} className="btn btn-primary mt-2">
            {savePreferredStudyTimesMutation.isPending ? <span className="loading loading-spinner"></span> : 'Save Preferred Times'}
          </button>
          {isErrorPreferredStudyTimes && <div className="alert alert-error mt-2">Error saving preferred study times.</div>}
        </div>
      </div>
    </div>
  );
}