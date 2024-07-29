import fs from 'fs';
import path from 'path';

const DOCS_METADATA_PATH = path.join(process.cwd(), 'src/content/utils/docsMetadata.json');

export function GetDocs({ limit = Infinity, sortBy = 'published', order = 'desc' }) {
    const docs = JSON.parse(fs.readFileSync(DOCS_METADATA_PATH, 'utf8'));

    // Sort documents based on the given parameters
    docs.sort((a, b) => {
        if (sortBy === 'published') {
            return order === 'desc' ? new Date(b.published) - new Date(a.published) : new Date(a.published) - new Date(b.published);
        }
        if (sortBy === 'title') {
            return order === 'desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
        }
    });

    // Return the specified number of documents
    return docs.slice(0, limit);
}
