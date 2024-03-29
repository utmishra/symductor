export type RescueTimeDailySummaryFeed = {
  id: string;
  date: string;
  productivity_pulse: number;
  very_productive_percentage: number;
  productive_percentage: number;
  neutral_percentage: number;
  distracting_percentage: number;
  very_distracting_percentage: number;
  all_productive_percentage: number;
  all_distracting_percentage: number;
  uncategorized_percentage: number;
  business_percentage: number;
  communication_and_scheduling_percentage: number;
  social_networking_percentage: number;
  design_and_composition_percentage: number;
  entertainment_percentage: number;
  news_percentage: number;
  software_development_percentage: number;
  reference_and_learning_percentage: number;
  shopping_percentage: number;
  utilities_percentage: number;
  total_hours: number;
  very_productive_hours: number;
  productive_hours: number;
  neutral_hours: number;
  distracting_hours: number;
  very_distracting_hours: number;
  all_productive_hours: number;
  all_distracting_hours: number;
  uncategorized_hours: number;
  business_hours: number;
  communication_and_scheduling_hours: number;
  social_networking_hours: number;
  design_and_composition_hours: number;
  entertainment_hours: number;
  news_hours: number;
  software_development_hours: number;
  reference_and_learning_hours: number;
  shopping_hours: number;
  utilities_hours: number;
  total_duration_formatted: string;
  very_productive_duration_formatted: string;
  productive_duration_formatted: string;
  neutral_duration_formatted: string;
  distracting_duration_formatted: string;
  very_distracting_duration_formatted: string;
  all_productive_duration_formatted: string;
  all_distracting_duration_formatted: string;
  uncategorized_duration_formatted: string;
  business_duration_formatted: string;
  communication_and_scheduling_duration_formatted: string;
  social_networking_duration_formatted: string;
  design_and_composition_duration_formatted: string;
  entertainment_duration_formatted: string;
  news_duration_formatted: string;
  software_development_duration_formatted: string;
  reference_and_learning_duration_formatted: string;
  shopping_duration_formatted: string;
  utilities_duration_formatted: string;
};

export type RescueTimeApiResponse = {
  status: number;
  data?: RescueTimeDailySummaryFeed[];
  error?: string;
};

export type RescueTimeActivity = {
  notes: string;
  row_headers: string[];
  rows: (string | number)[][];
};

export type RescueTimeActivityResponse = {
  data: RescueTimeActivity | null;
  isLoading: boolean;
  isError: string;
};
