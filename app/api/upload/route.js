import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No files uploaded' },
                { status: 400 }
            );
        }

        // Ensure the camps directory exists
        const campsDir = path.join(process.cwd(), 'public', 'camps');
        try {
            await mkdir(campsDir, { recursive: true });
        } catch (err) {
            // Directory might already exist
        }

        const uploadedFiles = [];

        for (const file of files) {
            if (!file || typeof file === 'string') continue;

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const timestamp = Date.now();
            const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
            const filename = `${timestamp}_${originalName}`;
            const filepath = path.join(campsDir, filename);

            await writeFile(filepath, buffer);

            // Determine file type
            const ext = path.extname(file.name).toLowerCase();
            const isVideo = ['.mp4', '.webm', '.mov', '.avi'].includes(ext);

            uploadedFiles.push({
                type: isVideo ? 'video' : 'image',
                url: `/camps/${filename}`,
                caption: ''
            });
        }

        return NextResponse.json({
            success: true,
            data: uploadedFiles
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to upload files' },
            { status: 500 }
        );
    }
}
