import React, { useState } from "react";

function PatientDetails({ patient }) {
  const [showModal, setShowModal] = useState(false);

  if (!patient) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-xs h-[calc(100vh-140px)] flex items-center justify-center text-gray-400">
        Select a patient to see details
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Details */}
      <section className="bg-white rounded-2xl p-6 shadow-xs">
        <div className="text-center flex flex-col items-center mt-2">
          <img
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-teal-50"
            src={patient.profile_picture}
            alt={patient.name}
          />

          <h3 className="text-xl font-bold text-slate-800 mt-4">
            {patient.name}
          </h3>
        </div>

        <div className="space-y-5 my-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              📅
            </div>

            <div>
              <p className="text-xs text-gray-400">Date Of Birth</p>
              <p className="text-sm font-bold">
                {patient.date_of_birth || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              {patient.gender === "Female" ? "♀️" : "♂️"}
            </div>

            <div>
              <p className="text-xs text-gray-400">Gender</p>
              <p className="text-sm font-bold">{patient.gender}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              📞
            </div>

            <div>
              <p className="text-xs text-gray-400">Contact Info.</p>
              <p className="text-sm font-bold">
                {patient.phone_number || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              🚨
            </div>

            <div>
              <p className="text-xs text-gray-400">Emergency Contacts</p>
              <p className="text-sm font-bold">
                {patient.emergency_contact || "Məlumat yoxdur"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              🛡️
            </div>

            <div>
              <p className="text-xs text-gray-400">Insurance Provider</p>
              <p className="text-sm font-bold">
                {patient.insurance_type || "Məlumat yoxdur"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#01F1C6] hover:bg-[#00d0ab] text-slate-800 font-bold py-3 rounded-full transition"
        >
          Show All Information
        </button>
      </section>

      {/* Lab Results */}
      <section className="bg-white rounded-2xl p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Lab Results
        </h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {patient.lab_results?.length ? (
            patient.lab_results.map((result, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
              >
                <span className="text-sm text-slate-700">{result}</span>
                <button>⬇️</button>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              Lab nəticəsi yoxdur
            </p>
          )}
        </div>
      </section>

      {/* Show All Information Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Bağla"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <img
                className="w-24 h-24 rounded-full object-cover border-4 border-teal-50"
                src={patient.profile_picture}
                alt={patient.name}
              />
              <h3 className="text-xl font-bold text-slate-800 mt-4">
                {patient.name}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-400">Date Of Birth</p>
                <p className="font-bold">{patient.date_of_birth || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Gender</p>
                <p className="font-bold">{patient.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Contact Info.</p>
                <p className="font-bold">{patient.phone_number || "N/A"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Emergency Contacts</p>
                <p className="font-bold">{patient.emergency_contact || "Məlumat yoxdur"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Insurance Provider</p>
                <p className="font-bold">{patient.insurance_type || "Məlumat yoxdur"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Age</p>
                <p className="font-bold">{patient.age || "N/A"}</p>
              </div>
            </div>

            {patient.lab_results?.length > 0 && (
              <div className="mt-6">
                <p className="text-xs text-gray-400 mb-2">Lab Results</p>
                <div className="space-y-2">
                  {patient.lab_results.map((result, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDetails;