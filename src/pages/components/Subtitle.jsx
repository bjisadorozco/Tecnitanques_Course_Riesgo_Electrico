const Subtitle = ({ children, theme = 'dark' }) => {
  const themeClass = theme === 'dark' ? 'text-subtitle-color-qa' : 'text-subtitle-color-qa-ligth';
  return <h2 className={`${themeClass} text-subtitle-size font-bold`}>{children}</h2>;
}

export default Subtitle;