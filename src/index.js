import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// Set APIFY_TOKEN in your .env file (copy .env.example to get started)
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// A small search scan; full product details are not needed for price and stock.
const input = {
    keywords: ['Dyson V12'],
    maxItems: 4,
    scrapeProductDetails: false,
};

const run = await client.actor('piotrv1001/momo-listings-scraper').call(input);

console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more? https://docs.apify.com/api/client/js/docs
