import { S3Client } from ("@aws-sdk/client-s3");


console.log('process.env.AWS_REGION', process.env.AWS_REGION)


export const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_USER_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

