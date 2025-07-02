### How and why the parallax-block works

## The css file

```css
.parallax-header {
  height: 50vh;
  position: relative;
  overflow: hidden;
}
```

- height defines the size of the block
- position: relative is needed to position the children correctly
- overflow: hidden prevents big images from taking more space than so are supposed to

```css
.parallax-image {
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  will-change: transform;
}
```

- position: absolute allows to control the placement of the image
- top: 50%; left: 50%; centers the image.
- width: 100%; height: 100% + object-fit: cover ensures the image fills the container while preserving its aspect ratio.
- transform: translate(-50%, -50%) is not needed here because it is getting overwritten by our jsx file
- will-change: transform tells the program that it will change and be ready for that which improves performance

```css
.parallax-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  font-size: 7rem;
  color: white;
}
```

- everything the same how it is done with parallax-image except the z-index which puts the text in front of the image

## The jsx file

```jsx
const [offsetY, setOffsetY] = useState(0);

const handleScroll = () => {
  setOffsetY(window.scrollY);
};

useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

- adds a function to control the scroll speed with an event listener

```jsx
return (
  <BlockWrapper {...props}>
    <div className="parallax-wrapper">
      {data.url && (
        <>
          <Image
            src={`${flattenToAppURL(data.url)}/@@images/image`}
            className="parallax-image"
            style={{
              transform: `translate(-50%, calc(-50% + ${offsetY * 0.3}px))`,
            }}
          />

          <div className="parallax-text">
            {data.text && <p>{data?.text}</p>}
            {data.additionalText && <p>{data?.additionalText}</p>}
          </div>
        </>
      )}
    </div>
  </BlockWrapper>
);
```

- places the whole parallax block
- the wrapper is needed to ensure that everything only works inside of the block
- the image gets a new transform "style" that lets it scroll with a different pace
