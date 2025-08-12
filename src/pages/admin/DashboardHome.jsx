import React from 'react';
import StatsOverview from '../../components/shared/StatsOverview';
import RecentActivities from '../../components/shared/RecentActivities';
import AppointmentsChart from '../../components/AppointmentChart';

const DashboardHome = () => {
  return (
    <div>
      <h4 className="mb-4">Admin Dashboard</h4>
      <StatsOverview />
      <div className="row mt-4">
        <div className="col-md-8">
          <AppointmentsChart />
        </div>
        <div className="col-md-4">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
