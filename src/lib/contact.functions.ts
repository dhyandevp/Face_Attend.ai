import { createServerFn } from '@tanstack/react-start';
import { contactSchema } from './product';
export const submitContact = createServerFn({ method: 'POST' })
 .inputValidator((input: unknown) => contactSchema.parse(input))
 .handler(async ({ data }) => {
  // Public insert-only lead capture. Validation and honeypot run before privileged access;
  // no client-supplied table, recipient, owner, or query is accepted.
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { error } = await supabaseAdmin.from('contact_submissions').insert({ name: data.name, email: data.email, message: data.message });
  if (error) throw new Error('Your message could not be saved. Please try again.');
  return { received: true };
 });
