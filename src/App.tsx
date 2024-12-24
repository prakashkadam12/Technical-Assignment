import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StudentTable } from './components/StudentTable';
import { AddStudentDialog } from './components/AddStudentDialog';

function App() {
  const [addStudentOpen, setAddStudentOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="flex flex-col lg:flex-row min-h-screen w-full lg:h-[720px] lg:w-[1490px]">
        {/* Sidebar - hidden on mobile, shown from lg breakpoint */}
        <div className="lg:block">
          <Sidebar />
        </div>

        {/* Horizontal Spacer - hidden on mobile */}
        <div className="hidden lg:block w-4 bg-[#E9EDF1] lg:mt-[-5px]"></div>

        {/* Main Content */}
        <div className="flex-1 w-full overflow-x-hidden">
          <Header />
          {/* Horizontal Space */}
          <div className="h-4 bg-[#E9EDF1] w-full lg:w-[1176px]"></div>

          {/* Main content area */}
          <div className="px-4 lg:px-0 w-full overflow-x-auto rounded-lg shadow-sm ">
            <StudentTable onAddStudent={() => setAddStudentOpen(true)} />
          </div>

          <AddStudentDialog
            open={addStudentOpen}
            onOpenChange={setAddStudentOpen}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
