const filter = document.getElementById("category");
const products = document.querySelectorAll(".card");

filter.addEventListener("change", () => {
  const value = filter.value;
  products.forEach(product => {
    if (value === "all" || product.dataset.category === value) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
});
