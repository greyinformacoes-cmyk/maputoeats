-- handle_new_user is a trigger function, never called directly
revoke all on function public.handle_new_user() from public, anon, authenticated;

-- has_role is only used by policies for signed-in users; anon never needs it
revoke all on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;