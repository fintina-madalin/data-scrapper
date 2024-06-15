// src/app/api/fetch-metadata/route.ts
import {NextRequest, NextResponse} from 'next/server';
import axios from 'axios';
import cheerio from 'cheerio';

interface Metadata {
    title: string | undefined;
    image: string | undefined;
    price: string | undefined;
}

export async function POST(req: NextRequest) {
    const {url} = await req.json();

    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);

        const title = $('head > title').text() || $('meta[property="og:title"]').attr('content');
        let image = $('meta[property="og:image"]').attr('content');
        if(!image) {
            const imageSelectors = [
                'meta[property="og:image:url"]',
                'meta[name="twitter:image"]',
                'meta[itemprop="image"]',
                'img[src^="http"]:not([src$=".svg"])', // Exclude images ending with .svg
                'img.product-image',
                '.product-image img'
                // Add more selectors as needed based on your HTML structure
            ];

            for (const selector of imageSelectors) {
                try {
                    image = $(selector).attr('content') || $(selector).attr('src');
                    if (image) {
                        break;
                    }
                } catch (error) {
                    console.error('Error extracting image:', error);
                }
            }
        }
        let price = $('[itemprop="price"]').attr('content') || $('meta[property="og:price:amount"]').attr('content');
        if(!price) {
            const priceSelectors = [
                '[itemprop="price"]',
                'meta[property="og:price:amount"]',
                '.price',
                '.product-price',
                '.price-value',
                '[class*="price"]',
                'span.price',
                'div.price'
            ];

            for (const selector of priceSelectors) {
                try {
                    price = $(selector).attr('content') || $(selector).text().trim();
                    if (price) {
                        break;
                    }
                } catch (error) {
                    console.error('Error extracting price:', error);
                }
            }
        }
        const metadata: Metadata = {title, image, price};

        return NextResponse.json(metadata);
    } catch (error) {
        return NextResponse.json({message: 'Error fetching metadata'}, {status: 500});
    }
}
