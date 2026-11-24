export const studentInterventionData = {
  studentId: "103",
  studentName: "Student 103",
  riskLevel: "HIGH",
  reasons: [
    "Low attendance",
    "Low quiz score",
    "Low assignment score"
  ],
  suggestedInterventions: [
    "Assign Probability basics",
    "Schedule mentoring",
    "Give additional quiz",
    "Monitor attendance"
  ]
};

export const sampleStudents = [
  {
    id: "103",
    name: "Student 103",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
    attendance: 58,
    internalMarks: 45,
    quizScore: 42,
    overallPerformance: 48,
    learningProgress: 40,
    performanceCategory: "At Risk",
    riskStatus: "High Risk",
    weakSubjects: ["Mathematics & Probability Basics", "Data Structures – Graphs"],
    recommendedTopics: ["Probability Basics & Bayes Theorem", "Random Variables", "Graph Algorithms"],
    aiRecommendation: "High Risk Flagged: Low attendance and quiz scores. Immediate intervention required for Probability basics.",
    studyMaterials: [
      { id: "sm-103", title: "Probability Basics & Statistics Lab", type: "PDF Guide", size: "3.2 MB", icon: "BookOpen" }
    ],
    upcomingQuizzes: [
      { id: "uq-103", title: "Probability Basics Remedial Quiz", date: "Today, 4:00 PM", duration: "10 mins", questionsCount: 5 }
    ],
    notifications: [
      { id: "n103", title: "High Risk Teacher Intervention Flag", desc: "Assigned Probability Basics remedial module", time: "5 mins ago" }
    ],
    subjectPerformance: [
      { id: "math", name: "Probability & Statistics", code: "CS-505", mastery: 42, status: "At Risk", statusColor: "#ef4444", weakTopic: "Probability Basics", completedModules: 3, totalModules: 12 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 50, status: "At Risk", statusColor: "#ef4444", weakTopic: "Graphs", completedModules: 5, totalModules: 16 }
    ],
    recentActivities: [
      { id: "ra-103", type: "quiz", title: "Attempted Probability Quiz", score: "42%", time: "Today" }
    ]
  },
  {
    id: "STU001",
    name: "Nikhitha",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    attendance: 94,
    internalMarks: 88,
    quizScore: 92,
    overallPerformance: 91,
    learningProgress: 86,
    performanceCategory: "Good Performance",
    riskStatus: "Low Risk",
    weakSubjects: ["Machine Learning – Decision Trees", "Operating Systems – Semaphores"],
    recommendedTopics: ["Decision Trees & Information Gain", "Random Forest Ensembles", "Counting Semaphores in OS"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Machine Learning – Decision Trees.",
    studyMaterials: [
      { id: "sm-1", title: "Machine Learning: Decision Trees Deep Dive", type: "PDF Guide", size: "4.2 MB", icon: "BookOpen" },
      { id: "sm-2", title: "OS Concurrency & Semaphore Notes", type: "AI Summary", size: "1.8 MB", icon: "FileText" },
      { id: "sm-3", title: "React & Next.js Architecture Lab Code", type: "ZIP Archive", size: "12.5 MB", icon: "Code" }
    ],
    upcomingQuizzes: [
      { id: "uq-1", title: "ML Decision Trees & Entropy Quiz", date: "Tomorrow, 10:00 AM", duration: "15 mins", questionsCount: 5 },
      { id: "uq-2", title: "Operating Systems Process Sync", date: "Sep 14, 2026", duration: "20 mins", questionsCount: 10 }
    ],
    notifications: [
      { id: "n1", title: "AI Recommendation Updated", desc: "New personalized study module added for Decision Trees", time: "10 mins ago" },
      { id: "n2", title: "Internal Test Result Published", desc: "Scored 88/100 in Mid-Sem AI & ML paper", time: "2 hours ago" },
      { id: "n3", title: "Attendance Warning Status: Safe", desc: "Current attendance is 94% (Above 75% threshold)", time: "1 day ago" }
    ],
    subjectPerformance: [
      { id: "aiml", name: "Artificial Intelligence & ML", code: "CS-502", mastery: 78, status: "In Progress", statusColor: "#6366f1", weakTopic: "Decision Trees & Entropy", completedModules: 9, totalModules: 14 },
      { id: "dsa", name: "Data Structures & Algorithms", code: "CS-501", mastery: 94, status: "Expert", statusColor: "#10b981", weakTopic: "Graph Red-Black Trees", completedModules: 15, totalModules: 16 },
      { id: "web", name: "Full Stack Web Architectures", code: "CS-503", mastery: 96, status: "Expert", statusColor: "#06b6d4", weakTopic: "Docker Containers", completedModules: 12, totalModules: 12 },
      { id: "os", name: "Operating Systems & Virtualization", code: "CS-504", mastery: 74, status: "Needs Focus", statusColor: "#f59e0b", weakTopic: "Semaphores & Mutex", completedModules: 7, totalModules: 11 }
    ],
    recentActivities: [
      { id: "ra-1", type: "quiz", title: "Passed Quiz: Graph Traversal", score: "95%", time: "3 hours ago" },
      { id: "ra-2", type: "ai", title: "AI Tutor Session: Decision Trees", score: "Socratic Pass", time: "Yesterday" }
    ]
  },
  {
    id: "STU002",
    name: "Student Two",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250",
    attendance: 85,
    internalMarks: 76,
    quizScore: 78,
    overallPerformance: 79,
    learningProgress: 72,
    performanceCategory: "Average Performance",
    riskStatus: "Medium Risk",
    weakSubjects: ["Operating Systems – Deadlocks", "Algorithm Analysis"],
    recommendedTopics: ["Banker's Algorithm", "Asymptotic Notation", "Dynamic Programming Basics"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Operating Systems – Deadlock Avoidance Algorithms.",
    studyMaterials: [
      { id: "sm-4", title: "OS Deadlock Avoidance Cheatsheet", type: "PDF Guide", size: "2.1 MB", icon: "BookOpen" },
      { id: "sm-5", title: "Time & Space Complexity Video Walkthrough", type: "MP4 Video", size: "45 MB", icon: "Video" }
    ],
    upcomingQuizzes: [
      { id: "uq-3", title: "OS Deadlocks Practice Test", date: "Sep 12, 2026", duration: "15 mins", questionsCount: 5 }
    ],
    notifications: [
      { id: "n4", title: "Progress Update", desc: "You've completed 72% of the semester curriculum", time: "5 hours ago" }
    ],
    subjectPerformance: [
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 65, status: "Needs Focus", statusColor: "#f59e0b", weakTopic: "Banker's Algorithm", completedModules: 6, totalModules: 11 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 80, status: "On Track", statusColor: "#10b981", weakTopic: "Heap Trees", completedModules: 12, totalModules: 16 },
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 75, status: "In Progress", statusColor: "#6366f1", weakTopic: "Neural Nets", completedModules: 8, totalModules: 14 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 84, status: "On Track", statusColor: "#06b6d4", weakTopic: "REST Security", completedModules: 10, totalModules: 12 }
    ],
    recentActivities: [
      { id: "ra-3", type: "quiz", title: "Completed Quiz: OS Basics", score: "78%", time: "1 day ago" }
    ]
  },
  {
    id: "STU003",
    name: "Student Three",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    attendance: 68,
    internalMarks: 52,
    quizScore: 48,
    overallPerformance: 56,
    learningProgress: 45,
    performanceCategory: "At Risk",
    riskStatus: "High Risk",
    weakSubjects: ["Data Structures – Graphs & Heaps", "AI & ML Foundations"],
    recommendedTopics: ["Breadth-First Search (BFS)", "Binary Heap Insertion", "Linear Regression Fundamentals"],
    aiRecommendation: "Alert: Your attendance is below 70% and quiz score is low. We recommend completing the AI Adaptive Remedial Plan for Graph Algorithms immediately.",
    studyMaterials: [
      { id: "sm-6", title: "Graph Fundamentals Starter Pack", type: "PDF Guide", size: "3.5 MB", icon: "BookOpen" },
      { id: "sm-7", title: "AI Remedial Pathway Worksheets", type: "Interactive PDF", size: "5.0 MB", icon: "FileText" }
    ],
    upcomingQuizzes: [
      { id: "uq-4", title: "Mandatory Remedial Graph Quiz", date: "Today, 5:00 PM", duration: "10 mins", questionsCount: 5 }
    ],
    notifications: [
      { id: "n5", title: "HOD Intervention Alert", desc: "Dr. Sunita Verma dispatched an AI Remedial Plan for you", time: "1 hour ago" },
      { id: "n6", title: "Attendance Warning", desc: "Attendance is 68% (Required minimum: 75%)", time: "1 day ago" }
    ],
    subjectPerformance: [
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 48, status: "At Risk", statusColor: "#ef4444", weakTopic: "Graphs & Heaps", completedModules: 6, totalModules: 16 },
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 50, status: "At Risk", statusColor: "#ef4444", weakTopic: "Linear Regression", completedModules: 4, totalModules: 14 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 55, status: "Needs Focus", statusColor: "#f59e0b", weakTopic: "Process Scheduling", completedModules: 5, totalModules: 11 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 62, status: "In Progress", statusColor: "#6366f1", weakTopic: "CSS Grid", completedModules: 7, totalModules: 12 }
    ],
    recentActivities: [
      { id: "ra-4", type: "quiz", title: "Attempted Quiz: Graph Algorithms", score: "48%", time: "Yesterday" }
    ]
  },
  {
    id: "STU004",
    name: "Aarav Sharma",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    attendance: 96,
    internalMarks: 91,
    quizScore: 90,
    overallPerformance: 92,
    learningProgress: 88,
    performanceCategory: "Good Performance",
    riskStatus: "Low Risk",
    weakSubjects: ["Cloud Architectures – Docker Container Networking"],
    recommendedTopics: ["Docker Bridge Networks", "Kubernetes Pod Orchestration"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Cloud Architectures – Docker Networking.",
    studyMaterials: [
      { id: "sm-8", title: "Docker Networking & Security Guide", type: "E-Book", size: "8.1 MB", icon: "BookOpen" }
    ],
    upcomingQuizzes: [
      { id: "uq-5", title: "Cloud Architecture Challenge", date: "Sep 15, 2026", duration: "25 mins", questionsCount: 12 }
    ],
    notifications: [
      { id: "n7", title: "Top Performer Badge Earned", desc: "Ranked #4 in CSE AIML cohort", time: "3 hours ago" }
    ],
    subjectPerformance: [
      { id: "web", name: "Web & Cloud Architectures", code: "CS-503", mastery: 95, status: "Expert", statusColor: "#06b6d4", weakTopic: "Docker Networks", completedModules: 12, totalModules: 12 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 88, status: "Mastered", statusColor: "#10b981", weakTopic: "Red-Black Trees", completedModules: 14, totalModules: 16 },
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 74, status: "In Progress", statusColor: "#6366f1", weakTopic: "Gradient Descent", completedModules: 9, totalModules: 14 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 64, status: "Needs Focus", statusColor: "#f59e0b", weakTopic: "Deadlock Avoidance", completedModules: 6, totalModules: 11 }
    ],
    recentActivities: [
      { id: "ra-5", type: "quiz", title: "Quiz: Dynamic Programming", score: "90%", time: "2 hours ago" }
    ]
  },
  {
    id: "STU005",
    name: "Ananya Patel",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    attendance: 98,
    internalMarks: 95,
    quizScore: 96,
    overallPerformance: 96,
    learningProgress: 94,
    performanceCategory: "Good Performance",
    riskStatus: "Low Risk",
    weakSubjects: ["Machine Learning – Gradient Descent Optimization"],
    recommendedTopics: ["Stochastic Gradient Descent", "Adam Optimizer Intuition"],
    aiRecommendation: "Excellent progress! To achieve 100% mastery, revise Gradient Descent Optimization mathematical derivations.",
    studyMaterials: [
      { id: "sm-9", title: "Advanced Deep Learning & Optimizers", type: "PDF Guide", size: "6.7 MB", icon: "BookOpen" }
    ],
    upcomingQuizzes: [
      { id: "uq-6", title: "Neural Nets & Optimizers Quiz", date: "Sep 16, 2026", duration: "20 mins", questionsCount: 10 }
    ],
    notifications: [
      { id: "n8", title: "Cohort Leader", desc: "Ranked #1 in Class Overall Performance", time: "1 hour ago" }
    ],
    subjectPerformance: [
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 96, status: "Expert", statusColor: "#10b981", weakTopic: "Adam Optimizer", completedModules: 14, totalModules: 14 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 98, status: "Expert", statusColor: "#10b981", weakTopic: "Advanced DP", completedModules: 16, totalModules: 16 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 94, status: "Expert", statusColor: "#06b6d4", weakTopic: "Serverless", completedModules: 12, totalModules: 12 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 92, status: "Mastered", statusColor: "#6366f1", weakTopic: "Page Replacement", completedModules: 11, totalModules: 11 }
    ],
    recentActivities: [
      { id: "ra-6", type: "quiz", title: "Quiz: Machine Learning Models", score: "98%", time: "4 hours ago" }
    ]
  },
  {
    id: "STU006",
    name: "Rohan Gupta",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250",
    attendance: 72,
    internalMarks: 58,
    quizScore: 54,
    overallPerformance: 58,
    learningProgress: 50,
    performanceCategory: "At Risk",
    riskStatus: "High Risk",
    weakSubjects: ["Operating Systems – Semaphore Synchronization", "Algorithm Complexity"],
    recommendedTopics: ["Mutex Locks vs Semaphores", "Dining Philosophers Problem"],
    aiRecommendation: "Alert: Low score in OS Quiz 3 (42%). Please complete the AI Socratic Lesson on Semaphores.",
    studyMaterials: [
      { id: "sm-10", title: "OS Concurrency & Race Conditions", type: "AI Lesson", size: "3.1 MB", icon: "FileText" }
    ],
    upcomingQuizzes: [
      { id: "uq-7", title: "Re-take: Semaphore Quiz", date: "Sep 13, 2026", duration: "10 mins", questionsCount: 5 }
    ],
    notifications: [
      { id: "n9", title: "AI Remedial Dispatched", desc: "Assigned Semaphore Remedial Plan by HOD", time: "2 hours ago" }
    ],
    subjectPerformance: [
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 52, status: "At Risk", statusColor: "#ef4444", weakTopic: "Semaphores", completedModules: 4, totalModules: 11 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 60, status: "Needs Focus", statusColor: "#f59e0b", weakTopic: "Sorting", completedModules: 8, totalModules: 16 },
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 56, status: "At Risk", statusColor: "#ef4444", weakTopic: "Classification", completedModules: 5, totalModules: 14 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 64, status: "In Progress", statusColor: "#6366f1", weakTopic: "APIs", completedModules: 7, totalModules: 12 }
    ],
    recentActivities: [
      { id: "ra-7", type: "quiz", title: "Attempted OS Quiz", score: "42%", time: "Yesterday" }
    ]
  },
  {
    id: "STU007",
    name: "Priya Nair",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250",
    attendance: 92,
    internalMarks: 84,
    quizScore: 82,
    overallPerformance: 85,
    learningProgress: 81,
    performanceCategory: "Good Performance",
    riskStatus: "Low Risk",
    weakSubjects: ["Compiler Design – Parsing", "Neural Network Architecture"],
    recommendedTopics: ["LL(1) & LR Parsing Tables", "Convolutional Neural Networks (CNNs)"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Convolutional Neural Networks for Image Processing.",
    studyMaterials: [
      { id: "sm-11", title: "CNN & Vision Architectures Note", type: "PDF Guide", size: "5.4 MB", icon: "BookOpen" }
    ],
    upcomingQuizzes: [
      { id: "uq-8", title: "Deep Learning Foundations Quiz", date: "Sep 18, 2026", duration: "15 mins", questionsCount: 8 }
    ],
    notifications: [
      { id: "n10", title: "Good Performance Status", desc: "Consistently scoring above class average", time: "6 hours ago" }
    ],
    subjectPerformance: [
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 82, status: "On Track", statusColor: "#10b981", weakTopic: "CNNs", completedModules: 11, totalModules: 14 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 88, status: "Mastered", statusColor: "#10b981", weakTopic: "Hashing", completedModules: 14, totalModules: 16 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 86, status: "On Track", statusColor: "#06b6d4", weakTopic: "GraphQL", completedModules: 10, totalModules: 12 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 80, status: "On Track", statusColor: "#6366f1", weakTopic: "File Systems", completedModules: 9, totalModules: 11 }
    ],
    recentActivities: [
      { id: "ra-8", type: "quiz", title: "Quiz: Data Structures", score: "88%", time: "1 day ago" }
    ]
  },
  {
    id: "STU008",
    name: "Vikram Singh",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250",
    attendance: 81,
    internalMarks: 72,
    quizScore: 70,
    overallPerformance: 74,
    learningProgress: 68,
    performanceCategory: "Average Performance",
    riskStatus: "Medium Risk",
    weakSubjects: ["Database Systems – B-Tree Indexing", "Dynamic Programming"],
    recommendedTopics: ["B+ Tree Node Splitting", "Knapsack Problem Memoization"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Database Indexing and Tree Traversal.",
    studyMaterials: [
      { id: "sm-12", title: "DBMS Indexing Mechanics", type: "PDF Guide", size: "3.8 MB", icon: "BookOpen" }
    ],
    upcomingQuizzes: [
      { id: "uq-9", title: "DBMS Performance & Indexing", date: "Sep 14, 2026", duration: "15 mins", questionsCount: 6 }
    ],
    notifications: [
      { id: "n11", title: "Practice Milestone Reminder", desc: "You have 2 pending practice modules in DBMS", time: "1 day ago" }
    ],
    subjectPerformance: [
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 70, status: "In Progress", statusColor: "#6366f1", weakTopic: "DP Memoization", completedModules: 10, totalModules: 16 },
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 74, status: "In Progress", statusColor: "#6366f1", weakTopic: "Supervised Learning", completedModules: 9, totalModules: 14 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 78, status: "On Track", statusColor: "#10b981", weakTopic: "SQL Queries", completedModules: 9, totalModules: 12 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 72, status: "In Progress", statusColor: "#6366f1", weakTopic: "Memory Allocation", completedModules: 7, totalModules: 11 }
    ],
    recentActivities: [
      { id: "ra-9", type: "quiz", title: "Quiz: SQL Joins", score: "75%", time: "2 days ago" }
    ]
  },
  {
    id: "STU009",
    name: "Sneha Reddy",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
    attendance: 95,
    internalMarks: 89,
    quizScore: 91,
    overallPerformance: 91,
    learningProgress: 87,
    performanceCategory: "Good Performance",
    riskStatus: "Low Risk",
    weakSubjects: ["Neural Networks Vector Math", "OS Virtual Memory"],
    recommendedTopics: ["Matrix Multiplication in Forward Pass", "Page Replacement (LRU, FIFO)"],
    aiRecommendation: "Based on your recent quiz performance, we recommend revising Neural Network Vector Math.",
    studyMaterials: [
      { id: "sm-13", title: "Deep Learning Vector Mathematics", type: "E-Book", size: "4.9 MB", icon: "BookOpen" }
    ],
    upcomingQuizzes: [
      { id: "uq-10", title: "Machine Learning Math & LinAlg", date: "Sep 17, 2026", duration: "20 mins", questionsCount: 10 }
    ],
    notifications: [
      { id: "n12", title: "Quiz Master", desc: "91% average score across all AI quizzes", time: "4 hours ago" }
    ],
    subjectPerformance: [
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 89, status: "Mastered", statusColor: "#10b981", weakTopic: "Vector Math", completedModules: 12, totalModules: 14 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 92, status: "Mastered", statusColor: "#10b981", weakTopic: "Trie Tree", completedModules: 15, totalModules: 16 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 90, status: "Mastered", statusColor: "#06b6d4", weakTopic: "Tailwind CSS", completedModules: 11, totalModules: 12 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 86, status: "On Track", statusColor: "#6366f1", weakTopic: "Virtual Memory", completedModules: 9, totalModules: 11 }
    ],
    recentActivities: [
      { id: "ra-10", type: "quiz", title: "Quiz: Neural Networks", score: "92%", time: "3 hours ago" }
    ]
  },
  {
    id: "STU010",
    name: "Karan Mehta",
    password: "student123",
    department: "CSE (AIML)",
    college: "Institute of Technology & Engineering",
    semester: "Semester 5 (3rd Year)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250",
    attendance: 64,
    internalMarks: 51,
    quizScore: 45,
    overallPerformance: 52,
    learningProgress: 42,
    performanceCategory: "At Risk",
    riskStatus: "High Risk",
    weakSubjects: ["AI & ML – Gradient Descent", "Recursion & Backtracking"],
    recommendedTopics: ["Visualizing Loss Functions", "Recursion Call Stack", "Basics of Python ML Libs"],
    aiRecommendation: "Alert: High risk flagged for Machine Learning. Please schedule an AI Socratic walkthrough session on Gradient Descent.",
    studyMaterials: [
      { id: "sm-14", title: "Gradient Descent Interactive Lab", type: "Interactive Guide", size: "3.0 MB", icon: "FileText" }
    ],
    upcomingQuizzes: [
      { id: "uq-11", title: "Remedial Quiz: Machine Learning Basics", date: "Tomorrow, 2:00 PM", duration: "10 mins", questionsCount: 5 }
    ],
    notifications: [
      { id: "n13", title: "Attendance Warning", desc: "Critical: Attendance at 64% (Below 75%)", time: "5 hours ago" }
    ],
    subjectPerformance: [
      { id: "aiml", name: "AI & ML", code: "CS-502", mastery: 45, status: "At Risk", statusColor: "#ef4444", weakTopic: "Gradient Descent", completedModules: 3, totalModules: 14 },
      { id: "dsa", name: "Data Structures", code: "CS-501", mastery: 50, status: "At Risk", statusColor: "#ef4444", weakTopic: "Recursion", completedModules: 5, totalModules: 16 },
      { id: "os", name: "Operating Systems", code: "CS-504", mastery: 54, status: "Needs Focus", statusColor: "#f59e0b", weakTopic: "Processes", completedModules: 4, totalModules: 11 },
      { id: "web", name: "Web Architectures", code: "CS-503", mastery: 60, status: "In Progress", statusColor: "#6366f1", weakTopic: "HTML/JS", completedModules: 6, totalModules: 12 }
    ],
    recentActivities: [
      { id: "ra-11", type: "quiz", title: "Attempted ML Quiz", score: "45%", time: "Yesterday" }
    ]
  }
];

