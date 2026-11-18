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
| Excalidraw | Diagram sketching | [Excalidraw](https://excalidraw.com/) |

Excalidraw's purpose and official destination were also verified against its [official repository](https://github.com/excalidraw/excalidraw); CyberChef's against its [official repository](https://github.com/gchq/CyberChef).

Definitions live in `src/registry/index.ts`; the page renders the registry through the shared ResourceCard component. Runtime URL validation requires HTTPS without embedded credentials. All links open with `noopener noreferrer`. No live link checks or third-party requests run when the Web Box directory loads.
