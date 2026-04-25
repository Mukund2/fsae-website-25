/**
 * NoiseOverlay — kept as a no-op for backwards compat.
 *
 * The grain texture is now applied site-wide via a CSS
 * `body::before` pseudo-element in `globals.css` (Framehaus-style
 * radial-gradient grain with `mix-blend-mode: multiply`). Doing it
 * in CSS avoids needing a noise PNG asset and renders cleanly above
 * every fixed-positioned element without an extra DOM node.
 */
export function NoiseOverlay() {
  return null;
}
