# Rome shopping update · 20 October 2026

Added `/destinations/italy/rome/shopping`, linked from the Rome guide and gift finder. It uses the same place catalog as the map, saved places, planner and Rome AI guide. Navigation bar unchanged.

Five new stores join eight existing shopping places (13 total):

| Place | Primary source | Checked fields |
| --- | --- | --- |
| Rinascente Tritone | https://www.rinascente.it/it/store-roma-via-del-tritone/ | Store, address, departments |
| Castroni Cola di Rienzo | https://www.castroni.it/ | Branch, address, product types |
| Feltrinelli Argentina | https://www.lafeltrinelli.it/punto-vendita/roma/ms-roma-argentina/555 | Store, address, published hours |
| Fabriano Babuino | https://www.fabrianoboutique.com/fabriano_it_eu/amlocator | Store, address, published hours |
| Momonì Babuino | https://stores.momoni.it/en/italy/lazio/roma/momoni-roma-babuino | Store, address, published hours |

Turismo Roma supplies location references for Rinascente, Castroni and Feltrinelli (linked in the catalog). Fabriano and Momonì map pins are approximate orientation points; the address identifies the shop. Holiday opening exceptions can apply even to source-checked hours.

No product inventory, shelf prices or new venue photographs have been claimed or fabricated. New shops use the existing illustrated location fallback until suitable photographs are supplied. Price levels and visit durations are editorial planning guidance. Purchases require a user-entered amount and basis before inclusion in planner totals. Existing eight shopping records retain their original verification status.

Filters cover food/coffee, fashion/outlets, beauty/herbal gifts, books/stationery and markets/vintage. Search also matches addresses and gift tags. Category and search state lives in the URL and clear-filters resets both. A multi-category department store may appear under several relevant filters.

No database migration, external publication or authentication setting change is required.

Validation: 20 concierge/domain checks and full lint passed. Production build passed. Desktop browser verified the two-result books/stationery filter, location markers, store details with official hours, and adding Feltrinelli to Day 1 with an unconfirmed purchase amount excluded from totals. Mobile width 375px has no horizontal overflow and the map toggle works. The AI launcher is compact on Rome pages to keep the mobile map control accessible and first opening follows the Rome destination on shopping/gift subpages. Hosted sign-in/save and a paid AI completion were not exercised.

Mobile QA also found the transparent chat wrapper intercepting clicks outside its compact button. The wrapper now passes clicks through; its chat panel and launcher remain interactive.
