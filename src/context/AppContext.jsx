import React, { createContext, useContext, useState, useEffect } from 'react';
import { PROMOTIONAL_CAMPAIGNS } from '../data/campaignsData';
import { SERVICES_LIST } from '../data/servicesData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('HOME'); // HOME, ABOUT, COURSES, SERVICES, CBT, ADMISSIONS, BLOG, RESULTS, CONTACT, DASHBOARD, ADMIN
  
  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(SERVICES_LIST[0]);
  
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentItem, setPaymentItem] = useState(null);

  // Student Enrolled Courses
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('d_ensured_enrolled');
    return saved ? JSON.parse(saved) : ['jamb-mastery-2026', 'unilag-post-utme-2026'];
  });

  // CBT Attempts History
  const [cbtAttempts, setCbtAttempts] = useState(() => {
    const saved = localStorage.getItem('d_ensured_cbt_attempts');
    return saved ? JSON.parse(saved) : [
      {
        id: 'attempt_101',
        date: '2026-09-15 14:30',
        subjectId: 'english',
        subjectName: 'Use of English',
        score: 35,
        totalQuestions: 40,
        percentage: 87.5,
        timeSpent: '18 mins',
        grade: 'Distinction'
      },
      {
        id: 'attempt_102',
        date: '2026-09-20 10:15',
        subjectId: 'postutme_unilag',
        subjectName: 'UNILAG Post-UTME Mock',
        score: 26,
        totalQuestions: 30,
        percentage: 86.6,
        timeSpent: '22 mins',
        grade: 'Qualified (25+ Target Met)'
      }
    ];
  });

  // Service Requests Tracking
  const [serviceRequests, setServiceRequests] = useState(() => {
    const saved = localStorage.getItem('d_ensured_service_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'REQ-2026-881',
        serviceId: 'change-institution',
        serviceTitle: 'Change of Institution',
        studentName: 'Chinedu Okonkwo',
        phone: '08123456789',
        targetInstitution: 'University of Lagos (UNILAG)',
        targetCourse: 'Computer Science',
        status: 'Processing',
        date: '2026-09-21'
      }
    ];
  });

  // Campaigns list
  const [campaigns, setCampaigns] = useState(PROMOTIONAL_CAMPAIGNS);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'UNILAG Post-UTME Registration', message: 'Target 25/30 preparation class begins this Monday.', date: '2 Hours ago', read: false },
    { id: 2, title: 'JAMB CAPS Result Upload', message: 'Ensure your O\'Level results are updated before clearance starts.', date: '1 Day ago', read: false }
  ]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('d_ensured_enrolled', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('d_ensured_cbt_attempts', JSON.stringify(cbtAttempts));
  }, [cbtAttempts]);

  useEffect(() => {
    localStorage.setItem('d_ensured_service_requests', JSON.stringify(serviceRequests));
  }, [serviceRequests]);

  // Actions
  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const openServiceModal = (service) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setIsCourseModalOpen(true);
  };

  const initiatePayment = (item) => {
    setPaymentItem(item);
    setIsPaymentModalOpen(true);
  };

  const completePayment = (item) => {
    if (item.type === 'course') {
      if (!enrolledCourses.includes(item.id)) {
        setEnrolledCourses(prev => [...prev, item.id]);
      }
    } else if (item.type === 'service') {
      const newReq = {
        id: 'REQ-2026-' + Math.floor(100 + Math.random() * 900),
        serviceId: item.id,
        serviceTitle: item.title,
        studentName: item.studentName || 'Student Candidate',
        phone: item.phone || '08147896930',
        status: 'Processing',
        date: new Date().toISOString().split('T')[0]
      };
      setServiceRequests(prev => [newReq, ...prev]);
    }
    setIsPaymentModalOpen(false);
  };

  const addCbtAttempt = (attemptData) => {
    const newAttempt = {
      id: 'attempt_' + Date.now(),
      date: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      ...attemptData
    };
    setCbtAttempts(prev => [newAttempt, ...prev]);
  };

  const submitServiceRequest = (formData) => {
    const newReq = {
      id: 'REQ-2026-' + Math.floor(100 + Math.random() * 900),
      serviceId: formData.serviceId,
      serviceTitle: formData.serviceTitle,
      studentName: formData.studentName,
      phone: formData.phone,
      targetInstitution: formData.targetInstitution || 'N/A',
      targetCourse: formData.targetCourse || 'N/A',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setServiceRequests(prev => [newReq, ...prev]);
    setIsServiceModalOpen(false);
    return newReq;
  };

  const adminUpdateServiceStatus = (reqId, newStatus) => {
    setServiceRequests(prev => prev.map(req => req.id === reqId ? { ...req, status: newStatus } : req));
  };

  const adminToggleCampaign = (campaignId) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, active: !c.active } : c));
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authModalMode,
      openAuthModal,
      isServiceModalOpen,
      setIsServiceModalOpen,
      selectedService,
      openServiceModal,
      isCourseModalOpen,
      setIsCourseModalOpen,
      selectedCourse,
      openCourseModal,
      isPaymentModalOpen,
      setIsPaymentModalOpen,
      paymentItem,
      initiatePayment,
      completePayment,
      enrolledCourses,
      cbtAttempts,
      addCbtAttempt,
      serviceRequests,
      submitServiceRequest,
      adminUpdateServiceStatus,
      campaigns,
      adminToggleCampaign,
      notifications
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
