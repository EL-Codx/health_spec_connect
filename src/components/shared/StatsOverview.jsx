import React from 'react';
import DashboardCard from './DashbboardCard';
import { FaUsers, FaUserMd, FaUserInjured, FaCalendarAlt } from 'react-icons/fa';

const StatsOverview = () => {
  const stats = [
    { label: 'Users', count: 120, bg: 'primary', icon: <FaUsers size={30} /> },
    { label: 'Specialists', count: 35, bg: 'success', icon: <FaUserMd size={30} /> },
    { label: 'Patients', count: 200, bg: 'info', icon: <FaUserInjured size={30} /> },
    { label: 'Appointments', count: 75, bg: 'warning', icon: <FaCalendarAlt size={30} /> },
  ];

  return (
    <div className="row">
      {stats.map((item, idx) => (
        <div key={idx} className="col-md-3 mb-3">
          <DashboardCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
