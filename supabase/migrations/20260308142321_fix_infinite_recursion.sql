-- Fix infinite recursion in RLS policies by using SECURITY DEFINER functions

CREATE OR REPLACE FUNCTION public.get_is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE auth_user_id = auth.uid() AND is_active = true AND role IN ('super_admin', 'admin')
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_is_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE auth_user_id = auth.uid() AND is_active = true AND role = 'super_admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_is_any_active_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins
    WHERE auth_user_id = auth.uid() AND is_active = true
  );
END;
$$;

-- Drop existing policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can manage directors" ON directors;
DROP POLICY IF EXISTS "Admins can manage consultations" ON consultations;
DROP POLICY IF EXISTS "Admins can manage reviews" ON reviews;
DROP POLICY IF EXISTS "Super admins can manage admins" ON admins;

-- Recreate policies using the new functions
CREATE POLICY "Admins can manage directors"
  ON directors FOR ALL
  USING (public.get_is_admin());

CREATE POLICY "Admins can manage consultations"
  ON consultations FOR ALL
  USING (public.get_is_any_active_admin());

CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL
  USING (public.get_is_any_active_admin());

CREATE POLICY "Super admins can manage admins"
  ON admins FOR ALL
  USING (public.get_is_super_admin());

-- Also patch storage object policies to use these functions
DROP POLICY IF EXISTS "Admins upload director photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete director photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins delete review images" ON storage.objects;

CREATE POLICY "Admins upload director photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'director-photos' AND public.get_is_any_active_admin());

CREATE POLICY "Admins delete director photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'director-photos' AND public.get_is_any_active_admin());

CREATE POLICY "Admins delete review images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'review-images' AND public.get_is_any_active_admin());

-- Provide the missing SELECT policies if they truly don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'directors' AND policyname = 'Public can view active directors') THEN
    CREATE POLICY "Public can view active directors" ON directors FOR SELECT USING (is_active = true);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'reviews' AND policyname = 'Public can view approved reviews') THEN
    CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT USING (status = 'approved');
  END IF;
END $$;
