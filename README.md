# How to Track Momo Prices and Stock in Node.js

This example calls our [Momo Listings Scraper](https://apify.com/piotrv1001/momo-listings-scraper) on Apify. It does not implement a scraper from scratch.

## What this example does

- Searches Momo for four `Dyson V12` product listings
- Waits for the Actor run to finish
- Fetches the dataset and prints each product's price, stock, and URL

Search results can mix models, bundles, and refurbished units. Compare the same `goodsCode` across runs rather than treating every result as an identical offer.

## Prerequisites

- Node.js 18 or later
- An Apify account and [API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

Copy `.env.example` to `.env`, then replace the example value with your Apify token. Do not commit `.env`.

## Usage

```bash
npm start
```

## Code example

```js
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
```

## Example output

[`sample-output.json`](./sample-output.json) contains selected fields from two of the four products in our September 25, 2026 sample run. Your prices and stock counts will change. `stock` is a point-in-time count, not a live feed.

Useful fields: `goodsCode`, `url`, `name`, `price`, `originalPrice`, `currency`, `stock`, `promotion`, `rating`, and `reviewCount`.

## Use cases

- Compare the same product code across repeated runs
- Watch price or stock changes for a product shortlist
- Flag offers with promotion terms for manual review
- Separate refurbished listings and bundles from new-unit comparisons

## Try the Actor on Apify

**[Open the Momo Listings Scraper on Apify](https://apify.com/piotrv1001/momo-listings-scraper)**

## Related resources

- [How to track Momo prices and stock](https://www.falconscrape.com/blog/how-to-track-momo-prices-and-stock)

## License

MIT
