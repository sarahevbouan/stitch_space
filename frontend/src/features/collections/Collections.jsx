import Card from "../../ui/Card";

const Collections = () => {
  const collections = ["/images/casual.jpg", "/images/dinner.jpg"];
  return (
    <div>
      <h1>Collections</h1>
      <div>
        {collections.map((collection) => (
          <Card>
            <img src={collection} alt="" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Collections;
