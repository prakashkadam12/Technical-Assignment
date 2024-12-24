import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import plusIcon from "../assets/Plus.png";
import { Button } from '@/components/ui/button';
import frame4 from "../assets/Frame (4).png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AppDispatch, RootState } from '@/store/store';
import { fetchStudents } from '@/store/studentsSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface StudentTableProps {
  onAddStudent: () => void;
}

export function StudentTable({ onAddStudent }: StudentTableProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { items: students, loading } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const courseImages: { [key: string]: string } = {
    'CBSE 9 Science': '/src/assets/image.png',
    'CBSE 9 Math': '/src/assets/girl.png',
    'Default': '/src/assets/default.png',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-[1152px] mx-auto p-2 overflow-x-auto mt-3 ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Select defaultValue="2024">
            <SelectTrigger className="w-full sm:w-[140px] text-[#3F526E] font-bold text-base bg-[#E9EDF1] flex justify-between items-center">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">AY 2024-25</SelectItem>
              <SelectItem value="2023">AY 2023-24</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="cbse9">
            <SelectTrigger className="w-full sm:w-[140px] text-[#3F526E] font-bold text-base bg-[#E9EDF1] flex justify-between items-center">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cbse9">CBSE 9</SelectItem>
              <SelectItem value="cbse10">CBSE 10</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Add Student Button */}
        <Button
          onClick={onAddStudent}
          className="w-full sm:w-[197px] h-[36px] bg-[#E9EDF1] text-[#3F526E] text-base flex items-center justify-center gap-2 font-semibold"
        >
          <img src={plusIcon} alt="Add" className="w-6 h-6" />
          Add new Student
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                <span className="text-[#000000] font-semibold text-xs">Student Name</span>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <span className="text-[#000000] font-semibold text-xs">Cohort</span>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <span className="text-[#000000] font-semibold text-xs">Courses</span>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <span className="text-[#000000] font-semibold text-xs">Date Joined</span>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <span className="text-[#000000] font-semibold text-xs">Last Login</span>
              </TableHead>
              <TableHead className="whitespace-nowrap">
                <span className="text-[#000000] font-semibold text-xs">Status</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="whitespace-nowrap">{student.name}</TableCell>
                <TableCell className="whitespace-nowrap">{student.cohort}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {student.courses.map((course) => (
                      <span
                        key={course}
                        className="flex items-center px-1 py-1 bg-gray-100 rounded text-xs sm:text-sm gap-1 whitespace-nowrap"
                      >
                        <img
                          src={courseImages[course] || courseImages['Default']}
                          alt={`${course} Icon`}
                          className="w-4 h-4"
                        />
                        {course}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(student.date_joined), 'dd.MMM.yyyy')}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(student.last_login), 'dd.MMM.yyyy h:mm a')}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-block w-[14.4px] h-[14px] rounded-full ${
                      student.status ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden mt-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.cohort}</p>
              </div>
              <span
                className={`inline-block w-[14.4px] h-[14px] rounded-full ${
                  student.status ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {student.courses.map((course) => (
                  <span
                    key={course}
                    className="flex items-center px-1 py-1 bg-gray-100 rounded text-xs gap-1 whitespace-nowrap"
                  >
                    <img
                      src={courseImages[course] || courseImages['Default']}
                      alt={`${course} Icon`}
                      className="w-4 h-4"
                    />
                    {course}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Joined</p>
                  <p>
                    {format(new Date(student.date_joined), 'dd.MMM.yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Last Login</p>
                  <p>
                    {format(new Date(student.last_login), 'dd.MMM.yyyy h:mm a')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}