import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    baseUrl: process.env.BASE_URL || '',
};

