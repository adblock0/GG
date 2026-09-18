// UV config helper. It is kept under uv/ so GitHub Pages project sites resolve it correctly.
// The main page also creates the same config at runtime before registering the worker.
self.__uv$config = {
  prefix: new URL('service/', self.location.href).pathname,
  encodeUrl: Ultraviolet.codec.xor.encode,
  decodeUrl: Ultraviolet.codec.xor.decode,
  handler: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.handler.js',
  bundle: 'https://cdn.jsdelivr.net/npm/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js',
  config: new URL('uv-config.js', self.location.href).pathname,
  sw: new URL('uv-sw.js', self.location.href).pathname
};
