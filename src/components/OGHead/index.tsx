import Head from "next/head";
import { FC } from "react";
import { CDN_API, PUPPETEER_URL } from "utils/constants";
import { isBrowser } from "utils/functions";
import { IOGHead } from "./types";

const OGHead: FC<IOGHead> = ({
  title: pTitle,
  description: pDesc,
  image: pImage,
  url: pUrl,
}) => {
  const title = pTitle || (isBrowser() ? document.title : "Page Title");
  const description =
    pDesc ||
    (isBrowser()
      ? document.querySelector('meta[name="description"]')?.textContent || ""
      : "Page Description");
  const url = pUrl || (isBrowser() ? location.href : "");
  const image =
    pImage ||
    `${CDN_API}/${PUPPETEER_URL}/image?url=${url}&width=800&height=600&x=0&y=0&fullPage=false&quality=50type=jpeg`;

  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
    </Head>
  );
};

export default OGHead;
