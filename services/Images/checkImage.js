exports.isImageUrl=(url)=> {
    console.log("Here is the image URL: ",url)
    const queryStringIndex = url.indexOf('?');
     let imUrl = queryStringIndex !== -1 ? url.substring(0, queryStringIndex) : url;
     return imUrl.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.png');
 }

