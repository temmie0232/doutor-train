import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: { productName: string } }
) {
    const productName = params.productName;
    const directoryPath = path.join(process.cwd(), 'public', 'manual', productName);

    try {
        const files = fs.readdirSync(directoryPath);
        const imageFiles = files.filter(file =>
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        );

        return NextResponse.json({ steps: imageFiles.length });
    } catch (error) {
        console.error('Error reading directory:', error);
        return NextResponse.json({ steps: 0 }, { status: 500 });
    }
}