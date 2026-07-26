import React, { useState, useMemo, useRef, useEffect } from 'react';
import { doctorImg, TestLogo } from './assets';
import { Settings, Point } from "./icons/ikons";

function Navbar({ patients = [], onSelectPatient }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return patients
      .filter((p) => p.name?.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, patients]);

  // Kənara klikləndikdə dropdown-u bağla
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Axtarış dəyişəndə highlight-ı sıfırla
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  const handleSelect = (patient) => {
    onSelectPatient?.(patient);
    setQuery("");
    setOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClear = () => {
    setQuery("");
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        handleSelect(results[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <header className="bg-white px-4 md:px-6 py-3 md:py-4 shadow-xs border-b border-gray-100 relative">
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-xl shrink-0">
          <img src={TestLogo} alt="Logo" className="w-[110px] md:w-[140px] h-auto object-contain" />
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative" ref={wrapperRef}>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search patients..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full pl-9 pr-9 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition"
            />

            {query && (
              <button
                onClick={handleClear}
                aria-label="Axtarışı təmizlə"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Dropdown nəticələri */}
          {open && query.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg z-30 max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                results.map((patient, index) => (
                  <button
                    key={patient.name}
                    onClick={() => handleSelect(patient)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                      highlightedIndex === index ? "bg-gray-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <img
                      src={patient.profile_picture}
                      alt={patient.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {patient.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {patient.gender}, {patient.age}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-400">
                  Heç bir nəticə tapılmadı
                </p>
              )}
            </div>
          )}
        </div>

        {/* Doctor Profile */}
        <div className="flex items-center border-l pl-3 md:pl-4 border-gray-200 shrink-0">
          <img className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover" src={doctorImg} alt="Doctor" />
          <div className="hidden md:block text-left ml-2">
            <p className="text-xs font-bold text-slate-800">Dr. Jose Simmons</p>
            <p className="text-[11px] text-gray-400">General Practitioner</p>
          </div>
          <img src={Settings} alt="Settings" className="w-5 h-6 ml-3 cursor-pointer mr-1 md:mr-4 hidden sm:block" />
          <img src={Point} alt="More" className="h-7 cursor-pointer object-contain hidden md:block" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;