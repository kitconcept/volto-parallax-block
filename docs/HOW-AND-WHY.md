### How and why the parallax-block works

## The schema.jsx

- Defines the items used to edit the block vie the sidebar
- interesting might be that you can toggle the "parallaxSpeed" in the index.js with "hasFixedSpeed : true/false"

## The Sidebar.jsx

- if no image is selected it shows that and tells you that you also cant edit the block without the image
- If an image is selected it shows the content of the sidebar with its items

## The View.jsx

- Animates the image selected when the viewport changes via requestAnimationFrame
- The speedMap controlls the intensity of the parallax effect
- If an image is selected it loads the image, the title and the text

## The Edit.jsx

- If an image is selected it loads the "View" if no image is selected it shows the default part to upload an image
- It also loads the the "ParallaxSidebar"

## index.js

- applies these configs to the parallax block
- "hasFixedSpeed" enables/disables the option to set the speed of the parallax effect yourself while editing
