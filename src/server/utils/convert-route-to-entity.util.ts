const mapping: Record<string, string> = {
  'contact-informations': 'contact_information',
  organizations: 'organization',
  users: 'user',
  'water-supply-statuses': 'water_supply_status',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
