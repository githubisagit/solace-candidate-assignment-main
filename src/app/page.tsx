"use client";

import { useEffect, useState, ChangeEvent, useCallback } from "react";

interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch advocates");
        }
        return response.json();
      })
      .then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching advocates:", error);
        setLoading(false);
      });
  }, []);

  // Debounced search function
  const performSearch = useCallback((searchValue: string, advocateList: Advocate[]) => {
    if (!searchValue.trim()) {
      setFilteredAdvocates(advocateList);
      return;
    }

    console.log("filtering advocates...");
    const filtered = advocateList.filter((advocate) => {
      const searchTermLower = searchValue.toLowerCase();
      return (
        advocate.firstName.toLowerCase().includes(searchTermLower) ||
        advocate.lastName.toLowerCase().includes(searchTermLower) ||
        advocate.city.toLowerCase().includes(searchTermLower) ||
        advocate.degree.toLowerCase().includes(searchTermLower) ||
        advocate.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTermLower)
        ) ||
        advocate.yearsOfExperience.toString().includes(searchTermLower)
      );
    });

    setFilteredAdvocates(filtered);
  }, []);

  // Debounce search with useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchTerm, advocates);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, advocates, performSearch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Search is now handled by debounced useEffect
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    // Filtered advocates will be reset by the debounced useEffect when searchTerm becomes empty
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading advocates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solace Advocates</h1>
          <p className="text-lg text-gray-600">Find the right mental health advocate for your needs</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Advocates
              </label>
              <input 
                id="search"
                type="text"
                placeholder="Search by name, city, degree, specialties, or experience..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={searchTerm}
                onChange={onChange} 
              />
            </div>
            <button 
              onClick={onClick}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Reset Search
            </button>
          </div>
          {searchTerm && (
            <p className="mt-3 text-sm text-gray-600">
              Showing results for: <span className="font-medium text-gray-900">&ldquo;{searchTerm}&rdquo;</span>
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Found {filteredAdvocates.length} advocate{filteredAdvocates.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Results */}
        {filteredAdvocates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No advocates found</h3>
            <p className="text-gray-600">Try adjusting your search terms or reset to see all advocates.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credentials
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Specialties
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAdvocates.map((advocate, index) => (
                    <tr key={`${advocate.firstName}-${advocate.lastName}-${index}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {advocate.firstName} {advocate.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{advocate.city}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {advocate.degree}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          {advocate.specialties.slice(0, 3).map((specialty, i) => (
                            <div key={`${specialty}-${i}`} className="text-xs text-gray-600 bg-gray-100 inline-block px-2 py-1 rounded mr-1 mb-1">
                              {specialty}
                            </div>
                          ))}
                          {advocate.specialties.length > 3 && (
                            <div className="text-xs text-gray-500 font-medium">
                              +{advocate.specialties.length - 3} more
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{advocate.yearsOfExperience} years</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {advocate.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
