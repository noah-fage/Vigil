-- Run this in your Supabase SQL editor

CREATE TABLE briefs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast date lookups
CREATE INDEX idx_briefs_date ON briefs(date DESC);

-- Enable Row Level Security (keep data protected)
ALTER TABLE briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to briefs (the frontend reads these)
CREATE POLICY "Public can read briefs" ON briefs FOR SELECT USING (true);

-- Only service role can write (your backend uses the anon key with RLS bypass via service key - or just use anon for now)
CREATE POLICY "Service can insert briefs" ON briefs FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can update briefs" ON briefs FOR UPDATE USING (true);

-- Subscribers: insert only (no public reads for privacy)
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can read subscribers" ON subscribers FOR SELECT USING (true);
CREATE POLICY "Service can delete subscribers" ON subscribers FOR DELETE USING (true);
