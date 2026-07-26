import React, { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";
import DiagnosisHistory from "./DiagnosisHistory";
import PatientDetails from "./PatientsDetails";

function PatientDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activePatientRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPatients = async () => {
      try {
        const token = btoa("coalition:skills-test");

        const response = await fetch(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            headers: {
              Authorization: `Basic ${token}`,
            },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch patients.");
        }

        const data = await response.json();

        setPatients(data);

        const jessica = data.find(
          (patient) => patient.name === "Jessica Taylor"
        );

        setSelectedPatient(jessica || data[0]);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();

    return () => controller.abort();
  }, []);

  // Seçilmiş pasiyent dəyişəndə siyahını ona avtomatik scroll et
  useEffect(() => {
    if (activePatientRef.current) {
      activePatientRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedPatient]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar skeleton */}
        <div className="bg-white px-4 md:px-6 py-3 md:py-4 shadow-xs border-b border-gray-100 flex items-center justify-between gap-3">
          <div className="w-[110px] md:w-[140px] h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-1 max-w-md h-9 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-32 h-9 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        <main className="p-4 md:p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Patients list skeleton */}
          <section className="bg-white rounded-2xl p-4 md:p-5 shadow-xs flex flex-col h-[380px] sm:h-[440px] lg:h-[calc(100vh-140px)]">
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="w-11 h-11 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-24 h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-16 h-2.5 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Diagnosis history skeleton */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <section className="bg-white rounded-2xl p-4 md:p-6 shadow-xs">
              <div className="w-40 h-5 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="bg-[#F4F0F8] rounded-2xl p-5 h-72 animate-pulse"></div>
            </section>
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl p-5 bg-gray-100 h-40 animate-pulse"></div>
              ))}
            </section>
            <section className="bg-white rounded-2xl p-4 md:p-6 shadow-xs">
              <div className="w-40 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="w-full h-40 bg-gray-100 rounded-xl animate-pulse"></div>
            </section>
          </div>

          {/* Patient details skeleton */}
          <div className="space-y-6">
            <section className="bg-white rounded-2xl p-6 shadow-xs">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse mb-4"></div>
                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="space-y-4 my-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-20 h-2.5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-28 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="bg-white rounded-2xl p-6 shadow-xs">
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-full h-10 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      <Navbar patients={patients} onSelectPatient={setSelectedPatient} />

      <main className="p-4 md:p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">

        {/* Patients List */}
        <section className="bg-white rounded-2xl p-4 md:p-5 shadow-xs flex flex-col h-[380px] sm:h-[440px] lg:h-[calc(100vh-140px)] lg:min-h-[500px]">

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-800">
              Patients
            </h2>
          </div>

          <div className="space-y-2 overflow-y-auto flex-1 pr-1">

            {patients.map((patient) => {

              const active =
                selectedPatient?.name === patient.name;

              return (
                <div
                  key={patient.name}
                  ref={active ? activePatientRef : null}
                  onClick={() => setSelectedPatient(patient)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition ${
                    active
                      ? "bg-[#D8FCF7] border-l-4 border-teal-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">

                    <img
                      src={patient.profile_picture}
                      alt={patient.name}
                      className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0"
                    />

                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {patient.name}
                      </h4>

                      <p className="text-xs text-gray-400">
                        {patient.gender}, {patient.age}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </section>

        <DiagnosisHistory patient={selectedPatient} />

        <PatientDetails patient={selectedPatient} />

      </main>
    </div>
  );
}

export default PatientDashboard;