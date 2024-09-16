const MainWrapper = (props: { children: React.ReactNode }) => {
  return <main className="container relative isolate px-4 md:px-6 lg:px-8" {...props} />;
};

export { MainWrapper };
