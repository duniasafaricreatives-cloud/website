import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { TravelPackage, Tier } from '../interfaces/AdminInterfaces';
import { authFetchs, API_BASE } from '../config';

interface PackagesProps {
  packages: TravelPackage[];
  showPackageForm: boolean;
  setShowPackageForm: (value: boolean) => void;
  editingItem: any;
  setEditingItem: (item: any) => void;
  packageForm: {
    name: string;
    description: string;
    price: string;
    specials: string[];
    color: string;
    duration_days: string;
  };
  setPackageForm: (form: PackagesProps['packageForm']) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  fetchPackages: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
}

interface TierFormData {
  name: string;
  price: string;
  discount_price: string;
  max_participants: string;
  visa_application: boolean;
  return_flights: boolean;
  fez_casablanca_train: boolean;
  hotel_shuttle: boolean;
  bed_and_breakfast: boolean;
  city_taxes_included: boolean;
  welcome_dinner: boolean;
  official_match_tickets: boolean;
  desert_camping: boolean;
  meknes_volubilis_tour: boolean;
  hammam_retreat: boolean;
  dunia_safari_memento: boolean;
}

const Packages: React.FC<PackagesProps> = ({
  packages,
  showPackageForm,
  setShowPackageForm,
  editingItem,
  setEditingItem,
  packageForm,
  setPackageForm,
  loading,
  setLoading,
  fetchPackages,
  fetchStatistics,
}) => {
  const [tiers, setTiers] = useState<TierFormData[]>([]);
  const [newSpecial, setNewSpecial] = useState('');
  const [expandedPackages, setExpandedPackages] = useState<Set<number>>(new Set());

  const emptyTier: TierFormData = {
    name: '',
    price: '',
    discount_price: '',
    max_participants: '',
    visa_application: false,
    return_flights: false,
    fez_casablanca_train: false,
    hotel_shuttle: false,
    bed_and_breakfast: false,
    city_taxes_included: false,
    welcome_dinner: false,
    official_match_tickets: false,
    desert_camping: false,
    meknes_volubilis_tour: false,
    hammam_retreat: false,
    dunia_safari_memento: false,
  };

  const addTier = () => {
    setTiers([...tiers, { ...emptyTier }]);
  };

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const updateTier = (index: number, field: keyof TierFormData, value: any) => {
    const updatedTiers = [...tiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setTiers(updatedTiers);
  };

  const addSpecial = () => {
    if (newSpecial.trim()) {
      setPackageForm({ ...packageForm, specials: [...packageForm.specials, newSpecial.trim()] });
      setNewSpecial('');
    }
  };

  const removeSpecial = (index: number) => {
    setPackageForm({
      ...packageForm,
      specials: packageForm.specials.filter((_, i) => i !== index)
    });
  };

  const togglePackageExpansion = (packageId: number) => {
    const newExpanded = new Set(expandedPackages);
    if (newExpanded.has(packageId)) {
      newExpanded.delete(packageId);
    } else {
      newExpanded.add(packageId);
    }
    setExpandedPackages(newExpanded);
  };

  const handleCreatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tiers.length === 0) {
      alert('Please add at least one tier');
      return;
    }

    try {
      setLoading(true);
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem 
        ? `${API_BASE}/admin/packages/${editingItem.id}`
        : `${API_BASE}/admin/packages`;
      
      const tiersData = tiers.map(tier => ({
        name: tier.name,
        price: parseFloat(tier.price),
        discount_price: tier.discount_price ? parseFloat(tier.discount_price) : null,
        max_participants: parseInt(tier.max_participants),
        visa_application: tier.visa_application,
        return_flights: tier.return_flights,
        fez_casablanca_train: tier.fez_casablanca_train,
        hotel_shuttle: tier.hotel_shuttle,
        bed_and_breakfast: tier.bed_and_breakfast,
        city_taxes_included: tier.city_taxes_included,
        welcome_dinner: tier.welcome_dinner,
        official_match_tickets: tier.official_match_tickets,
        desert_camping: tier.desert_camping,
        meknes_volubilis_tour: tier.meknes_volubilis_tour,
        hammam_retreat: tier.hammam_retreat,
        dunia_safari_memento: tier.dunia_safari_memento,
      }));

      await authFetchs(url, {
        method,
        body: JSON.stringify({
          name: packageForm.name,
          description: packageForm.description,
          price: parseFloat(packageForm.price),
          specials: packageForm.specials,
          color: packageForm.color,
          duration_days: parseInt(packageForm.duration_days),
          tiers: tiersData
        })
      });
      
      alert(`Package ${editingItem ? 'updated' : 'created'} successfully!`);
      resetForm();
      await fetchPackages();
    } catch (err: any) {
      alert(err.message || 'Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowPackageForm(false);
    setEditingItem(null);
    setPackageForm({ 
      name: '', 
      description: '', 
      price: '', 
      specials: [], 
      color: '#000000', 
      duration_days: '' 
    });
    setTiers([]);
  };

  const handleDeletePackage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      await authFetchs(`${API_BASE}/admin/packages/${id}`, { method: 'DELETE' });
      alert('Package deleted successfully!');
      await fetchPackages();
      await fetchStatistics();
    } catch (err: any) {
      alert(err.message || 'Failed to delete package');
    }
  };

  const editPackage = (pkg: TravelPackage) => {
    setEditingItem(pkg);
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
      specials: pkg.specials || [],
      color: pkg.color || '#000000',
      duration_days: pkg.duration_days.toString()
    });
    
    const tiersData = pkg.tiers.map(tier => ({
      name: tier.name,
      price: tier.price.toString(),
      discount_price: tier.discount_price?.toString() || '',
      max_participants: tier.max_participants.toString(),
      visa_application: tier.visa_application,
      return_flights: tier.return_flights,
      fez_casablanca_train: tier.fez_casablanca_train,
      hotel_shuttle: tier.hotel_shuttle,
      bed_and_breakfast: tier.bed_and_breakfast,
      city_taxes_included: tier.city_taxes_included,
      welcome_dinner: tier.welcome_dinner,
      official_match_tickets: tier.official_match_tickets,
      desert_camping: tier.desert_camping,
      meknes_volubilis_tour: tier.meknes_volubilis_tour,
      hammam_retreat: tier.hammam_retreat,
      dunia_safari_memento: tier.dunia_safari_memento,
    }));
    setTiers(tiersData);
    setShowPackageForm(true);
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-md rounded-xl">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Travel Packages</h2>
          <p className="mt-1 text-sm text-gray-600">Manage travel packages with multiple tiers</p>
        </div>
        {!showPackageForm && (
          <button
            onClick={() => setShowPackageForm(true)}
            className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Package
          </button>
        )}
      </div>

      {showPackageForm && (
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {editingItem ? 'Edit Package' : 'Create New Package'}
          </h3>
          <form onSubmit={handleCreatePackage} className="space-y-6">
            {/* Basic Package Info */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  value={packageForm.name}
                  onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Base Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={packageForm.price}
                  onChange={(e) => setPackageForm({ ...packageForm, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Duration (Days)</label>
                <input
                  type="number"
                  value={packageForm.duration_days}
                  onChange={(e) => setPackageForm({ ...packageForm, duration_days: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Color</label>
                <input
                  type="color"
                  value={packageForm.color}
                  onChange={(e) => setPackageForm({ ...packageForm, color: e.target.value })}
                  className="w-full h-10 px-2 py-1 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={packageForm.description}
                  onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Specials */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Specials</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSpecial}
                  onChange={(e) => setNewSpecial(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecial())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a special feature"
                />
                <button
                  type="button"
                  onClick={addSpecial}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {packageForm.specials.map((special, idx) => (
                  <span key={idx} className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 rounded-full">
                    {special}
                    <button
                      type="button"
                      onClick={() => removeSpecial(idx)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tiers Section */}
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">Tiers</h4>
                <button
                  type="button"
                  onClick={addTier}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                >
                  <Plus className="w-4 h-4" />
                  Add Tier
                </button>
              </div>

              {tiers.map((tier, index) => (
                <div key={index} className="p-4 mb-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-gray-900">Tier {index + 1}</h5>
                    <button
                      type="button"
                      onClick={() => removeTier(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Tier Name</label>
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => updateTier(index, 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={tier.price}
                        onChange={(e) => updateTier(index, 'price', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Discount Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={tier.discount_price}
                        onChange={(e) => updateTier(index, 'discount_price', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Max Participants</label>
                      <input
                        type="number"
                        value={tier.max_participants}
                        onChange={(e) => updateTier(index, 'max_participants', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 md:grid-cols-4">
                    {[
                      { key: 'visa_application', label: 'Visa Application' },
                      { key: 'return_flights', label: 'Return Flights' },
                      { key: 'fez_casablanca_train', label: 'Fez-Casablanca Train' },
                      { key: 'hotel_shuttle', label: 'Hotel Shuttle' },
                      { key: 'bed_and_breakfast', label: 'Bed & Breakfast' },
                      { key: 'city_taxes_included', label: 'City Taxes' },
                      { key: 'welcome_dinner', label: 'Welcome Dinner' },
                      { key: 'official_match_tickets', label: 'Match Tickets' },
                      { key: 'desert_camping', label: 'Desert Camping' },
                      { key: 'meknes_volubilis_tour', label: 'Meknes Tour' },
                      { key: 'hammam_retreat', label: 'Hammam Retreat' },
                      { key: 'dunia_safari_memento', label: 'Safari Memento' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={tier[key as keyof TierFormData] as boolean}
                          onChange={(e) => updateTier(index, key as keyof TierFormData, e.target.checked)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : editingItem ? 'Update Package' : 'Create Package'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 font-medium text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Packages Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Package</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Tiers</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {packages.map((pkg) => (
              <React.Fragment key={pkg.id}>
                <tr className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                      <p className="text-xs text-gray-500">{pkg.description.substring(0, 50)}...</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{pkg.duration_days} days</td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    <button
                      onClick={() => togglePackageExpansion(pkg.id)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      {pkg.tiers.length} tier{pkg.tiers.length !== 1 ? 's' : ''}
                      {expandedPackages.has(pkg.id) ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => editPackage(pkg)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedPackages.has(pkg.id) && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-2">
                        {pkg.tiers.map((tier) => (
                          <div key={tier.id} className="p-3 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{tier.name}</p>
                                <p className="text-sm text-gray-600">
                                  ${tier.discount_price || tier.price} • Max {tier.max_participants} participants
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {tier.visa_application && <span className="px-2 py-1 text-xs bg-blue-100 rounded">Visa</span>}
                                {tier.return_flights && <span className="px-2 py-1 text-xs bg-blue-100 rounded">Flights</span>}
                                {tier.official_match_tickets && <span className="px-2 py-1 text-xs bg-blue-100 rounded">Tickets</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Packages;