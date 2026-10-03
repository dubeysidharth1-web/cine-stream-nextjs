import "@testing-library/jest-dom";

// Mock next/link to render simple <a> tag and prevent intersection observer side effects
jest.mock("next/link", () => {
  return function Link({ children, href, ...rest }) {
    return (
      <a href={typeof href === "object" ? href.pathname : href} {...rest}>
        {children}
      </a>
    );
  };
});

// Mock next/image to render standard <img> element
jest.mock("next/image", () => {
  return function Image({ src, alt, fill, priority, sizes, className, ...rest }) {
    return <img src={src} alt={alt} className={className} {...rest} />;
  };
});
