# External resource directory

Selected under user authorization and checked on 2026-11-18. The official HTTPS landing pages were opened to verify their identity and purpose. These checks do not guarantee future availability, audit external application security, or extend Web Box privacy promises to other sites.

| Resource | Purpose | Verified official address |
| --- | --- | --- |
| MDN Web Docs | Web platform documentation | [MDN](https://developer.mozilla.org/en-US/) |
| Can I use | Browser compatibility tables | [Can I use](https://caniuse.com/) |
| regex101 | Regular expression testing | [regex101](https://regex101.com/) |
| JSONLint | JSON validation and formatting | [JSONLint](https://jsonlint.com/) |
| CyberChef | Encoding and data transformations | [CyberChef](https://gchq.github.io/CyberChef/) |
| Squoosh | Image compression | [Squoosh](https://squoosh.app/) |
| SVGOMG | SVG optimization | [SVGOMG](https://jakearchibald.github.io/svgomg/) |
| Photopea | Image editing | [Photopea](https://www.photopea.com/) |
| Uiverse | Community-built UI elements and code | [Uiverse](https://uiverse.io/) |
| Excalidraw | Diagram sketching | [Excalidraw](https://excalidraw.com/) |

Uiverse was added under user authorization and its official landing page was checked on 2026-11-21.

Excalidraw's purpose and official destination were also verified against its [official repository](https://github.com/excalidraw/excalidraw); CyberChef's against its [official repository](https://github.com/gchq/CyberChef).

Definitions live in `src/registry/index.ts`; the page renders the registry through the shared ResourceCard component. Runtime URL validation permits only absolute HTTP/HTTPS addresses without embedded credentials. All links open with `noopener noreferrer`. No live link checks or third-party requests run when the Web Box directory loads.


Category metadata lives in `externalResourceCategories` in the same registry; its stable IDs constrain each resource’s `categoryId`. The overview lists categories only. Category routes are generated from that configuration as `/resources/ext-dev`, `/resources/ext-data`, `/resources/ext-design`, `/resources/ext-security`, `/resources/ext-productivity`, `/resources/ext-learning`, `/resources/ext-open-source`, and `/resources/ext-official`. Empty categories remain accessible.

The existing HashRouter is retained, so deployed URLs use `#/resources` and `#/resources/ext-dev` (and the other category IDs). These URLs support direct entry and refresh on static hosts without server rewrites. Unknown paths show Not Found. A single wrapping category navigation is shared across desktop and mobile; the existing main navigation and theme mechanism remain in use.
