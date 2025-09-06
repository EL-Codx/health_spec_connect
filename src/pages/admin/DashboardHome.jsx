import React, { useEffect, useState } from 'react';
import StatsOverview from '../../components/shared/StatsOverview';
import RecentActivities from '../../components/shared/RecentActivities';
import AppointmentsChart from '../../components/AppointmentChart';

const DashboardHome = () => {
    const [userCount, setUserCount] = useState(0)
    const [patientCount, setPatientCount] = useState(0)
    const [specialistCount, setSpecialistCount] = useState(0)

    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/all");
        const data = await res.json();

        // count of users
        const user_count = data.filter(user => user.role === "admin" || user.role === "support").length;
        const patient_count = data.filter(user => user.role === "patient").length;
        const specialist_count = data.filter(user => user.role === "specialist").length;

        setUserCount(user_count);
        setPatientCount(patient_count);
        setSpecialistCount(specialist_count);
      } catch (err) {
        console.error("Error fetching users:", err);
      }

    };


    
    // useEffect(() => {
    //   fetchPatients();
    // }, []);
  
    // const fetchPatients = async () => {
    //   try {
    //     // patient
    //     const res = await fetch("http://localhost:5000/api/patients/");
    //     // console.log(res)
    //     // const data = await res.json();
    //     // console.log(data)

    //     // const patient_count = Object.keys(data).length;

    //     // setPatientCount(patient_count);
    //   } catch (err) {
    //     console.error("Error fetching patients:", err);
    //   }

    // };



  return (
    <div>
      <h4 className="mb-4">Admin Dashboard</h4>
      <StatsOverview total_users={userCount} total_patient={patientCount} total_specialist={specialistCount} />
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
