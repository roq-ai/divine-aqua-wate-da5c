import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ContactInformationInterface {
  id?: string;
  phone_number: string;
  address: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ContactInformationGetQueryInterface extends GetQueryInterface {
  id?: string;
  phone_number?: string;
  address?: string;
  organization_id?: string;
}
