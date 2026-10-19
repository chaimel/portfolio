# Icons

`build-icons.js` turns every SVG in `src/` into one sprite (`public/icons/sprite.svg`) and the
typed name list in `app/data/ui/icons.ts`. It runs before `dev`, `build` and `generate`
(`npm run icons:build` runs it on its own).

A file's folder and name make its `MIcon` name: `src/light/l.arrow.up.right.svg` is
`<MIcon name="light-arrow-up-right" />`.

The line icons in `src/light/` use [Lucide](https://lucide.dev) geometry (ISC licence) on a
24×24 grid with a 1.75 stroke. To add one, copy a Lucide icon's shapes into the same wrapper:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
	<g fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">…</g>
</svg>
```

Keep the stroke on the `<g>`: the build copies only what sits inside `<svg>` into the sprite.