export const mockTeacherData = {
  profile: {
    username: "hod",
    password: "hod123",
    name: "Dr. Sunita Verma",
    designation: "HOD - CSE (AIML) Department",
    department: "CSE (AIML) Department",
    college: "Institute of Technology & Engineering",
    totalStudents: sampleStudents.length,
    activeBatches: 3,
    avgClassMastery: 78.4,
    avgAttendance: 84.3,
    avgInternalMarks: 75.9,
    avgQuizScore: 74.6,
    atRiskCount: sampleStudents.filter(s => s.performanceCategory === "At Risk").length,
    goodCount: sampleStudents.filter(s => s.performanceCategory === "Good Performance").length,
    averageCount: sampleStudents.filter(s => s.performanceCategory === "Average Performance").length,
    aiInterventionRate: "24% Auto Assisted"
  },
  
  strugglingAlerts: [
    { id: "a1", studentId: "STU003", student: "Student Three", subject: "Data Structures", issue: "Attendance 68% & Failed Graph Quiz (48%)", recommendedAction: "Assign AI Adaptive Remedial Plan #DSA-02" },
    { id: "a2", studentId: "STU006", student: "Rohan Gupta", subject: "Operating Systems", issue: "Failed Semaphore Quiz (42%)", recommendedAction: "Assign AI Adaptive Remedial Plan #OS-04" },
    { id: "a3", studentId: "STU010", student: "Karan Mehta", subject: "AI & ML", issue: "Stuck on Gradient Descent for 3 days (45%)", recommendedAction: "Send 1-on-1 AI Tutor Guided Walkthrough" }
  ],

  subjectAverages: [
    { subject: "Data Structures & Algorithms", avgScore: 82, trend: "+4%" },
    { subject: "AI & Machine Learning", avgScore: 75, trend: "+6%" },
    { subject: "Full Stack Web Architectures", avgScore: 89, trend: "+2%" },
    { subject: "Operating Systems & Virtualization", avgScore: 67, trend: "-1%" }
  ]
};

