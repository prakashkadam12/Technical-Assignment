/*
  # Update RLS policies for public access

  1. Changes
    - Update existing policies to allow public access
    - Enable anonymous access to the students table

  2. Security
    - Temporarily allow public access for development
    - In production, these should be replaced with proper authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON students;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON students;

-- Create new policies for public access
CREATE POLICY "Enable read access for all users"
  ON students FOR SELECT
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON students FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
  ON students FOR UPDATE
  USING (true);

CREATE POLICY "Enable delete access for all users"
  ON students FOR DELETE
  USING (true);