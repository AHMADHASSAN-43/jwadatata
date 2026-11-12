
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';

export function convertToVoiceNote(inputBuffer) {
    return new Promise((resolve, reject) => {
        const inp = new PassThrough();
        inp.end(inputBuffer);
        const out = new PassThrough();
        const chunks = [];
        out.on('data', c => chunks.push(c));
        out.on('end', () => resolve(Buffer.concat(chunks)));
        out.on('error', reject);
        ffmpeg(inp)
            .audioCodec('libopus')
            .audioChannels(1)
            .audioFrequency(24000)
            .format('ogg')
            .outputOptions(['-b:a 32k'])
            .on('error', reject)
            .pipe(out, { end: true });
    });
}
