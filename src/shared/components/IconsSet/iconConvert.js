const types = {
  'admin template': 'admin',
  font: 'fonts',
  'mobile template': 'mobile',
  'powerpoint template': 'powerpoint',
  'unbounce template': 'unbounce',
  'video template': 'video',
  'video ecard': 'video',
  after: 'ae',
  'after effects': 'ae',
  'after effects intro': 'ae',
  'after effects logo reveal': 'ae',
  'website template': 'html5-2',
  'web template': 'html5-2',
  website: 'html5-2',
  'e-book': 'ebook',
  resume: 'resume',
  'Printable Resume Templates': 'resume',
  'turnkey website 1.0': 'monster_dark',
  'turnkey websites': 'monster_dark',
  'turnkey website 2.0': 'monster_dark',
  'turnkey cms facebook template': 'monster_dark',
  'prestashop module': 'prestashop',
  'prestashop theme': 'prestashop',
  'virtuemart template': 'virtuemart',
  bootstrap: 'bootstrap',
  'jigoshop theme': 'jigoshop',
  monstroid: 'monstroid',
  'hd graphics package': 'psd',
  'psd template': 'psd',
  'weblium website concept': 'weblium',
  'corporate design': 'corporate',
  'corporate identity template': 'corporate',
  'joomla template': 'joomla',
  'ecommerce manual': 'ecommerce',
  'ecommerce-templates': 'ecommerce',
  moto: 'moto-3-ecommerce',
  motocms: 'moto-3-ecommerce',
  'moto cms': 'moto-3-ecommerce',
  motocmshtml: 'moto-3-ecommerce',
  'moto cms html': 'moto-3-ecommerce',
  'moto cms html template': 'moto-3-ecommerce',
  'moto cms html template ru': 'moto-3-ecommerce',
  'motocms ecommerce template': 'moto-3-ecommerce',
  'razor templates': 'razor',
  'razor template': 'razor',
  responsive: 'responsive',
  'wix website template': 'wix',
  'drupal template': 'drupal',
  'drupal commerce theme': 'drupal-commerce',
  javascript: 'js',
  'motocms widget': 'moto',
  'shopify theme': 'shopify',
  'woocommerce theme': 'woo',
  'ebay template': 'ebay',
  keynote: 'keynote',
  'keynote template': 'keynote',
  'moto cms 3': 'moto3',
  'moto cms 3 template': 'moto3',
  'motocms plugin': 'moto3',
  'motocms 3 template (exclusive)': 'moto3',
  'sketch template': 'sketch',
  'wordpress theme': 'wordpress',
  'wordpress plugin': 'wordpress',
  'newsletter template': 'email',
  landing: 'landing',
  'landing page': 'landing',
  'landing page template': 'landing',
  'muse template': 'muse',
  'swish template': 'swish',
  'tumblr theme': 'tumblr',
  'x-cart template': 'x-cart',
  'facebook template': 'facebook',
  'facebook html cms template': 'facebook',
  'facebook layout': 'facebook',
  'facebook flash': 'facebook',
  'facebook flash cms': 'facebook',
  'facebook flash cms template': 'facebook',
  'loaded7 template': 'loaded7',
  'opencart template': 'opencart',
  'opencart extension': 'opencart',
  tablet: 'tablet',
  'zencart template': 'zencart',
  'flash cms template': 'flash',
  'flash template': 'flash',
  'flash cms engine': 'flash',
  'flash cms engine with html': 'flash',
  'facebook flash template': 'flash',
  'flash intro': 'flash',
  'flash intro template': 'flash',
  'magento extension': 'magento',
  'magento theme': 'magento',
  'oscommerce template': 'osc',
  'ui elements': 'ui',
  'plugins &amp; assets': 'plugin-assets',
  logo: 'psd',
  'logo template': 'psd',
  'logoset template': 'psd',
  'iconset template': 'psd',
  'php-nuke template': 'php-nuke',
  'phpbb template': 'phpbb',
  'silverlight template': 'monster_dark',
  silverlight: 'monster_dark',
  'silverlight intro template': 'monster_dark',
  404: 'specialty',
  '404 page': 'specialty',
  '404 page template': 'specialty',
  'expression template': 'expression',
  'twitter template': 'twitter',
  music: 'music',
  'stock music': 'music',
  'cre loaded template': 'cre-cloaded',
  photo: 'moto',
  'photo gallery': 'moto',
  'photo gallery template': 'moto',
  'cms &amp; blog template': 'cms-blog',
  'mambo template': 'mambo',
  printable: 'resume',
  '404-page': 'specialty',
};

const values = Object.values(types);

const getType = (name) => {
  if (name === undefined) {
    return '';
  }

  if (types[name] !== undefined) {
    return types[name];
  }

  if (values.includes(name)) {
    return name;
  }

  const dashedName = name.replace(' ', '-');
  if (values.includes(dashedName)) {
    return dashedName;
  }

  if (name.indexOf(' ') === -1) {
    return name;
  }

  const parts = name.split(' ');
  if (types[parts.join('')] !== undefined) {
    return types[parts.join('')];
  }

  parts.pop();
  if (parts.length > 1) {
    return getType(parts.join(' '));
  }

  return getType(parts[0]);
};

const prepare = (name) => {
  const cleanName = name.trim().replace(/[\s ]+/gi, ' ');
  return getType(cleanName);
};

export default prepare;
