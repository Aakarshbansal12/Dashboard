const { v4: uuidv4 } = require("uuid");
const path = require("path");

module.exports = {
    fileUpload: async (file, folder = "images") => {
        if (!file) return ""; // Return empty if no file provided

        const extension = path.extname(file.name);
        const filename = uuidv4() + extension;
        const uploadPath = path.join(process.cwd(), `public/${folder}/${filename}`);

        // Use a Promise to handle mv asynchronously
        return new Promise((resolve, reject) => {
            file.mv(uploadPath, (err) => {
                if (err) return reject(err);
                resolve(`/${folder}/${filename}`); // Return relative path
            });
        });
    }
};
