import prisma from '../../lib/prisma'; // Using existing TS Prisma client via tsx

export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      category: true,
      variants: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(products);
};
