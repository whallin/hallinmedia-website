import { Resend } from 'resend';

// Common interfaces for contact forms
export interface BaseContactForm {
  name: string;
  email: string;
}

export interface ProjectForm extends BaseContactForm {
  projectType: string;
  companySize: string;
  budget: string;
  deadline: string;
  projectDescription: string;
}

export interface LicensingForm extends BaseContactForm {
  licenseType: string;
  message: string;
}

// Required fields for validation
export const PROJECT_REQUIRED_FIELDS: (keyof ProjectForm)[] = [
  'name',
  'email',
  'projectType',
  'companySize',
  'budget',
  'deadline',
  'projectDescription',
];

export const LICENSING_REQUIRED_FIELDS: (keyof LicensingForm)[] = [
  'name',
  'email',
  'licenseType',
  'message',
];

// Initialize Resend client
export const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Email template functions
export function createProjectEmailHTML(data: ProjectForm): string {
  const fields = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Project Type', value: data.projectType },
    { label: 'Company Size', value: data.companySize },
    { label: 'Budget', value: data.budget },
    { label: 'Deadline', value: data.deadline },
  ];

  return `
    <h2>New Project Inquiry</h2>
    ${fields
      .filter(({ value }) => value)
      .map(({ label, value }) => `<p><strong>${label}:</strong> ${value}</p>`)
      .join('')}
    <h3>Message:</h3>
    <p>${data.projectDescription}</p>
  `;
}

export function createLicensingEmailHTML(data: LicensingForm): string {
  const fields = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'License Type', value: data.licenseType },
  ];

  return `
    <h2>New Licensing Request</h2>
    ${fields.map(({ label, value }) => `<p><strong>${label}:</strong> ${value}</p>`).join('')}
    <h3>Message:</h3>
    <p>${data.message}</p>
  `;
}

// Common form handling logic
export async function validateFormData(
  data: Record<string, FormDataEntryValue>,
  requiredFields: string[],
): Promise<string[]> {
  return requiredFields.filter(field => !data[field]);
}
