/*
Fetch webmentions from webmention.io
Based on: https://lukeb.co.uk/blog/2021/03/15/no-comment-adding-webmentions-to-my-site/
Uses 11ty fetch: https://www.11ty.dev/docs/plugins/fetch/
*/
const fetch = require("node-fetch")
const EleventyFetch = require("@11ty/eleventy-fetch")
const WEBMENTION_BASE_URL = "https://webmention.io/api/mentions.jf2";

module.exports = async () => {
  const domain = 'roobottom.com'; 
  const token = process.env.WEBMENTION_IO_TOKEN;
  const url = `${WEBMENTION_BASE_URL}?domain=${domain}&token=${token}&per-page=1000`;

  try {
    const res = await EleventyFetch(url, {
      duration: '4h',
      type: 'json',
      directory: '.cache'
    })
    return res.children
  } catch (err) {
    console.error(err);
    return [];
  }
}