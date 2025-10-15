const cloudinary = require("cloudinary").v2;
cloudinary.config();
console.log(process.env.CLOUDINARY_URL);

const cloudinaryUploader = async (coverPhoto, designPhotos) => {
  try {
    const b64 = Buffer.from(coverPhoto.buffer).toString("base64");
    let dataURI = `data:${coverPhoto.mimetype};base64,${b64}`;
    const imageUrl = cloudinary.uploader.upload(dataURI, {
      folder: "stitch_space/images",
      resource_type: "auto",
    });
    const imageCarousel = designPhotos.map((photo) => {
      const b64 = Buffer.from(photo.buffer).toString("base64");
      let dataURI = `data:${photo.mimetype};base64,${b64}`;
      return cloudinary.uploader.upload(dataURI, {
        folder: "stitch_space/images",
        resource_type: "auto",
      });
    });

    const result = await Promise.all([imageUrl, ...imageCarousel]);
    const secure_urls = result.map((res) => res.secure_url);
    return secure_urls;
  } catch (error) {
    console.log(error);
  }
};

module.exports = cloudinaryUploader;
