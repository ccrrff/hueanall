-- ============================================
-- 휴앤올 초기 스키마
-- ============================================

-- 1. admins (관리자)
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'viewer')) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. directors (장례지도사)
CREATE TABLE IF NOT EXISTS directors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  title TEXT NOT NULL DEFAULT '장례지도사',
  position TEXT,
  years_experience INTEGER NOT NULL,
  introduction TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. consultations (상담 신청)
CREATE TABLE IF NOT EXISTS consultations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  consultation_type TEXT NOT NULL CHECK (consultation_type IN ('general', 'director_specific', 'quick', 'kakao')),
  director_id UUID REFERENCES directors(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT NOT NULL CHECK (status IN ('pending', 'contacted', 'completed', 'cancelled')) DEFAULT 'pending',
  admin_note TEXT,
  privacy_agreed BOOLEAN NOT NULL,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. reviews (고객 후기)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  director_id UUID REFERENCES directors(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  image_urls JSONB DEFAULT '[]',
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  admin_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- updated_at 자동 업데이트 트리거
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_directors_updated_at
  BEFORE UPDATE ON directors
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ============================================
-- Row Level Security
-- ============================================
ALTER TABLE directors ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- directors RLS
CREATE POLICY "Public can view active directors"
  ON directors FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage directors"
  ON directors FOR ALL
  USING (
    auth.uid() IN (
      SELECT auth_user_id FROM admins
      WHERE is_active = true AND role IN ('super_admin', 'admin')
    )
  );

-- consultations RLS
CREATE POLICY "Anyone can submit consultation"
  ON consultations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage consultations"
  ON consultations FOR ALL
  USING (
    auth.uid() IN (
      SELECT auth_user_id FROM admins WHERE is_active = true
    )
  );

-- reviews RLS
CREATE POLICY "Public can view approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can submit review"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage reviews"
  ON reviews FOR ALL
  USING (
    auth.uid() IN (
      SELECT auth_user_id FROM admins WHERE is_active = true
    )
  );

-- admins RLS
CREATE POLICY "Super admins can manage admins"
  ON admins FOR ALL
  USING (
    auth.uid() IN (
      SELECT auth_user_id FROM admins
      WHERE role = 'super_admin' AND is_active = true
    )
  );

-- ============================================
-- Storage Buckets
-- ============================================
INSERT INTO storage.buckets (id, name, public)
  VALUES ('director-photos', 'director-photos', true)
  ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
  VALUES ('review-images', 'review-images', true)
  ON CONFLICT (id) DO NOTHING;

-- director-photos storage policies
CREATE POLICY "Public read director photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'director-photos');

CREATE POLICY "Admins upload director photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'director-photos' AND
    auth.uid() IN (SELECT auth_user_id FROM admins WHERE is_active = true)
  );

CREATE POLICY "Admins delete director photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'director-photos' AND
    auth.uid() IN (SELECT auth_user_id FROM admins WHERE is_active = true)
  );

-- review-images storage policies
CREATE POLICY "Public read review images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-images');

CREATE POLICY "Anyone upload review images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'review-images');

CREATE POLICY "Admins delete review images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'review-images' AND
    auth.uid() IN (SELECT auth_user_id FROM admins WHERE is_active = true)
  );