export const mockQuizzes = [
  {
    id: "q-prob-1",
    title: "Probability Basics: Foundational AI Remedial Assessment",
    subject: "Probability & Statistics",
    duration: "10 mins",
    totalQuestions: 3,
    questions: [
      {
        id: 1,
        question: "If two events A and B are mutually exclusive, what is P(A ∩ B)?",
        options: ["0", "1", "P(A) × P(B)", "P(A) + P(B)"],
        correctAnswer: 0,
        explanation: "Mutually exclusive events cannot occur at the same time, so the probability of their intersection is 0."
      },
      {
        id: 2,
        question: "What does Bayes' Theorem allow us to calculate?",
        options: [
          "Prior probability from likelihood",
          "Posterior probability given evidence: P(A|B) = P(B|A)P(A) / P(B)",
          "Cumulative distribution of continuous variables",
          "Standard deviation of discrete random variables"
        ],
        correctAnswer: 1,
        explanation: "Bayes' Theorem provides a mathematical framework for updating conditional probabilities based on new evidence."
      },
      {
        id: 3,
        question: "What is the probability of rolling a sum of 7 with two fair 6-sided dice?",
        options: ["1/6", "1/12", "1/36", "5/36"],
        correctAnswer: 0,
        explanation: "There are 6 favorable outcomes out of 36 total possibilities: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Thus, 6/36 = 1/6."
      }
    ]
  },
  {
    id: "q-dsa-1",
    title: "Data Structures: Graph & Trees Challenge",
    subject: "Data Structures & Algorithms",
    duration: "10 mins",
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: "Which data structure is best suited for implementing Dijkstra's Single Source Shortest Path Algorithm efficiently?",
        options: [
          "Binary Search Tree",
          "Min Priority Queue (Min Heap)",
          "Simple Circular Queue",
          "Stack"
        ],
        correctAnswer: 1,
        explanation: "A Min-Priority Queue (Min Heap) allows extracting the minimum distance node in O(log V) time, giving Dijkstra an overall complexity of O((V + E) log V)."
      },
      {
        id: 2,
        question: "What is the worst-case time complexity of searching in an unbalanced Binary Search Tree with N nodes?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctAnswer: 2,
        explanation: "In an unbalanced BST (e.g. skewed tree like a linked list), searching degenerates to linear time O(N)."
      },
      {
        id: 3,
        question: "Which graph traversal technique uses a Queue data structure?",
        options: ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Pre-Order Traversal", "In-Order Traversal"],
        correctAnswer: 0,
        explanation: "BFS explores vertices layer by layer using a FIFO Queue."
      },
      {
        id: 4,
        question: "What property must a problem possess for Dynamic Programming to be applicable?",
        options: ["Greedy Choice", "Optimal Substructure & Overlapping Subproblems", "Divide & Conquer without Memory", "Randomized Pivot Selection"],
        correctAnswer: 1,
        explanation: "Dynamic Programming requires Optimal Substructure and Overlapping Subproblems."
      }
    ]
  },
  {
    id: "q-os-1",
    title: "Operating Systems: Process Synchronization & Deadlocks",
    subject: "Operating Systems",
    duration: "8 mins",
    totalQuestions: 3,
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT one of the 4 necessary conditions for a deadlock?",
        options: ["Mutual Exclusion", "Hold and Wait", "Preemption Allowed", "Circular Wait"],
        correctAnswer: 2,
        explanation: "NO PREEMPTION is a necessary condition for deadlock. If preemption is allowed, deadlocks can be broken by forcibly taking resources."
      },
      {
        id: 2,
        question: "What is the key difference between a Mutex and a Counting Semaphore?",
        options: ["Mutex can only be unlocked by the thread that locked it", "Mutex is faster than binary arithmetic", "Counting Semaphores only take values 0 and 1", "There is no difference"],
        correctAnswer: 0,
        explanation: "A Mutex incorporates ownership semantics (only lock holder can unlock), whereas Semaphores act as signaling devices."
      },
      {
        id: 3,
        question: "Which algorithm is used for Deadlock Avoidance in Operating Systems?",
        options: ["Banker's Algorithm", "Round Robin Algorithm", "LRU Page Replacement", "Elevator Scheduling"],
        correctAnswer: 0,
        explanation: "Dijkstra's Banker's Algorithm checks resource request safety matrices before allocation."
      }
    ]
  }
];

