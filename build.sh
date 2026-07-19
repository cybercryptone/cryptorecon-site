#!/bin/bash
mkdir -p _site
cp *.html _site/
cp *.js _site/
cp *.css _site/
cp sitemap.xml _site/
cp robots.txt _site/
cp llms.txt _site/
cp -r assets _site/
