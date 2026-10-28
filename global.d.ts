/**
 * Type declarations for non-code asset imports.
 *
 * Next.js only ships module declarations for CSS Modules (`*.module.css`),
 * not for plain `*.css` side-effect imports like `@/styles/globals.css`.
 * This declaration makes TypeScript accept those imports.
 */
declare module "*.css";