export const mockAiPrompts = [
  "Explain Machine Learning Decision Trees step-by-step with a simple real-world example.",
  "What is the difference between Mutex and Semaphore in Operating Systems?",
  "How does Gradient Descent minimize loss function in Machine Learning?",
  "Give me a quick 3-minute quiz on React hooks.",
  "Can you create a personalized 5-day study roadmap for Data Structures?"
];

export const mockAiResponses = {
  "Explain Machine Learning Decision Trees step-by-step with a simple real-world example.": `### 🌳 Machine Learning: Decision Trees Explained

Think of a **Decision Tree** like a flowchart used to make decisions!

---

#### 💡 Core Concept:
A Decision Tree splits data into smaller branches based on feature conditions (e.g. *Is Age > 25?*).

#### 🔑 Key Terminology:
1. **Root Node**: The top node representing the entire dataset.
2. **Splitting Criteria**: **Information Gain** or **Gini Impurity** determines which feature splits the data cleanest.
3. **Leaf Node**: Final decision output (e.g., *Pass* or *Fail*).

#### 📐 Mathematical Splitting (Entropy):
$$\\text{Entropy}(S) = - \\sum p_i \\log_2 (p_i)$$

$$\\text{Information Gain} = \\text{Entropy(Parent)} - \\text{Weighted Avg Entropy(Children)}$$

\`\`\`python
from sklearn.tree import DecisionTreeClassifier
model = DecisionTreeClassifier(criterion='entropy', max_depth=3)
model.fit(X_train, y_train)
\`\`\`

> **Smart AI Tip**: To prevent overfitting, prune tree depth or use **Random Forest** ensembles!`,

  "What is the difference between Mutex and Semaphore in Operating Systems?": `### 🔒 Mutex vs Semaphore Comparison

| Feature | Mutex (Mutual Exclusion) | Semaphore |
|---|---|---|
| **Concept** | Locking mechanism (only 1 thread) | Signaling mechanism ($N$ resources) |
| **Ownership** | Only thread that acquired lock can release it | Any thread can post/signal |
| **Value** | Binary (0 or 1) | Counting integer ($0, 1, 2, \\dots, N$) |
| **Analogy** | Single key to a private washroom | Parking lot with $N$ available spots |

#### 🧪 Interactive Check:
Do you want me to generate a 3-question micro quiz on Semaphores to test your retention?`,

  "How does Gradient Descent minimize loss function in Machine Learning?": `### 📉 Gradient Descent Explained

Imagine standing at the top of a foggy mountain 🏔️ wanting to reach the bottom valley (minimum loss) taking the steepest downward steps!

$$\\theta_{\\text{new}} = \\theta_{\\text{old}} - \\alpha \\cdot \\nabla L(\\theta)$$

Where $\\alpha$ is the **Learning Rate**.`
};

