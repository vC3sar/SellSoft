"import { NextResponse } from \"next/server\";\
import prisma from \"@/lib/prisma\";\
\
export async function POST(req: Request) {\
  try {\
    const body = await req.json();\
    const { name, slug, description, shortDescription, price, type, status, images, features } = body;\
\
    const product = await prisma.product.create({\
      data: {\
        name,\
        slug,\
        description,\
        shortDescription,\
        price,\
        type,\
        status,\
        images,\
        features\
      }\
    });\
\
    return NextResponse.json(product);\
  } catch (error) {\
    console.error(error);\
    return NextResponse.json({ error: \"Error creating product\" }, { status: 500 });\
  }\
}\
"