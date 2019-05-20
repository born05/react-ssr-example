/* global gtag */

const gaIdentifier = 'EX-AMPLE-ID';

export const gtagInit = () => (`
  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaIdentifier}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${gaIdentifier}', { 'send_page_view': false });
  </script>
`);

const trackPage = () => {
  const isServer = typeof window === 'undefined';
  if (isServer || typeof gtag === 'undefined') return;

  gtag('config', gaIdentifier, {
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
};
export default trackPage;
