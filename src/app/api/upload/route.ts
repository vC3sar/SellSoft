"import { NextResponse } from \"next/server\";\
import { writeFile, mkdir } from \"fs/promises\";\
import { join } from \"path\";\
import { randomUUID } from \"crypto\";\
import { existsSync } from \"fs\";\
\
export async function POST(req: Request) {\
  try {\
    const formData = await req.formData();\
    const file = formData.get(\"file\") as File;\
\
    if (!file) {\
      return NextResponse.json({ error: \"No se proporcionó un archivo.\" }, { status: 400 });\
    }\
\
    const bytes = await file.arrayBuffer();\
    const buffer = Buffer.from(bytes);\
\
    // Create unique filename\
    const ext = file.name.split('.').pop();\
    const filename = `${randomUUID()}.${ext}`;\
\
    // Ensure uploads directory exists\
    const uploadsDir = join(process.cwd(), \"public\", \"uploads\");\
    if (!existsSync(uploadsDir)) {\
      await mkdir(uploadsDir, { recursive: true });\
    }\
\
    const path = join(uploadsDir, filename);\
    await writeFile(path, buffer);\
\
    return NextResponse.json({ url: `/uploads/${filename}` });\
  } catch (e) {\
    console.error(\"Upload error:\", e);\
    return NextResponse.json({ error: \"Error al subir el archivo.\" }, { status: 500 });\
  }\
}\
"