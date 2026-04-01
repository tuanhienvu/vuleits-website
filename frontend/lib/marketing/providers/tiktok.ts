import { getMarketingConfig } from '@/lib/marketing/config';

export function tiktokBootstrapScript(): string {
  const marketingConfig = getMarketingConfig();
  return `!function (w, d, t) {\n  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];\n  ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];\n  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};\n  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);\n  ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';\n  ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};\n  ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};\n  var o=document.createElement('script');o.type='text/javascript';o.async=!0;o.src=r+'?sdkid='+e+'&lib='+t;\n  var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};\n  ttq.load('${marketingConfig.tiktok.pixelId}');\n  ttq.page();\n}(window, document, 'ttq');`;
}
