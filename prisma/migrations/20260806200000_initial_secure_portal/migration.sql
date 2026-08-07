CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'CLIENT');
CREATE TYPE "public"."DocumentType" AS ENUM ('BOLETO', 'NOTA_FISCAL', 'CONTRATO', 'OUTRO');
CREATE TYPE "public"."ContractStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING');

CREATE TABLE "public"."clients" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "cpf_cnpj" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."app_users" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "supabase_user_id" UUID NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" "public"."UserRole" NOT NULL DEFAULT 'CLIENT',
  "active" BOOLEAN NOT NULL DEFAULT true,
  "client_id" UUID,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "app_users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."companies" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "client_id" UUID NOT NULL,
  "legal_name" TEXT NOT NULL,
  "trade_name" TEXT,
  "cnpj" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "city" TEXT,
  "state" CHAR(2),
  "zip_code" TEXT,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."documents" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "client_id" UUID NOT NULL,
  "company_id" UUID,
  "uploaded_by_id" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "type" "public"."DocumentType" NOT NULL,
  "file_name" TEXT NOT NULL,
  "file_path" TEXT NOT NULL,
  "mime_type" TEXT NOT NULL,
  "file_size" INTEGER NOT NULL,
  "reference_month" DATE,
  "due_date" DATE,
  "uploaded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."contracts" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "client_id" UUID NOT NULL,
  "company_id" UUID,
  "document_id" UUID,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "status" "public"."ContractStatus" NOT NULL DEFAULT 'PENDING',
  "start_date" DATE NOT NULL,
  "end_date" DATE,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."audit_logs" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "user_id" UUID,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entity_id" UUID,
  "metadata" JSONB,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "clients_cpf_cnpj_key" ON "public"."clients"("cpf_cnpj");
CREATE INDEX "clients_active_name_idx" ON "public"."clients"("active", "name");
CREATE INDEX "clients_email_idx" ON "public"."clients"("email");
CREATE UNIQUE INDEX "app_users_supabase_user_id_key" ON "public"."app_users"("supabase_user_id");
CREATE UNIQUE INDEX "app_users_email_key" ON "public"."app_users"("email");
CREATE INDEX "app_users_client_id_idx" ON "public"."app_users"("client_id");
CREATE INDEX "app_users_role_active_idx" ON "public"."app_users"("role", "active");
CREATE UNIQUE INDEX "companies_cnpj_key" ON "public"."companies"("cnpj");
CREATE INDEX "companies_legal_name_idx" ON "public"."companies"("legal_name");
CREATE INDEX "companies_client_id_active_idx" ON "public"."companies"("client_id", "active");
CREATE UNIQUE INDEX "documents_file_path_key" ON "public"."documents"("file_path");
CREATE INDEX "documents_client_id_type_created_at_idx" ON "public"."documents"("client_id", "type", "created_at");
CREATE INDEX "documents_company_id_type_idx" ON "public"."documents"("company_id", "type");
CREATE INDEX "documents_due_date_idx" ON "public"."documents"("due_date");
CREATE INDEX "contracts_company_id_idx" ON "public"."contracts"("company_id");
CREATE UNIQUE INDEX "contracts_document_id_key" ON "public"."contracts"("document_id");
CREATE INDEX "contracts_client_id_status_idx" ON "public"."contracts"("client_id", "status");
CREATE INDEX "contracts_end_date_status_idx" ON "public"."contracts"("end_date", "status");
CREATE INDEX "audit_logs_entity_entity_id_idx" ON "public"."audit_logs"("entity", "entity_id");
CREATE INDEX "audit_logs_action_created_at_idx" ON "public"."audit_logs"("action", "created_at");
CREATE INDEX "audit_logs_user_id_created_at_idx" ON "public"."audit_logs"("user_id", "created_at");

ALTER TABLE "public"."app_users" ADD CONSTRAINT "app_users_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."companies" ADD CONSTRAINT "companies_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."documents" ADD CONSTRAINT "documents_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "public"."app_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."contracts" ADD CONSTRAINT "contracts_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."contracts" ADD CONSTRAINT "contracts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."contracts" ADD CONSTRAINT "contracts_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.app_users, public.clients, public.companies, public.documents, public.contracts, public.audit_logs FROM anon, authenticated;
GRANT SELECT ON public.app_users, public.clients, public.companies, public.documents, public.contracts, public.audit_logs TO authenticated;

CREATE POLICY "users_read_own_or_admin" ON public.app_users FOR SELECT TO authenticated USING (
  supabase_user_id = auth.uid() OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
);
CREATE POLICY "clients_read_own_or_admin" ON public.clients FOR SELECT TO authenticated USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (SELECT 1 FROM public.app_users u WHERE u.supabase_user_id = auth.uid() AND u.active AND u.client_id = clients.id)
);
CREATE POLICY "companies_read_own_or_admin" ON public.companies FOR SELECT TO authenticated USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (SELECT 1 FROM public.app_users u WHERE u.supabase_user_id = auth.uid() AND u.active AND u.client_id = companies.client_id)
);
CREATE POLICY "documents_read_own_or_admin" ON public.documents FOR SELECT TO authenticated USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (SELECT 1 FROM public.app_users u WHERE u.supabase_user_id = auth.uid() AND u.active AND u.client_id = documents.client_id)
);
CREATE POLICY "contracts_read_own_or_admin" ON public.contracts FOR SELECT TO authenticated USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
  OR EXISTS (SELECT 1 FROM public.app_users u WHERE u.supabase_user_id = auth.uid() AND u.active AND u.client_id = contracts.client_id)
);
CREATE POLICY "audit_logs_admin_only" ON public.audit_logs FOR SELECT TO authenticated USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('client-documents', 'client-documents', false, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET public = false, file_size_limit = EXCLUDED.file_size_limit, allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "storage_documents_read_own_or_admin" ON storage.objects FOR SELECT TO authenticated USING (
  bucket_id = 'client-documents'
  AND ((auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
    OR EXISTS (SELECT 1 FROM public.app_users u WHERE u.supabase_user_id = auth.uid() AND u.active AND u.client_id::text = (storage.foldername(name))[2]))
);
CREATE POLICY "storage_documents_admin_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'client-documents' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
);
CREATE POLICY "storage_documents_admin_update" ON storage.objects FOR UPDATE TO authenticated USING (
  bucket_id = 'client-documents' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
) WITH CHECK (
  bucket_id = 'client-documents' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
);
CREATE POLICY "storage_documents_admin_delete" ON storage.objects FOR DELETE TO authenticated USING (
  bucket_id = 'client-documents' AND (auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN'
);
