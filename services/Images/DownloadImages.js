const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function downloadImage(url, filename, folder = 'temp/images') {
  // Create the folder if it doesn't exist
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const filePath = path.join(folder, filename);

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    fs.writeFileSync(filePath, Buffer.from(response.data));

    console.log('Image downloaded successfully!');
    return filePath;
  } catch (err) {
    console.error('Error downloading image:', err);
    return null;
  }
}




exports.downloadImage = downloadImage;