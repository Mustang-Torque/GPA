import { useState, useMemo } from 'react';
import { GraduationCap, TrendingUp } from 'lucide-react';

interface Subject {
  code: string;
  credits: number;
}

interface GradeSelection {
  [subjectCode: string]: number | null;
}

const SUBJECTS: Subject[] = [
  { code: 'AD3501', credits: 3 },
  { code: 'AD3511', credits: 2 },
  { code: 'AD3512', credits: 2 },
  { code: 'CCS334', credits: 3 },
  { code: 'CCS335', credits: 3 },
  { code: 'CS3551', credits: 3 },
  { code: 'CCW331', credits: 3 },
  { code: 'CW3551', credits: 3 },
];

const GRADE_POINTS: { [key: string]: number } = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
};

const GRADES = ['O', 'A+', 'A', 'B+', 'B'];

function App() {
  const [selectedSemester] = useState('Semester 5');
  const [grades, setGrades] = useState<GradeSelection>({});

  const handleGradeChange = (subjectCode: string, grade: string) => {
    setGrades((prev) => ({
      ...prev,
      [subjectCode]: grade === '' ? null : GRADE_POINTS[grade],
    }));
  };

  const gpa = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    SUBJECTS.forEach((subject) => {
      const gradePoint = grades[subject.code];
      if (gradePoint !== null && gradePoint !== undefined) {
        totalPoints += subject.credits * gradePoint;
        totalCredits += subject.credits;
      }
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  }, [grades]);

  const getGradeLabel = (gradePoint: number | null): string => {
    if (gradePoint === null || gradePoint === undefined) return '';
    return Object.keys(GRADE_POINTS).find((key) => GRADE_POINTS[key] === gradePoint) || '';
  };

  const totalCredits = SUBJECTS.reduce((sum, subject) => sum + subject.credits, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <GraduationCap className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-800">
              Academic Performance Tracker
            </h1>
          </div>
          <p className="text-slate-600 text-lg">Monitor your academic progress in real-time</p>
        </header>

        <div className="mb-6">
          <label htmlFor="semester" className="block text-sm font-medium text-slate-700 mb-2">
            Select Semester
          </label>
          <select
            id="semester"
            value={selectedSemester}
            className="w-full md:w-64 px-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium"
            disabled
          >
            <option>Semester 5</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-700 to-blue-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Subject Code
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SUBJECTS.map((subject, index) => (
                  <tr
                    key={subject.code}
                    className={`${
                      index % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    } hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-base font-semibold text-slate-800">
                        {subject.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
                        {subject.credits}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={getGradeLabel(grades[subject.code] ?? null)}
                        onChange={(e) => handleGradeChange(subject.code, e.target.value)}
                        className="w-full md:w-40 px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-medium cursor-pointer hover:border-blue-400"
                      >
                        <option value="">Select Grade</option>
                        {GRADES.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade} - {GRADE_POINTS[grade]} points
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h2 className="text-lg font-semibold uppercase tracking-wide">Current GPA</h2>
            </div>
            <p className="text-6xl font-bold mt-4">{gpa}</p>
            <p className="text-slate-300 mt-2 text-sm">Out of 10.00</p>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <h2 className="text-lg font-semibold uppercase tracking-wide mb-2">
              Semester Overview
            </h2>
            <div className="space-y-3 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Total Subjects:</span>
                <span className="text-2xl font-bold">{SUBJECTS.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Total Credits:</span>
                <span className="text-2xl font-bold">{totalCredits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Graded Subjects:</span>
                <span className="text-2xl font-bold">
                  {Object.values(grades).filter((g) => g !== null && g !== undefined).length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>Select grades for all subjects to calculate your semester GPA</p>
        </div>
      </div>
    </div>
  );
}

export default App;
      
