import * as cheerio from "cheerio";
import axios from "axios";

async function getProductImage(productLink) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const fullUrl = `${proxyUrl}${productLink}`;
  try {
    const response = await axios.get(fullUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const imageUrl = $("#main-image").attr("src");
    return imageUrl;
  } catch (error) {
    return "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
  }
}

export default getProductImage;
