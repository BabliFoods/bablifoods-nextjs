import { supabase } from './supabaseClient'

const ADMIN_EMAIL = 'bablikajadoo@gmail.com'

export const checkAdmin = async (router, allowedEmail = ADMIN_EMAIL) => {
  const { data, error } = await supabase.auth.getSession()

  if (error || !data?.session || data.session.user.email !== allowedEmail) {
    router.replace('/login')
    return null
  }

  return data.session
}
