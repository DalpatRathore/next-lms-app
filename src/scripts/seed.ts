const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Programming" },
        { name: "Photography" },
        { name: "Design" },
        { name: "Marketing" },
        { name: "Business" },
      ],
    });
    console.log("success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}
main();