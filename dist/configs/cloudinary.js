import { v2 as cloudinary } from "cloudinary";
import * as streamifier from "streamifier";
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
export const cloudUpload = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
};