export const mockStudyTasks = [
  { id: 'task-1', title: 'Complete AI Decision Trees Assignment', subject: 'Artificial Intelligence & ML', dueDate: 'Today, 8:00 PM', priority: 'High', completed: false, duration: '45 mins' },
  { id: 'task-2', title: 'Revise Graph BFS & DFS Traversal Code', subject: 'Data Structures & Algorithms', dueDate: 'Tomorrow, 10:00 AM', priority: 'Medium', completed: false, duration: '60 mins' },
  { id: 'task-3', title: 'Read OS Semaphore & Mutex Chapter 4', subject: 'Operating Systems & Virtualization', dueDate: 'Sep 12, 2026', priority: 'High', completed: true, duration: '30 mins' },
  { id: 'task-4', title: 'Practice React Context & Custom Hooks', subject: 'Full Stack Web Architectures', dueDate: 'Sep 13, 2026', priority: 'Low', completed: false, duration: '40 mins' },
  { id: 'task-5', title: 'Solve 5 Calculus Optimization Problems', subject: 'Applied Mathematics', dueDate: 'Sep 14, 2026', priority: 'Medium', completed: false, duration: '50 mins' }
];

export const mockNotes = [
  {
    id: 'note-1',
    title: 'Decision Trees & Entropy Derivation',
    subject: 'Artificial Intelligence & ML',
    tags: ['AI', 'Formulas', 'Exam Prep'],
    date: 'Sep 08, 2026',
    content: 'Entropy measures impurity in dataset splits: H(S) = - sum(p_i * log2(p_i)). High entropy means high disorder. Information gain calculates reduction in entropy after splitting.',
    aiSummary: 'Entropy measures disorder in datasets. Information gain evaluates how much a split reduces uncertainty.'
  },
  {
    id: 'note-2',
    title: 'Dijkstra vs Bellman-Ford Shortest Path',
    subject: 'Data Structures & Algorithms',
    tags: ['Algorithms', 'Graphs', 'Code'],
    date: 'Sep 06, 2026',
    content: 'Dijkstra works for non-negative edge weights using Min-Heap O((V+E)logV). Bellman-Ford handles negative weights but runs slower in O(V*E) time.',
    aiSummary: 'Dijkstra is faster for positive edge graphs; Bellman-Ford handles negative weights.'
  },
  {
    id: 'note-3',
    title: 'Operating Systems Deadlock 4 Conditions',
    subject: 'Operating Systems & Virtualization',
    tags: ['OS', 'Concurrency', 'Theory'],
    date: 'Sep 04, 2026',
    content: '4 Coffman conditions required for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait. Breaking any single condition prevents deadlock.',
    aiSummary: 'Deadlock requires 4 simultaneous conditions. Removing 1 condition breaks the deadlock cycle.'
  }
];

