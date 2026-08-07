-- Cache auth.jwt() once per statement instead of recalculating it for each row.
ALTER POLICY "users_read_own_or_admin" ON public.app_users USING (
  supabase_user_id = (SELECT auth.uid())
  OR ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
);

ALTER POLICY "clients_read_own_or_admin" ON public.clients USING (
  ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (
    SELECT 1 FROM public.app_users u
    WHERE u.supabase_user_id = (SELECT auth.uid()) AND u.active AND u.client_id = clients.id
  )
);

ALTER POLICY "companies_read_own_or_admin" ON public.companies USING (
  ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (
    SELECT 1 FROM public.app_users u
    WHERE u.supabase_user_id = (SELECT auth.uid()) AND u.active AND u.client_id = companies.client_id
  )
);

ALTER POLICY "documents_read_own_or_admin" ON public.documents USING (
  ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (
    SELECT 1 FROM public.app_users u
    WHERE u.supabase_user_id = (SELECT auth.uid()) AND u.active AND u.client_id = documents.client_id
  )
);

ALTER POLICY "contracts_read_own_or_admin" ON public.contracts USING (
  ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (
    SELECT 1 FROM public.app_users u
    WHERE u.supabase_user_id = (SELECT auth.uid()) AND u.active AND u.client_id = contracts.client_id
  )
);

ALTER POLICY "audit_logs_admin_only" ON public.audit_logs USING (
  ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
);

ALTER POLICY "storage_documents_read_own_or_admin" ON storage.objects USING (
  bucket_id = 'client-documents'
  AND (
    ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
    OR EXISTS (
      SELECT 1 FROM public.app_users u
      WHERE u.supabase_user_id = (SELECT auth.uid())
        AND u.active
        AND u.client_id::text = (storage.foldername(name))[2]
    )
  )
);

ALTER POLICY "storage_documents_admin_insert" ON storage.objects WITH CHECK (
  bucket_id = 'client-documents'
  AND ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
);

ALTER POLICY "storage_documents_admin_update" ON storage.objects
USING (
  bucket_id = 'client-documents'
  AND ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
)
WITH CHECK (
  bucket_id = 'client-documents'
  AND ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
);

ALTER POLICY "storage_documents_admin_delete" ON storage.objects USING (
  bucket_id = 'client-documents'
  AND ((SELECT auth.jwt()) -> 'app_metadata' ->> 'role') = 'ADMIN'
);
