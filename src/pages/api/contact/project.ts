import type { APIRoute } from 'astro';
import { validateOrigin, corsHeaders } from '../../../utils/security';
import type { ProjectForm } from '../../../utils/email';
import {
  PROJECT_REQUIRED_FIELDS,
  resend,
  createProjectEmailHTML,
  validateFormData,
} from '../../../utils/email';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request),
    });
  }

  if (!validateOrigin(request)) {
    return new Response(JSON.stringify({ message: 'Unauthorized origin' }), { status: 403 });
  }

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const missingFields = await validateFormData(data, PROJECT_REQUIRED_FIELDS);

    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          message: `Missing required fields: ${missingFields.join(', ')}`,
        }),
        { status: 400 },
      );
    }

    const { error } = await resend.emails.send({
      from: 'HallinMedia <form@re.hallin.media>',
      to: 'william@hallin.media',
      replyTo: data.email as string,
      subject: `New Project Inquiry - ${data.name}`,
      html: createProjectEmailHTML(data as unknown as ProjectForm),
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send email');
    }

    return new Response(JSON.stringify({ message: 'Success! Your message has been sent.' }), {
      status: 200,
      headers: corsHeaders(request),
    });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ message: 'Server error. Please try again later.' }), {
      status: 500,
      headers: corsHeaders(request),
    });
  }
};
