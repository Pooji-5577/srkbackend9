import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role for backend operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Gallery storage bucket name
export const STORAGE_BUCKET = 'srk';

// Helper function to get public URL for stored files
export const getPublicUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};

// Helper function to upload file to storage
export const uploadFile = async (filePath: string, file: File | Buffer, contentType?: string) => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      contentType,
      upsert: true
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return data;
};

// Helper function to list files in storage
export const listFiles = async (path: string = '') => {
  const { data, error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .list(path);

  if (error) {
    throw new Error(`List files failed: ${error.message}`);
  }

  return data;
};