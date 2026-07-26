import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Lungs, Heart, Temperature } from "./organ/organs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function DiagnosisHistory({ patient }) {
  if (!patient) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading patient...
      </div>
    );
  }

  const diagnosisHistory = useMemo(() => {
    return patient.diagnosis_history
      ? [...patient.diagnosis_history].reverse()
      : [];
  }, [patient]);

  const currentDiagnosis =
    diagnosisHistory[diagnosisHistory.length - 1] || {};

  const chartData = {
    labels: diagnosisHistory.map(
      (item) => `${item.month.slice(0, 3)}, ${item.year}`
    ),

    datasets: [
      {
        label: "Systolic",
        data: diagnosisHistory.map(
          (item) => item.blood_pressure.systolic.value
        ),
        borderColor: "#E66FD2",
        backgroundColor: "#E66FD2",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
      {
        label: "Diastolic",
        data: diagnosisHistory.map(
          (item) => item.blood_pressure.diastolic.value
        ),
        borderColor: "#8C6FE6",
        backgroundColor: "#8C6FE6",
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          font: { size: 10 },
        },
        grid: {
          color: "#E5E7EB",
        },
      },

      x: {
        ticks: {
          font: { size: 9 },
          maxRotation: 45,
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:overflow-y-auto lg:h-[calc(100vh-140px)] pr-0 lg:pr-1">
      <section className="bg-white rounded-2xl p-4 md:p-6 shadow-xs">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">
          Diagnosis History
        </h2>

        <div className="bg-[#F4F0F8] rounded-2xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 min-w-0">
            <div className="flex justify-between items-center mb-4 md:mb-5">
              <span className="text-sm font-bold text-slate-800">
                Blood Pressure
              </span>

              <select className="bg-transparent text-xs text-gray-500 outline-none cursor-pointer">
                <option>Last 6 months</option>
              </select>
            </div>

            <div className="h-52 sm:h-64 md:h-72 w-full">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="flex md:block gap-6 md:gap-0 space-y-0 md:space-y-5 border-t md:border-t-0 md:border-l border-gray-300 pt-4 md:pt-0 md:pl-6">
            <div className="flex-1 md:flex-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E66FD2] shrink-0"></span>

                <span className="text-xs font-bold">
                  Systolic
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mt-2">
                {currentDiagnosis?.blood_pressure?.systolic?.value}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                ▲ {currentDiagnosis?.blood_pressure?.systolic?.levels}
              </p>
            </div>

            <div className="flex-1 md:flex-none md:border-t md:pt-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#8C6FE6] shrink-0"></span>

                <span className="text-xs font-bold">
                  Diastolic
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mt-2">
                {currentDiagnosis?.blood_pressure?.diastolic?.value}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                ▼ {currentDiagnosis?.blood_pressure?.diastolic?.levels}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">

        {/* Respiratory */}
        <div className="bg-[#E0F3FA] rounded-2xl p-3 sm:p-5">
          <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-5">
            <img src={Lungs} alt="" className="w-5 h-5 sm:w-8 sm:h-8" />
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Respiratory Rate
          </p>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
            {currentDiagnosis?.respiratory_rate?.value} bpm
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4">
            {currentDiagnosis?.respiratory_rate?.levels}
          </p>
        </div>

        {/* Temperature */}
        <div className="bg-[#FFE6E9] rounded-2xl p-3 sm:p-5">
          <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-5">
            <img src={Temperature} alt="" className="w-5 h-5 sm:w-8 sm:h-8" />
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Temperature
          </p>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
            {currentDiagnosis?.temperature?.value}°F
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4">
            {currentDiagnosis?.temperature?.levels}
          </p>
        </div>

        {/* Heart */}
        <div className="bg-[#FFE6F1] rounded-2xl p-3 sm:p-5 col-span-2 sm:col-span-1">
          <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center mb-3 sm:mb-5">
            <img src={Heart} alt="" className="w-5 h-5 sm:w-8 sm:h-8" />
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            Heart Rate
          </p>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
            {currentDiagnosis?.heart_rate?.value} bpm
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-4">
            ▼ {currentDiagnosis?.heart_rate?.levels}
          </p>
        </div>

      </section>

      <section className="bg-white rounded-2xl p-4 md:p-6 shadow-xs">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4 md:mb-7">
          Diagnostic List
        </h2>

        {/* Desktop/tablet*/}
        <div className="hidden sm:block rounded-xl overflow-hidden border border-gray-100">

          <table className="w-full">

            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Problem/Diagnosis
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Description
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

          </table>

          <div className="max-h-72 overflow-y-auto">

            <table className="w-full">

              <tbody>

                {(patient.diagnostic_list || []).map((item, index) => (

                  <tr
                    key={index}
                    className="border-b last:border-none align-top"
                  >
                    <td className="px-6 py-4 text-sm w-1/4 font-medium">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-sm w-1/2 text-gray-600">
                      {item.description}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {item.status}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Mobil*/}
        <div className="sm:hidden space-y-3 max-h-96 overflow-y-auto">
          {(patient.diagnostic_list || []).map((item, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-4 bg-gray-50"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-800">
                  {item.name}
                </h4>
                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full shrink-0 ml-2">
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}

export default DiagnosisHistory;