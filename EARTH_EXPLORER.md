# Earth explorer

The Destinations page places an interactive Earth after its introduction and before the directory filters. Country selection via geographic boundaries, destination pins or the accessible country selector opens that country's photo, cities / featured places, guide and contextual AI link. Only Italy exposes the existing Rome companion; country guide cards now open their own countries instead of substituting Rome for Italy.

## Rendering and performance

`public/earth-explorer.html` contains all authored renderer code, styles and controls in one HTML file. Three.js 0.180.0 / OrbitControls are vendored locally under `public/vendor/three` with the MIT license. Color and night imagery are 4K; height, water specularity and clouds are separate 2K maps extracted from the packed Earth texture, with reduced mobile maps. The renderer includes cloud drift, water highlights, illustrative night lights, a thin atmospheric shell and smooth camera controls. Lighting follows the viewing direction for destination inspection; this is not a real-time astronomical or weather display.

The scene initializes near the viewport. Mobile and save-data users explicitly open the 3D view; the country selector works without WebGL. Rendering is capped at 30fps and pixel ratio at 1.8 (1.3 mobile), stops when hidden/offscreen, and becomes demand-driven with reduced motion. Context loss falls back to directory navigation. Resources and controls are disposed on page exit. Camera zoom is bounded and touch panning is contained within the globe.

The iframe sends country identifiers to its parent. Both message handlers verify origin and source; the parent accepts only directory ids. No credentials, external AI calls, telemetry or geolocation are used by the globe.

The visual reference is reflected in the black star field, natural muted surface colors, upper-left illumination and a darker right limb. Destination pins and borders start hidden and can be enabled with Guides / Borders. `?clean=1` hides interface chrome for an unobstructed Earth view. The default camera faces the Middle East, Africa and Eurasia.

## Sources and regeneration

Texture license and boundary attribution appear under the explorer, in the standalone view and in `public/earth/CREDITS.md`.

1. `node scripts/fetch-earth-assets.mjs` downloads pinned Three.js modules, original imagery and Natural Earth geometry.
2. `python scripts/prepare-earth-textures.py` requires Pillow and produces the optimized channels.
3. `node scripts/prepare-earth-data.cjs` builds the 51-country directory from the existing site content plus 177 simplified boundary geometries. Tiny island countries omitted at this map scale have selectable pins.
4. `node scripts/bundle-earth.mjs public/earth-standalone.html` creates the self-contained download with embedded libraries, textures and geography (about 5.3MB). It renders without external asset requests. Guide / AI links use `http://localhost:3000/`, which can be changed through its base URL for another host. The regular site does not load this bundle.

## Verification

`node scripts/check-earth.cjs` checks directory identities, local flags, geographic selection for eight countries, foreign-country exclusion, island locations, message origins and lifecycle guards. TypeScript and targeted lint checks cover the React integration. Browser checks cover rendering, country selection, the contextual guide / AI links, orbit / zoom controls and the single-file bundle. No deployment or database change is required.

At 390px the page loaded zero Earth iframes until Explore the globe was pressed, then rendered the mobile view without horizontal overflow. Maldives remained selectable and linked to `/concierge?destination=maldives`. A direct globe pin click selected Spain and updated the adjacent card; France selected its own guide and contextual AI link. The self-contained HTML rendered successfully with its embedded modules, textures and directory. Navbar source hashes remained unchanged. No deployment performed.
