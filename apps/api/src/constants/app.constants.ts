export const APPLICATION_NAME = 'Live Music X' as const;
export const APPLICATION_URL = 'http://localhost:5000' as const;

export const STATIC_URL = 'http://localhost:5000' as const;

export const STATIC_IMG_PATH = `/img` as const;
export const STATIC_JS_PATH = `/js` as const;
export const STATIC_CSS_PATH = `/css` as const;

export const STATIC_CSS_URL = `${STATIC_URL}${STATIC_CSS_PATH}` as const;
export const STATIC_IMG_URL = `${STATIC_URL}${STATIC_IMG_PATH}` as const;
export const STATIC_JS_URL = `${STATIC_URL}${STATIC_JS_PATH}` as const;

export const APP_LOGO_URL = `${STATIC_IMG_URL}/brand-dark.png` as const;
export const FAVICON_URL = `${STATIC_IMG_URL}/favicon.ico` as const;

export const MESSAGE_BROKER = 'MESSAGE_BROKER';
