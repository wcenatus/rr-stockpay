import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL environment variable");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

const recipes = [
  {
    title: "Creamy Garlic Pasta",
    imageUrl: "/images/pasta-thumb.png",
    cookTime: "25 min",
    rating: "4.8",
    reviews: 126,
    tags: ["Easy", "Vegetarian", "Pasta"],
  },
  {
    title: "Teriyaki Tofu Stir Fry",
    imageUrl: "/images/pasta-hero.png",
    cookTime: "30 min",
    rating: "4.6",
    reviews: 89,
    tags: ["Easy", "Vegan", "High Protein"],
  },
  {
    title: "Hearty Minestrone Soup",
    imageUrl: "/images/pasta-thumb.png",
    cookTime: "40 min",
    rating: "4.7",
    reviews: 112,
    tags: ["Vegetarian", "Soup", "Meal Prep"],
  },
  {
    title: "Chicken Tacos",
    imageUrl: "/images/pasta-hero.png",
    cookTime: "20 min",
    rating: "4.5",
    reviews: 78,
    tags: ["Easy", "High Protein", "Weeknight"],
  },
  {
    title: "Roasted Veggie Grain Bowl",
    imageUrl: "/images/pasta-thumb.png",
    cookTime: "35 min",
    rating: "4.9",
    reviews: 143,
    tags: ["Healthy", "Vegetarian", "Meal Prep"],
  },
  {
    title: "Lemon Herb Salmon",
    imageUrl: "/images/pasta-hero.png",
    cookTime: "22 min",
    rating: "4.8",
    reviews: 101,
    tags: ["Seafood", "High Protein", "Quick"],
  },
];

async function main() {
  for (const recipe of recipes) {
    const existingRecipe = await prisma.recipe.findFirst({
      where: {
        title: recipe.title,
      },
    });

    if (existingRecipe) {
      await prisma.recipe.update({
        where: {
          id: existingRecipe.id,
        },
        data: recipe,
      });

      continue;
    }

    await prisma.recipe.create({
      data: recipe,
    });
  }

  console.log(`Seeded ${recipes.length} recipes.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
