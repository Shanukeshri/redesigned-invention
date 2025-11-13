// Extensive demo data to populate UI when backend is unreachable.
// Keep shapes identical to backend responses used by UI.

export const demoUsers = [
  { _id: 'demo_admin', name: 'Admin Demo', email: 'admin@demo.local', role: 'admin' },
  { _id: 'demo_govt', name: 'Govt Demo', email: 'govt@demo.local', role: 'govt' },
  { _id: 'demo_sme', name: 'SME Demo', email: 'sme@demo.local', role: 'sme' },
  { _id: 'demo_investor', name: 'Investor Demo', email: 'inv@demo.local', role: 'investor' },
  { _id: 'demo_citizen', name: 'Citizen Demo', email: 'citizen@demo.local', role: 'citizen' }
];

export const demoProjects = [
  {
    _id: 'demo_proj_1',
    name: 'Demo Rooftop Solar — Block A',
    type: 'solar',
    ownerId: 'demo_govt',
    capacityMW: 0.015,
    status: 'active',
    location: { lat: 23.0225, lng: 72.5714, state: 'Gujarat', district: 'Ahmedabad' },
    funding: { required: 75000, raised: 50000 },
    startDate: '2024-01-05',
    endDate: null,
    documents: [],
    iotDeviceIds: ['demo_device_1'],
    verifiedBy: 'demo_govt'
  },
  {
    _id: 'demo_proj_2',
    name: 'Wind Farm — Coastal Cluster',
    type: 'wind',
    ownerId: 'demo_sme',
    capacityMW: 12.5,
    status: 'active',
    location: { lat: 21.1458, lng: 79.0882, state: 'Maharashtra', district: 'Nagpur' },
    funding: { required: 12000000, raised: 9500000 },
    startDate: '2022-06-10',
    endDate: null,
    documents: [],
    iotDeviceIds: ['dev_wind_01'],
    verifiedBy: 'demo_govt'
  },
  {
    _id: 'demo_proj_3',
    name: 'Microgrid — Village Cluster',
    type: 'microgrid',
    ownerId: 'demo_govt',
    capacityMW: 0.5,
    status: 'draft',
    location: { lat: 19.0760, lng: 72.8777, state: 'Maharashtra', district: 'Mumbai' },
    funding: { required: 500000, raised: 120000 },
    startDate: '2025-02-01',
    endDate: null,
    documents: [],
    iotDeviceIds: ['micro_dev_1'],
    verifiedBy: null
  }
];

export const demoCarbonReports = [
  { _id: 'cr_1', entityId: 'demo_sme', projectId: 'demo_proj_1', periodStart: '2024-01-01', periodEnd: '2024-01-31', emissionsCO2eKg: 120, breakdown: { electricity: 120 } },
  { _id: 'cr_2', entityId: 'demo_proj_2', projectId: 'demo_proj_2', periodStart: '2024-02-01', periodEnd: '2024-02-28', emissionsCO2eKg: 25000, breakdown: { grid: 24000, transport: 1000 } }
];

export const demoInvestments = [
  { _id: 'inv_1', investorId: 'demo_investor', projectId: 'demo_proj_2', amount: 500000, status: 'confirmed', createdAt: '2024-03-12' },
  { _id: 'inv_2', investorId: 'demo_investor', projectId: 'demo_proj_1', amount: 75000, status: 'confirmed', createdAt: '2024-06-01' }
];

export const demoRenewablePotential = [
  { state: 'Gujarat', district: 'Ahmedabad', estimatedMW: 1500, source: 'solar-atlas' },
  { state: 'Tamil Nadu', district: 'Chennai', estimatedMW: 800, source: 'wind-survey' },
  { state: 'Rajasthan', district: 'Jaisalmer', estimatedMW: 2400, source: 'solar-atlas' }
];

export const demoAIResponse = {
  requestId: 'uuid-demo-1',
  cached: false,
  state: 'Gujarat',
  predictedGenerationMW: [1550,1600,1650,1730,1780,1850,1900],
  confidenceInterval: [[1500,1570],[1550,1650],[1600,1670],[1680,1760],[1720,1840],[1800,1900],[1850,1950]],
  growthRatePercent: 6.5,
  topInfluencers: ['SolarRadiation','InstalledCapacity'],
  targetAchievementForecast: { targetYear: 2030, predictedAchievementPercent: 92.4 }
};

export const demoInitiatives = [
  {
    id: 1,
    title: "National Solar Mission (NSM)",
    text: "The NSM is a major initiative to promote ecologically sustainable growth while addressing India's energy security challenge.",
    image: "https://placehold.co/600x400/34D399/ffffff?text=Solar+Panel",
    icon: 'Sun',
    alignment: 'left'
  },
  {
    id: 2,
    title: "Wind Energy Development",
    text: "Initiatives focus on offshore wind farms and hybrid projects.",
    image: "https://placehold.co/600x400/818CF8/ffffff?text=Wind+Turbines",
    icon: 'Wind',
    alignment: 'right'
  },
  {
    id: 3,
    title: "Green Energy Corridors",
    text: "Transmission lines to evacuate renewable power across the country, ensuring grid stability.",
    image: "https://placehold.co/600x400/A78BFA/ffffff?text=Green+Grid",
    icon: 'Zap',
    alignment: 'left'
  }
];

export const testimonialData = [
  { name: "Suresh K.", role: "CEO, SunPower Solutions", quote: "GreenHorizon's project management streamlined our solar deployment across three states. Unmatched dedication!" },
  { name: "Priya V.", role: "Community Activist", quote: "Getting involved was easy! Their local initiatives genuinely transform rural energy access." },
  { name: "Dr. L. Singh", role: "Energy Economist", quote: "The data and transparency they provide on CO2 savings are industry-leading. A model for sustainability." },
  { name: "Kiran R.", role: "Private Investor", quote: "Invested last year and the returns, both financial and environmental, have been excellent. Highly recommend." },
  { name: "Anita M.", role: "District Officer", quote: "Our grant application processing time dropped by 60% after onboarding." },
  { name: "Rahul P.", role: "Installer", quote: "Simplified paperwork and faster verification. Great platform." }
];
