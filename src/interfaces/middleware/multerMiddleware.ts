
import multer from "multer";

const storage = multer.diskStorage({
  destination: "../Server/public/uplodedImages",
  filename: (req, file, callback) => {
    const filename = file.originalname;
    callback(null, filename);
  },
});

const profile = multer({
  storage: storage,
  limits: { files: 12 },
});

export const upload = profile.array("images", 12);