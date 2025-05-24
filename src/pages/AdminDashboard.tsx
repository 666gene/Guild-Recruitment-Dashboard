import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import ApplicantList from '../components/admin/ApplicantList';
import ApplicantDetails from '../components/admin/ApplicantDetails';
import DashboardStats from '../components/admin/DashboardStats';
import { Applicant } from '../types';
import { mockApplicants } from '../data/mockData';

const AdminDashboard = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      setIsLoading(true);
      try {
        // This would be an API call in production
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplicants(mockApplicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
        toast.error('Failed to load applicant data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const updateApplicantStatus = async (id: string, status: string, notes?: string) => {
    try {
      // This would be an API call in production
      setApplicants(applicants.map(app => 
        app.id === id 
          ? { ...app, status: status as any, officerNotes: notes || app.officerNotes } 
          : app
      ));
      
      toast.success(`Applicant status updated to ${status}`);
      return true;
    } catch (error) {
      toast.error('Failed to update applicant status');
      return false;
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="bg-background-light border-b border-primary/20 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display text-primary">Officer Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, <span className="text-primary">{user?.username}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <>
              <DashboardStats applicants={applicants} />
              <div className="mt-8">
                <ApplicantList 
                  applicants={applicants} 
                  isLoading={isLoading}
                  updateStatus={updateApplicantStatus}
                />
              </div>
            </>
          } />
          <Route path="/applicant/:id" element={
            <ApplicantDetails 
              applicants={applicants} 
              updateStatus={updateApplicantStatus}
            />
          } />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;