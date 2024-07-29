import fs from 'fs';
import path from 'path';

const DOCS_PATH = path.join(process.cwd(), 'src/content/docs/guides');
const OUTPUT_PATH = path.join(process.cwd(), 'src/content/utils/docsMetadata.json');

function generateDocsMetadata() {
    console.log("Starting metadata generation...");

    const docs = [];

    function readDirectory(directory) {
        const fileNames = fs.readdirSync(directory);

        fileNames.forEach(fileName => {
            if (fileName.startsWith('index.')) {
                return; // Ignore index.* files
            }

            const fullPath = path.join(directory, fileName);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                readDirectory(fullPath);
            } else if (fileName.endsWith('.mdx') || fileName.endsWith('.md')) {
                const fileContents = fs.readFileSync(fullPath, 'utf8');

                // Parse the document frontmatter to get title, description, and published
                const match = /---\n([\s\S]+?)\n---/.exec(fileContents);
                const frontmatter = match ? match[1] : '';
                const { title, description, published } = parseFrontmatter(frontmatter);

                if (!published) return; // Ignore documents without published date

                let slug = path.relative(DOCS_PATH, fullPath).replace(/\.mdx?$/, '');

                // Convert slug to lowercase and replace spaces with dashes
                slug = slug.split(path.sep).map(part => part.toLowerCase().replace(/\s+/g, '-')).join('/');

                docs.push({
                    slug,
                    title: title || fileName,
                    description: description || '',
                    published: new Date(published).toISOString(),
                });
            }
        });
    }

    function parseFrontmatter(frontmatter) {
        const lines = frontmatter.split('\n');
        const metadata = {};

        lines.forEach(line => {
            const [key, ...rest] = line.split(':');
            if (key && rest.length) {
                metadata[key.trim()] = rest.join(':').trim();
            }
        });

        return metadata;
    }

    readDirectory(DOCS_PATH);

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(docs, null, 2));

    console.log("Metadata generated successfully.");
}

generateDocsMetadata();
