import { resolve } from 'node:path';
import {
  getComponentChunkLinks,
  getFontFaceStyles,
  getFontLinks,
  getIconLinks,
  getInitialStyles,
  getLoaderScript,
  getMetaTagsAndIconLinks,
} from '@porsche-design-system/components-js/partials';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const REGEX_HEAD = /<\/head>/;
const REGEX_BODY = /<\/body>/;

const transformIndexHtmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      // biome-ignore lint/correctness/noUnusedVariables: can be re-enabled when config is extended to support home & nav
      const cspContent = [
        `default-src 'self' https://cdn.ui.porsche.com`,
        `style-src 'self' https://cdn.ui.porsche.com 'unsafe-inline'`,
        `script-src 'self' https://cdn.ui.porsche.com ${getLoaderScript({ format: 'sha256' })}`,
        `img-src 'self' https://cdn.ui.porsche.com https://porsche-design-system.github.io data:`, // data: is needed for inline background images, e.g. used in checkbox-wrapper and radio-button-wrapper
      ].join('; ');

      const headPartials = [
        //`<meta http-equiv="Content-Security-Policy" content="${cspContent}"/>`, // disabled due to loading of H&N
        getInitialStyles(),
        getComponentChunkLinks({ components: ['display', 'text', 'carousel', 'link-tile', 'link-pure', 'link'] }),
        getFontFaceStyles(),
        getFontLinks(),
        getIconLinks(),
        getMetaTagsAndIconLinks({ appTitle: 'Examples by Porsche Design System' }),
      ].join('');

      const bodyPartials = [getLoaderScript()].join('');

      return html.replace(REGEX_HEAD, `${headPartials}$&`).replace(REGEX_BODY, `${bodyPartials}$&`);
    },
  };
};

export default defineConfig({
  base: '/examples/',
  root: 'src',
  publicDir: '../public',
  emptyOutDir: true,
  server: {
    host: true,
  },
  build: {
    outDir: '../dist/',
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/index.html'),
        'patterns-header-1': resolve(__dirname, 'src/patterns/header/1/index.html'),
        'patterns-header-2': resolve(__dirname, 'src/patterns/header/2/index.html'),
        'patterns-footer-1': resolve(__dirname, 'src/patterns/footer/1/index.html'),
        'templates-landing-page-1': resolve(__dirname, 'src/templates/landing-page/1/index.html'),
      },
    },
  },
  plugins: [transformIndexHtmlPlugin(), tailwindcss()],
});
