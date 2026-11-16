# Readable CSS sources

Edit the files in this folder, not the minified ones the site loads.
After editing, rebuild the minified files from the repo root:

```
npx clean-css-cli -o blog/blog.css css-src/blog/blog.css
npx clean-css-cli -o assets/site-nav.css css-src/assets/site-nav.css
npx clean-css-cli -o apps/assets/site.css css-src/apps/assets/site.css
```

Then commit both the source and the minified file.
