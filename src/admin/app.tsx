// ** Assets Import
import AuthLogo from "../extensions/logo-192x192.png";
import MenuLogo from "../extensions/logo-192x192.png";
import favicon from "../extensions/favicon.png";

export default {
  config: {
    auth: {
      logo: AuthLogo,
    },
    head: {
      favicon: favicon,
    },
    menu: {
      logo: MenuLogo,
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to NFT Dashboard!",
        "Auth.form.welcome.subtitle": "Log in to your account",
        "app.components.LeftMenu.navbrand.title": "NFT Dashboard",
      },
    },
    tutorials: false,
    notifications: { releases: false },
  },
};
