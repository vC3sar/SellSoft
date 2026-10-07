"import prisma from \"@/lib/prisma\";\
import { notFound } from \"next/navigation\";\
import { ProductEditor } from \"./ProductEditor\";\
\
export default async function EditProductPage({ params }: { params: { id: string } }) {\
  const product = await prisma.product.findUnique({\
    where: { id: params.id },\
    include: { variants: true }\
  });\
\
  if (!product) {\
    notFound();\
  }\
\
  return <ProductEditor product={product} />;\
}\
"