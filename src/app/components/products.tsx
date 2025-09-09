export const Products = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
    return (
        <div>
            <h2>Product List</h2>
            {/* Product items will be rendered here */}
        </div>
    );
};
// export { Products as Product };