export const mockSubjectsList = [
  {
    id: 'subj-1',
    name: 'Artificial Intelligence & Machine Learning',
    code: 'CS-502',
    instructor: 'Dr. Sunita Verma',
    credits: 4,
    progress: 78,
    attendance: 92,
    nextExam: 'Sep 24, 2026',
    color: 'from-indigo-500 to-purple-600',
    badgeColor: 'badge-indigo',
    description: 'Core concepts of intelligent systems, supervised/unsupervised learning models, neural networks, and decision algorithms.',
    syllabus: [
      { unit: 'Unit 1', title: 'Problem Solving & State Space Search', completed: true },
      { unit: 'Unit 2', title: 'Supervised Learning & Decision Trees', completed: true },
      { unit: 'Unit 3', title: 'Neural Networks & Deep Learning Basics', completed: false },
      { unit: 'Unit 4', title: 'Reinforcement Learning & Ethics', completed: false }
    ],
    resources: [
      { name: 'Decision Trees Lecture Slides.pdf', type: 'PDF', size: '4.5 MB' },
      { name: 'Linear Regression Lab Code.ipynb', type: 'Notebook', size: '1.2 MB' },
      { name: 'Neural Nets Chapter Notes.pdf', type: 'PDF', size: '3.8 MB' }
    ]
  },
  {
    id: 'subj-2',
    name: 'Data Structures & Algorithms',
    code: 'CS-501',
    instructor: 'Prof. Rajesh Kumar',
    credits: 4,
    progress: 94,
    attendance: 96,
    nextExam: 'Sep 20, 2026',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'badge-emerald',
    description: 'Advanced data structures including AVL trees, B-Trees, Red-Black Trees, Graphs, Dynamic Programming, and Greedy algorithms.',
    syllabus: [
      { unit: 'Unit 1', title: 'Arrays, Stacks, Queues & Linked Lists', completed: true },
      { unit: 'Unit 2', title: 'Binary Trees & Balanced Trees', completed: true },
      { unit: 'Unit 3', title: 'Graph Traversal & Shortest Path', completed: true },
      { unit: 'Unit 4', title: 'Dynamic Programming & NP-Completeness', completed: false }
    ],
    resources: [
      { name: 'Graph Algorithms Cheatsheet.pdf', type: 'PDF', size: '2.8 MB' },
      { name: 'DP Patterns Guide.pdf', type: 'PDF', size: '5.1 MB' }
    ]
  },
  {
    id: 'subj-3',
    name: 'Full Stack Web Architectures',
    code: 'CS-503',
    instructor: 'Prof. Ankit Sharma',
    credits: 3,
    progress: 96,
    attendance: 98,
    nextExam: 'Oct 02, 2026',
    color: 'from-cyan-500 to-blue-600',
    badgeColor: 'badge-cyan',
    description: 'Modern front-end frameworks (React, Next.js), REST APIs, GraphQL, asynchronous programming, and web app security.',
    syllabus: [
      { unit: 'Unit 1', title: 'HTML5, CSS3, & Modern JavaScript ES6+', completed: true },
      { unit: 'Unit 2', title: 'React Hooks, Context, & State Management', completed: true },
      { unit: 'Unit 3', title: 'RESTful API & GraphQL Integration', completed: true },
      { unit: 'Unit 4', title: 'Containerization & Cloud Deployment', completed: true }
    ],
    resources: [
      { name: 'React State Management Architecture.pdf', type: 'PDF', size: '3.4 MB' },
      { name: 'Fullstack Project Starter Kit.zip', type: 'Code', size: '14.2 MB' }
    ]
  },
  {
    id: 'subj-4',
    name: 'Operating Systems & Virtualization',
    code: 'CS-504',
    instructor: 'Dr. Meenakshi Sundaram',
    credits: 4,
    progress: 74,
    attendance: 88,
    nextExam: 'Sep 28, 2026',
    color: 'from-amber-500 to-orange-600',
    badgeColor: 'badge-amber',
    description: 'Process management, thread scheduling, memory allocation, virtual memory, race conditions, semaphores, and file systems.',
    syllabus: [
      { unit: 'Unit 1', title: 'OS Structures & Process Scheduling', completed: true },
      { unit: 'Unit 2', title: 'Threads & Synchronization (Semaphores)', completed: true },
      { unit: 'Unit 3', title: 'Deadlock Avoidance & Memory Management', completed: false },
      { unit: 'Unit 4', title: 'Virtualization & Hypervisors', completed: false }
    ],
    resources: [
      { name: 'Process Synchronization Notes.pdf', type: 'PDF', size: '3.1 MB' },
      { name: 'Virtual Memory & Paging Lab.pdf', type: 'PDF', size: '2.6 MB' }
    ]
  }
];

export const mockAchievements = [
  { id: 'ach-1', title: '7-Day Study Streak', desc: 'Logged in and studied for 7 consecutive days', icon: '🔥', unlocked: true, date: 'Sep 09, 2026' },
  { id: 'ach-2', title: 'Quiz Master', desc: 'Scored above 90% in 5 different subject quizzes', icon: '🎯', unlocked: true, date: 'Sep 05, 2026' },
  { id: 'ach-3', title: 'AI Assistant Pioneer', desc: 'Asked over 25 learning questions to AI Tutor', icon: '🤖', unlocked: true, date: 'Sep 02, 2026' },
  { id: 'ach-4', title: 'Focus Champion', desc: 'Completed 10 Pomodoro study sessions', icon: '⏱️', unlocked: false, date: 'Locked' },
  { id: 'ach-5', title: 'Subject Scholar', desc: 'Achieved 100% completion in any enrolled course', icon: '🏆', unlocked: false, date: 'Locked' }
];

