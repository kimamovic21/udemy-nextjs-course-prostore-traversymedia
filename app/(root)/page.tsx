const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
  await delay(1000);

  return (
    <div>Homepage</div>
  );
};

export default Homepage;