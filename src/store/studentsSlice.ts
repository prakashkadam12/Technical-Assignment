import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase';

export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: string[];
  date_joined: string;
  last_login: string;
  status: boolean;
}

interface StudentsState {
  items: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (student: Omit<Student, 'id'>) => {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch students';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default studentsSlice.reducer;