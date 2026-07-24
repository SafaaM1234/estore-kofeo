const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6">
      <button
        onClick={() => onSelectCategory("all")}
        className={`px-4 py-2 rounded-full ${
          selectedCategory === "all"
            ? "bg-[#1A0F0A] text-white"
            : "bg-white text-gray-700 border"
        }`}
      >
        Tous les produits
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === cat.id
              ? "bg-brownie text-white"
              : "bg-white text-gray-700 border"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
