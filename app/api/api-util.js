import dotenv from 'dotenv';

dotenv.config();

export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 
                            "http://127.0.0.1:8080";
