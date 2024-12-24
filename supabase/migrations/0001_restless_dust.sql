/*
  # Create students table and related schemas

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `cohort` (text)
      - `courses` (text[])
      - `date_joined` (timestamptz)
      - `last_login` (timestamptz)
      - `status` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `students` table
    - Add policies for authenticated users to perform CRUD operations
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort text NOT NULL,
  courses text[] NOT NULL DEFAULT '{}',
  date_joined timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  status boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for authenticated users"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users"
  ON students
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users"
  ON students
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete access for authenticated users"
  ON students
  FOR DELETE
  TO authenticated
  USING (true);