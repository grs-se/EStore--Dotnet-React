using API.Entities;
using System.Reflection;
using System.Text.Json;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context)
        {

            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            var serializeOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };

            // Products
            if (context.Products.Any()) return;

            var productsData = File.ReadAllText(path + @"/Data/SeedData/products.json");
            var products = JsonSerializer.Deserialize<List<Product>>(productsData, serializeOptions);
            foreach (var product in products)
            {
                context.Products.AddRange(product);
            };

            await context.SaveChangesAsync();
        }
    }
}