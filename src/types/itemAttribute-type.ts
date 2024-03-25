export type TItemAttribute = {
  id: number;
  name: string;
  displayName: string;
  description?: string;
  dataType: number;
  inputType: number;
  isRequired: boolean;
  unitList?: string[];
  valueList?: string[];
};

export type TItemAttributeFilter = {
  categoryId?: number;
  tenantId?: number;
  search?: string;
};
