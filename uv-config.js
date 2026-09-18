// Ultraviolet configuration for the Chicken static site.
(function () {
  const root = new URL('./', self.location.href);
  self.__uv$config = {
    prefix: new URL('uv/service/', root).pathname,
    bare: '/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js',
    bundle: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js',
    config: new URL('uv-config.js', root).pathname,
    sw: new URL('uv-sw.js', root).pathname
  };
})();
