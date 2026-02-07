import { Article, HackMDNote, HackMDResponse } from './types';
import matter from 'gray-matter';

// Environment variable check
const HACKMD_USERNAME = process.env.HACKMD_USERNAME;
if (!HACKMD_USERNAME) {
	console.warn('HACKMD_USERNAME environment variable is not set. Defaulting to "mangosu" for development.');
}
const USERNAME = HACKMD_USERNAME || 'mangosu';

export async function getAllArticles(): Promise<Article[]> {
	try {
		const res = await fetch(`https://hackmd.io/api/@${USERNAME}/overview`);
		if (!res.ok) {
			throw new Error(`Failed to fetch overview: ${res.statusText}`);
		}
		const data: HackMDResponse = await res.json();

		// Transform HackMDNote to Article
		// Note: We need to fetch individual content to resolve slugs properly according to DataSpec,
		// but for the list view, fetching ALL content might be slow. 
		// However, the spec says "Content-Based" resolution is chosen.
		// So we must fetch content for EACH note to get the correct slug/metadata.
		// In a real optimized SSG build, we might cache this.

		const articles = await Promise.all(data.notes.map(async (note) => {
			// 1. Fetch content for each note to parse frontmatter/get slug
			const rawContent = await getArticleContent(note.id);
			if (!rawContent) return null;

			const { data: frontmatter, content } = matter(rawContent);

			// 2. Slug Resolution Strategy
			// Priority: Frontmatter slug > Generated from Date+Title
			let slug = frontmatter.slug;
			if (!slug) {
				const dateStr = note.publishedAt
					? new Date(note.publishedAt).toISOString().slice(0, 10).replace(/-/g, '')
					: new Date(note.createdAt).toISOString().slice(0, 10).replace(/-/g, '');

				const safeTitle = (frontmatter.title || note.title || 'untitled')
					.toLowerCase()
					.replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '') // Keep Chinese chars if needed, or remove? Spec says "Remove non-alphanumeric". Let's stick to spec strictly first.
					.replace(/[^a-z0-9-]/g, '') // Strict Spec: Remove non-alphanumeric (assuming English titles for now based on spec example)
					.replace(/\s+/g, '-');

				slug = `${dateStr}-${safeTitle}`;
			}

			// 3. Extract Description
			const description = frontmatter.description || content.slice(0, 150).replace(/\n/g, ' ') + '...';

			return {
				id: note.id,
				slug: slug,
				title: frontmatter.title || note.title,
				description: description,
				content: content, // We have it, might as well keep it? Or strip it for list view to save memory? Spec says Article includes content.
				tags: frontmatter.tags || note.tags,
				publishedAt: note.publishedAt ? new Date(note.publishedAt).toISOString() : new Date(note.createdAt).toISOString(),
				author: {
					name: data.user.name,
					avatar: data.user.photo
				},
				viewCount: note.viewCount || 0,
			} as Article;
		}));

		return articles.filter((a): a is Article => a !== null); // Filter out failed fetches

	} catch (error) {
		console.error('Error fetching articles:', error);
		return [];
	}
}

export async function getArticleContent(noteId: string): Promise<string | null> {
	try {
		const res = await fetch(`https://hackmd.io/${noteId}/download`);
		if (!res.ok) {
			if (res.status === 404) return null;
			throw new Error(`Failed to fetch note content: ${res.statusText}`);
		}
		return await res.text();
	} catch (error) {
		console.error(`Error fetching note ${noteId}:`, error);
		return null;
	}
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
	const articles = await getAllArticles();
	return articles.find(a => a.slug === slug);
}
