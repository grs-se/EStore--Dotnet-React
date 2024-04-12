using API.Entities;
using Microsoft.AspNetCore.Identity;
using System.Reflection;
using System.Text.Json;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "adam",
                    Email = "adam@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd123");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd123");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }

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