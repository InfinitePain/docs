/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare module '@astrojs/starlight/utils/navigation' {
    export function flattenSidebar(entries: any): any;
    export type SidebarEntry = any;
    export const Link: any;
}

declare module '@astrojs/starlight/user-components/Icon.astro' {
    const Icon: any;
    export default Icon;
}

declare module '@astrojs/starlight/user-components/Badge.astro' {
    const Badge: any;
    export default Badge;
}
